// index.js - 使用 ioredis 作为客户端包
const Redis = require('ioredis');
 
// 创建 Redis 客户端
let redisClient = null;
 
// 初始化 Redis 连接
async function initRedis() {
    if (redisClient && redisClient.status === 'ready') {
        return redisClient;
    }
 
    // ioredis 的连接配置
    redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB) || 0,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        lazyConnect: false,
        enableReadyCheck: true,
        maxRetriesPerRequest: 3
    });

    return redisClient;
}
 
// 解析请求参数的辅助函数
function parseRequestParams(event) {
    let params = {};
 
    // 处理 GET 请求参数
    if (event.queryStringParameters) {
        params = { ...event.queryStringParameters };
    }
 
    // 处理 POST 请求body
    if (event.body) {
        let bodyData = {};
 
        // 如果 body 是字符串，尝试解析
        if (typeof event.body === 'string') {
            try {
                bodyData = JSON.parse(event.body);
            } catch (e) {
                console.log('Body不是有效的JSON，尝试作为普通字符串处理');
            }
        }
        // 如果 body 已经是对象
        else if (typeof event.body === 'object') {
            bodyData = event.body;
        }
 
        // 合并body数据到params
        params = { ...params, ...bodyData };
    }
 
    // 如果还是没有获取到参数，尝试直接使用 event
    // 兼容某些云函数直接将参数放在 event 根级别的情况
    if (!params.action) {
        // 检查 event 根级别是否有 action
        if (event.action) {
            params = { ...params, ...event };
        }
        // 检查是否有 isBase64Encoded（表示这是一个HTTP事件）
        else if (event.isBase64Encoded !== undefined && event.body) {
            console.log('检测到HTTP事件格式，但未能正确解析参数');
        }
    }
 
    console.log('解析后的参数:', JSON.stringify(params, null, 2));
    return params;
}
 
// 主函数
exports.main = async (event, context) => {
    try {
        // 初始化 Redis 连接
        const client = await initRedis();
 
        // 从 event 中获取参数
        const params = parseRequestParams(event);
        const { action } = params;
 
        // 根据action执行不同的操作
        switch (action) {
            // 提交分数
            case 'submit_score':
                return await submitScore(client, params);
 
            // 获取排行榜
            case 'get_leaderboard':
                return await getLeaderboard(client, params);
 
            // 获取特定用户的排名和分数
            case 'get_user':
                return await getUserRank(client, params);
 
            // 删除用户
            case 'delete_user':
                return await deleteUser(client, params);
 
            // 查询用户信息
            case 'query_user':
                return await queryUser(client, params);
 
            // 清空排行榜
            case 'clear_leaderboard':
                return await clearLeaderboard(client);
 
            // 批量导入数据
            case 'batch_import':
                return await batchImport(client, params);
 
            default:
                return {
                    statusCode: 200,
                    headers: getCORSHeaders(),
                    body: JSON.stringify({
                        message: "游戏排行榜API",
                        availableActions: [
                            "submit_score - 提交分数",
                            "get_leaderboard - 获取排行榜",
                            "get_user - 获取用户排名",
                            "query_user - 查询用户信息",
                            "clear_leaderboard - 清空排行榜",
                            "batch_import - 批量导入数据"
                        ]
                    })
                };
        }
    } catch (error) {
        console.error("Main Error:", error);
        return {
            statusCode: 500,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined
            })
        };
    }
};
 
// CORS headers
function getCORSHeaders() {
    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    };
}
 
// 提交分数
async function submitScore(client, params) {
    const { username, score } = params;
 
    if (!username || score === undefined) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少必要参数：username 或 score"
            })
        };
    }
 
    const scoreNum = parseInt(score);
    if (isNaN(scoreNum)) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "score 必须是有效的数字"
            })
        };
    }
 
    try {
        // ioredis 的 zadd 使用方式：zadd(key, score, member)
        await client.zadd("leaderboard", scoreNum, username);
 
        // 获取用户排名（从高到低），这里更严谨点需要和 zadd 保证原子性
        const rank = await client.zrevrank("leaderboard", username);
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "success",
                message: "分数提交成功",
                data: {
                    username: username,
                    score: scoreNum,
                    rank: rank !== null ? rank + 1 : null
                }
            })
        };
    } catch (err) {
        console.error("Submit Score Error:", err);
        throw err;
    }
}
 
// 获取排行榜
async function getLeaderboard(client, params) {
    const limit = parseInt(params.limit) || 30;
 
    try {
        // 获取总人数
        const totalUsers = await client.zcard("leaderboard");
 
        // 获取排行榜数据（分数从高到低），这里更严谨点需要保证原子性
        // ioredis 的 zrevrange 返回格式：[member1, score1, member2, score2, ...]
        const leaderboardData = await client.zrevrange("leaderboard", 0, limit - 1, "WITHSCORES");
 
        // 解析数据
        const leaderboard = [];
        for (let i = 0; i < leaderboardData.length; i += 2) {
            leaderboard.push({
                rank: Math.floor(i / 2) + 1,
                username: leaderboardData[i],
                score: parseInt(leaderboardData[i + 1])
            });
        }
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                total_users: totalUsers,
                leaderboard: leaderboard
            })
        };
    } catch (err) {
        console.error("Get Leaderboard Error:", err);
        throw err;
    }
}
 
// 获取特定用户的排名和分数
async function getUserRank(client, params) {
    const { username } = params;
 
    if (!username) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少参数：username"
            })
        };
    }
 
    try {
        // ioredis 的 zscore 返回字符串或 null
        const score = await client.zscore("leaderboard", username);
 
        if (score === null) {
            return {
                statusCode: 404,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "error",
                    message: "用户不存在"
                })
            };
        }
 
        const rank = await client.zrevrank("leaderboard", username);
        const totalUsers = await client.zcard("leaderboard");
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                username: username,
                score: parseInt(score),
                rank: rank !== null ? rank + 1 : null,
                total_users: totalUsers
            })
        };
    } catch (err) {
        console.error("Get User Rank Error:", err);
        throw err;
    }
}
 
// 查询用户信息
async function queryUser(client, params) {
    const { username } = params;
 
    if (!username) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少参数：username"
            })
        };
    }
 
    try {
        const score = await client.zscore("leaderboard", username);
 
        if (score === null) {
            return {
                statusCode: 200,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "not_found",
                    message: `用户 '${username}' 不存在`
                })
            };
        }
 
        const rank = await client.zrevrank("leaderboard", username);
        const totalUsers = await client.zcard("leaderboard");
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "found",
                data: {
                    username: username,
                    score: parseInt(score),
                    rank: rank !== null ? rank + 1 : null,
                    total_users: totalUsers
                }
            })
        };
    } catch (err) {
        console.error("Query User Error:", err);
        throw err;
    }
}
 
// 清空排行榜
async function clearLeaderboard(client) {
    try {
        // Redis4.0 开始有提供 unlink 命令，如果键会有可能是一个大键，推荐使用 unlink
        // 来删除键以避免阻塞 Redis 服务
        await client.del("leaderboard");
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "success",
                message: "排行榜已清空"
            })
        };
    } catch (err) {
        console.error("Clear Leaderboard Error:", err);
        throw err;
    }
}
 
// 批量导入数据
async function batchImport(client, params) {
    const { scores } = params;
 
    if (!scores || !Array.isArray(scores)) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "scores 必须是一个数组"
            })
        };
    }
 
    try {
        // 使用 ioredi s的 pipeline 批量导入
        const pipeline = client.pipeline();
 
        for (const item of scores) {
            if (item.username && typeof item.score === "number") {
                pipeline.zadd("leaderboard", item.score, item.username);
            }
        }
 
        // 执行pipeline
        await pipeline.exec();
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "success",
                message: `成功导入 ${scores.length} 条数据`
            })
        };
    } catch (err) {
        console.error("Batch Import Error:", err);
        throw err;
    }
}
 
// 删除用户
async function deleteUser(client, params) {
    const { username } = params;
 
    if (!username) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少参数：username"
            })
        };
    }
 
    try {
        // 检查用户是否存在
        const score = await client.zscore("leaderboard", username);
 
        if (score === null) {
            return {
                statusCode: 404,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "error",
                    message: `用户 '${username}' 不存在`
                })
            };
        }
 
        // 从有序集合中删除成员
        const removed = await client.zrem("leaderboard", username);
 
        if (removed > 0) {
            return {
                statusCode: 200,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "success",
                    message: `成功删除用户 '${username}'`,
                    data: {
                        username: username,
                        removed_count: removed
                    }
                })
            };
        } else {
            return {
                statusCode: 500,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "error",
                    message: "删除失败"
                })
            };
        }
    } catch (err) {
        console.error("Delete User Error:", err);
        throw err;
    }
}
 
process.on("SIGTERM", async () => {
    if (redisClient) {
        await redisClient.quit();
    }
});

