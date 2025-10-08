// index.js - 游戏装备管理云函数
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB 连接配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const DB_NAME = 'game_inventory';
const COLLECTION_NAME = 'items';

let cachedClient = null;
let cachedDb = null;

// 附魔池配置
const enchantmentPool = {
    // 武器
    weapon: [
        { name: '锋利', stat: 'attack', min: 5, max: 25 },
        { name: '暴击', stat: 'crit_rate', min: 0.02, max: 0.10 },
        { name: '迅捷', stat: 'attack_speed', min: 0.1, max: 0.5 },
        { name: '吸血', stat: 'life_steal', min: 0.05, max: 0.15 },
        { name: '元素伤害', stat: 'elemental_damage', min: 10, max: 50 }
    ],
    // 护甲
    armor: [
        { name: '坚固', stat: 'defense', min: 5, max: 20 },
        { name: '活力', stat: 'health', min: 50, max: 200 },
        { name: '韧性', stat: 'damage_reduction', min: 0.02, max: 0.08 },
        { name: '抗性', stat: 'all_resistance', min: 5, max: 15 },
        { name: '再生', stat: 'health_regen', min: 1, max: 10 }
    ],
    // 饰品
    accessory: [
        { name: '力量', stat: 'strength', min: 5, max: 15 },
        { name: '敏捷', stat: 'agility', min: 5, max: 15 },
        { name: '智力', stat: 'intelligence', min: 5, max: 15 },
        { name: '幸运', stat: 'luck', min: 1, max: 10 },
        { name: '经验加成', stat: 'exp_bonus', min: 0.05, max: 0.20 }
    ]
};

// 连接 MongoDB
async function connectToDatabase() {
    if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

// 解析请求参数
function parseRequestParams(event) {
    let params = {};

    // 处理 GET 请求参数
    if (event.queryStringParameters) {
        params = { ...event.queryStringParameters };
    }

    // 处理 POST 请求body
    if (event.body) {
        let bodyData = {};

        if (typeof event.body === 'string') {
            try {
                bodyData = JSON.parse(event.body);
            } catch (e) {
                console.log('Body解析失败:', e);
            }
        } else if (typeof event.body === 'object') {
            bodyData = event.body;
        }

        params = { ...params, ...bodyData };
    }

    // 兼容直接传入的参数
    if (!params.action && event.action) {
        params = { ...params, ...event };
    }

    return params;
}

// CORS headers
function getCORSHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}

// 生成随机数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机浮点数
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// 生成随机属性
function generateRandomStats(itemType) {
    const baseStats = {
        // 武器
        weapon: {
            // 攻击力
            attack: randomInt(10, 100),
            // 暴击率
            crit_rate: randomFloat(0.05, 0.25),
            // 攻击速度
            attack_speed: randomFloat(0.8, 2.0)
        },
        // 护甲
        armor: {
            // 防御力
            defense: randomInt(5, 50),
            // 生命值
            health: randomInt(50, 500),
            // 抗性
            resistance: {
                // 火焰抗性
                fire: randomInt(0, 30),
                // 冰冻抗性
                ice: randomInt(0, 30),
                // 雷电抗性
                thunder: randomInt(0, 30)
            }
        },
        // 饰品
        accessory: {
            bonus_stats: [
                // 力量
                { type: 'strength', value: randomInt(1, 20) },
                // 敏捷
                { type: 'agility', value: randomInt(1, 20) },
                // 智力
                { type: 'intelligence', value: randomInt(1, 20) }
            ]
        }
    };

    return baseStats[itemType] || {};
}

// 生成装备
function generateItem(name, itemType, rarity, level) {
    const rarities = {
        common: { color: '#808080', quality: 1 },
        rare: { color: '#0066cc', quality: 2 },
        epic: { color: '#9932cc', quality: 3 },
        legendary: { color: '#ff8c00', quality: 4 }
    };

    const item = {
        name: name,
        type: itemType,
        rarity: rarity, // 稀有度
        level: level, // 等级
        color: rarities[rarity].color, // 颜色
        quality: rarities[rarity].quality, // 质量
        stats: generateRandomStats(itemType), // 属性
        created_at: new Date(), // 创建时间
        enchantments: [], // 附魔
    };

    // 传奇装备特殊效果
    if (rarity === 'legendary') {
        item.special_effect = {
            name: '烈焰之怒',
            description: '攻击时有20%概率造成额外火焰伤害',
            proc_chance: 0.2,
            damage_type: 'fire',
            damage_range: [50, 150]
        };
    }

    return item;
}

// 生成随机附魔
function generateRandomEnchantment(itemType) {
    const pool = enchantmentPool[itemType] || enchantmentPool.accessory;
    const enchant = pool[randomInt(0, pool.length - 1)];

    // 生成随机数值
    let value;
    if (typeof enchant.min === 'number' && enchant.min % 1 !== 0) {
        value = randomFloat(enchant.min, enchant.max);
    } else {
        value = randomInt(enchant.min, enchant.max);
    }

    // 随机附魔品质
    const qualityRoll = Math.random();
    let quality, color;

    if (qualityRoll < 0.1) {  // 10%概率获得完美附魔
        quality = 'perfect';
        value = value * 1.5;
        color = '#ff6b6b';
    } else if (qualityRoll < 0.3) {  // 20%概率获得优秀附魔
        quality = 'excellent';
        value = value * 1.2;
        color = '#ffd93d';
    } else {  // 70%概率获得普通附魔
        quality = 'normal';
        color = '#6bcf7f';
    }

    return {
        name: enchant.name,
        stat: enchant.stat,
        value: typeof value === 'number' && value % 1 !== 0 ?
            Math.round(value * 100) / 100 : Math.floor(value),
        quality: quality,
        color: color,
        timestamp: new Date()
    };
}

// 初始化示例数据
async function initSampleData(db) {
    const collection = db.collection(COLLECTION_NAME);

    let sampleItems = [
        ['炎魔之剑', 'weapon', 'legendary', 100],
        ['寒冰护甲', 'armor', 'epic', 55],
        ['雷霆之戒', 'accessory', 'rare', 45],
        ['钢铁长剑', 'weapon', 'common', 20],
        ['魔法护符', 'accessory', 'epic', 50],
        ['龙鳞胸甲', 'armor', 'legendary', 65],
        ['疾风之靴', 'armor', 'rare', 40],
        ['智慧之冠', 'armor', 'epic', 52],
    ];
    sampleItems = [...sampleItems].sort(() => Math.random() - 0.5);

    const items = sampleItems.map(itemData => generateItem(...itemData));
    await collection.insertMany(items);

    return { message: 'Sample data initialized successfully', count: items.length };
}

// 清空示例数据
async function deleteSampleData(db) {
    const collection = db.collection(COLLECTION_NAME);
    await collection.deleteMany({});
    return { message: 'Sample data deleted successfully' };
}

// 主函数
exports.main = async (event, context) => {
    try {
        const params = parseRequestParams(event);
        const { action } = params;

        // 连接数据库
        const { db } = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);

        let result;

        switch (action) {
            case 'init_data':
                result = await initSampleData(db);
                break;

            case 'delete_data':
                result = await deleteSampleData(db);
                break;

            case 'get_items':
                const items = await collection.find({}).toArray();
                result = items.map(item => ({
                    ...item,
                    _id: item._id.toString()
                }));
                break;

            case 'get_item':
                const { item_id } = params;
                if (!item_id) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'item_id is required' })
                    };
                }

                const item = await collection.findOne({ _id: new ObjectId(item_id) });
                if (item) {
                    result = { ...item, _id: item._id.toString() };
                } else {
                    return {
                        statusCode: 404,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'Item not found' })
                    };
                }
                break;

            case 'create_item':
                const { name, type, rarity, level } = params;
                if (!name || !type || !rarity || !level) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({
                            error: 'Missing required fields: name, type, rarity, level'
                        })
                    };
                }

                const newItem = generateItem(name, type, rarity, parseInt(level));
                const insertResult = await collection.insertOne(newItem);
                result = {
                    ...newItem,
                    _id: insertResult.insertedId.toString()
                };
                break;

            case 'delete_item':
                const { item_id: deleteId } = params;
                if (!deleteId) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'item_id is required' })
                    };
                }

                const deleteResult = await collection.deleteOne({
                    _id: new ObjectId(deleteId)
                });

                if (deleteResult.deletedCount > 0) {
                    result = { message: 'Item deleted successfully' };
                } else {
                    return {
                        statusCode: 404,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'Item not found' })
                    };
                }
                break;

            case 'enchant_item':
                const { item_id: enchantId } = params;
                if (!enchantId) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'item_id is required' })
                    };
                }

                // 获取装备信息
                const itemToEnchant = await collection.findOne({
                    _id: new ObjectId(enchantId)
                });

                if (!itemToEnchant) {
                    return {
                        statusCode: 404,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'Item not found' })
                    };
                }

                // 检查附魔次数限制
                const currentEnchantments = itemToEnchant.enchantments?.length || 0;
                if (currentEnchantments >= 3) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({
                            error: 'Maximum enchantments reached',
                            message: '该装备已达到最大附魔次数（3次）'
                        })
                    };
                }

                // 生成随机附魔
                const enchantment = generateRandomEnchantment(itemToEnchant.type);

                // 更新装备
                await collection.updateOne(
                    { _id: new ObjectId(enchantId) },
                    { $push: { enchantments: enchantment } }
                );

                result = {
                    success: true,
                    enchantment: enchantment,
                    message: `成功附魔：${enchantment.name} +${enchantment.value}`
                };
                break;

            default:
                result = {
                    message: '游戏装备管理API',
                    availableActions: [
                        'init_data - 初始化示例数据',
                        'delete_data - 清空示例数据',
                        'get_items - 获取所有装备',
                        'get_item - 获取单个装备（需要item_id）',
                        'create_item - 创建新装备（需要name, type, rarity, level）',
                        'delete_item - 删除装备（需要item_id）',
                        'enchant_item - 附魔装备（需要item_id）'
                    ]
                };
        }

        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify(result)
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
