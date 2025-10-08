// script.js - 游戏排行榜前端逻辑
 
// API 配置
const API_URL = 'https://shengtaidahui-shanghai-927ed19f8-1310738255.ap-shanghai.app.tcloudbase.com/leaderboard';
 
// 全局变量
let refreshInterval = null;
let isImporting = false;
let confirmCallback = null;
let importWorkers = [];
let totalImported = 0;
let importStartTime = null;
 
// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();
    startAutoRefresh();
});
 
// 自动刷新（每5秒）
function startAutoRefresh() {
    refreshInterval = setInterval(() => {
        if (!isImporting) {
            loadLeaderboard();
        }
    }, 5000);
}
 
// 加载排行榜
async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_URL}?action=get_leaderboard&limit=30`);
        const data = await response.json();
        const result = parseResponse(data);
        
        // 更新总玩家数
        document.getElementById('totalPlayers').textContent = result.total_users || 0;
        
        // 渲染排行榜
        renderLeaderboard(result.leaderboard || []);
    } catch (error) {
        console.error('加载排行榜失败:', error);
        showNotification('加载失败', 'error');
    }
}
 
// 渲染排行榜 - 修改版，添加删除功能
function renderLeaderboard(leaderboard) {
    const container = document.getElementById('leaderboard');
    
    if (leaderboard.length === 0) {
        container.innerHTML = '<div class="loading">暂无数据</div>';
        return;
    }
    
    container.innerHTML = leaderboard.map((player, index) => {
        const rankClass = player.rank <= 3 ? `rank-${player.rank}` : '';
        const medal = getMedal(player.rank);
        
        return `
            <div class="leaderboard-item ${rankClass}" style="animation-delay: ${index * 0.05}s">
                <div class="rank">${player.rank}</div>
                ${medal ? `<div class="medal">${medal}</div>` : ''}
                <div class="player-info">
                    <div class="player-name">${escapeHtml(player.username)}</div>
                    <div class="player-score">
                        ${player.score.toLocaleString()}
                        <span class="score-label">分</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="confirmDeletePlayer('${escapeHtml(player.username)}')" title="删除玩家">
                    <span>🗑️</span>
                </button>
            </div>
        `;
    }).join('');
}
 
// 确认删除玩家
function confirmDeletePlayer(username) {
    showConfirmDialog(
        '确认删除',
        `确定要删除玩家 "${username}" 吗？此操作不可恢复！`,
        () => deletePlayer(username)
    );
}
 
// 删除玩家
async function deletePlayer(username) {
    try {
        const response = await fetch(`${API_URL}?action=delete_user&username=${encodeURIComponent(username)}`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification(`玩家 ${username} 已删除`, 'success');
            loadLeaderboard();  // 刷新排行榜
        } else {
            showNotification(result.message || '删除失败', 'error');
        }
    } catch (error) {
        console.error('删除失败:', error);
        showNotification('删除玩家失败', 'error');
    }
}
 
// 获取奖牌图标
function getMedal(rank) {
    const medals = {
        1: '🥇',
        2: '🥈',
        3: '🥉'
    };
    return medals[rank] || '';
}
 
// 查询玩家
async function searchPlayer() {
    const username = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');
    
    if (!username) {
        showNotification('请输入玩家名称', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=query_user&username=${encodeURIComponent(username)}`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'found') {
            resultDiv.className = 'search-result show success';
            resultDiv.innerHTML = `
                <div style="font-size: 1.2rem; color: #00ff00;">✅ 找到玩家</div>
                <div style="margin-top: 10px;">
                    <div>玩家名称：<strong>${escapeHtml(result.data.username)}</strong></div>
                    <div>当前分数：<strong>${result.data.score.toLocaleString()}</strong> 分</div>
                    <div>全球排名：<strong>第 ${result.data.rank} 名</strong> / 共 ${result.data.total_users} 人</div>
                </div>
            `;
        } else {
            resultDiv.className = 'search-result show not-found';
            resultDiv.innerHTML = `
                <div style="font-size: 1.2rem; color: #ff6b6b;">❌ 未找到玩家</div>
                <div style="margin-top: 10px;">玩家 "${escapeHtml(username)}" 不存在</div>
            `;
        }
        
        // 5秒后自动隐藏
        setTimeout(() => {
            resultDiv.classList.remove('show');
        }, 5000);
    } catch (error) {
        console.error('查询失败:', error);
        showNotification('查询失败', 'error');
    }
}
 
// 添加玩家
async function addPlayer() {
    const username = document.getElementById('newPlayerName').value.trim();
    const score = parseInt(document.getElementById('newPlayerScore').value);
    
    if (!username) {
        showNotification('请输入玩家名称', 'error');
        return;
    }
    
    if (isNaN(score) || score < 0) {
        showNotification('请输入有效的分数', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=submit_score&username=${encodeURIComponent(username)}&score=${score}`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification(`玩家 ${username} 添加成功，排名：第 ${result.data.rank} 名`, 'success');
            
            // 清空输入框
            document.getElementById('newPlayerName').value = '';
            document.getElementById('newPlayerScore').value = '';
            
            // 刷新排行榜
            loadLeaderboard();
        } else {
            showNotification('添加失败', 'error');
        }
    } catch (error) {
        console.error('添加失败:', error);
        showNotification('添加失败', 'error');
    }
}
 
// 生成测试数据
async function generateTestData() {
    const testPlayers = [
        { username: 'DragonSlayer', score: Math.floor(Math.random() * 50000) + 50000 },
        { username: 'PhoenixRising', score: Math.floor(Math.random() * 40000) + 40000 },
        { username: 'ShadowNinja', score: Math.floor(Math.random() * 35000) + 35000 },
        { username: 'CyberWarrior', score: Math.floor(Math.random() * 30000) + 30000 },
        { username: 'MysticMage', score: Math.floor(Math.random() * 25000) + 25000 },
        { username: 'ThunderBolt', score: Math.floor(Math.random() * 20000) + 20000 },
        { username: 'IceQueen', score: Math.floor(Math.random() * 18000) + 18000 },
        { username: 'FireStorm', score: Math.floor(Math.random() * 15000) + 15000 },
        { username: 'WindWalker', score: Math.floor(Math.random() * 12000) + 12000 },
        { username: 'EarthShaker', score: Math.floor(Math.random() * 10000) + 10000 }
    ];
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'batch_import',
                scores: testPlayers
            })
        });
        
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification(`成功生成 ${testPlayers.length} 条测试数据`, 'success');
            loadLeaderboard();
        } else {
            showNotification('生成失败', 'error');
        }
    } catch (error) {
        console.error('生成失败:', error);
        showNotification('生成测试数据失败', 'error');
    }
}
 
// 开始大量数据导入
async function startMassiveImport() {
    if (isImporting) {
        showNotification('正在导入中，请稍候...', 'warning');
        return;
    }
    
    const btn = document.getElementById('massiveImportBtn');
    const progressDiv = document.getElementById('importProgress');
    
    isImporting = true;
    totalImported = 0;
    importStartTime = Date.now();
    
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span> 导入中...';
    progressDiv.style.display = 'block';
    
    // 使用Web Workers进行多线程导入
    const totalRecords = 1000000;
    const batchSize = 2000;
    const numWorkers = 60;
    const recordsPerWorker = Math.floor(totalRecords / numWorkers);
    
    // 创建导入任务
    const importPromises = [];
    for (let i = 0; i < numWorkers; i++) {
        const startIndex = i * recordsPerWorker;
        const endIndex = (i === numWorkers - 1) ? totalRecords : (i + 1) * recordsPerWorker;
        importPromises.push(importBatch(startIndex, endIndex, batchSize));
    }
    
    // 更新进度
    const progressInterval = setInterval(() => {
        updateProgress(totalRecords);
    }, 100);
    
    try {
        await Promise.all(importPromises);
        
        clearInterval(progressInterval);
        updateProgress(totalRecords);
        
        showNotification(`成功导入 ${totalImported.toLocaleString()} 条数据！`, 'success');
        
        // 重置UI
        setTimeout(() => {
            progressDiv.style.display = 'none';
            btn.disabled = false;
            btn.innerHTML = '<span class="btn-icon">🚀</span> 插入100万数据';
            isImporting = false;
            loadLeaderboard();
        }, 2000);
        
    } catch (error) {
        clearInterval(progressInterval);
        console.error('导入失败:', error);
        showNotification('导入失败', 'error');
        
        progressDiv.style.display = 'none';
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">🚀</span> 插入100万数据';
        isImporting = false;
    }
}
 
// 批量导入数据
async function importBatch(startIndex, endIndex, batchSize) {
    for (let i = startIndex; i < endIndex; i += batchSize) {
        const currentBatchSize = Math.min(batchSize, endIndex - i);
        const batch = [];
        
        for (let j = 0; j < currentBatchSize; j++) {
            const index = i + j;
            batch.push({
                username: generateUsername(index),
                score: generateScore()
            });
        }
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'batch_import',
                    scores: batch
                })
            });
            
            if (response.ok) {
                totalImported += currentBatchSize;
            }
        } catch (error) {
            console.error('批次导入失败:', error);
        }
    }
}
 
// 生成用户名
function generateUsername(index) {
    const prefixes = ['Player', 'Gamer', 'Pro', 'Elite', 'Master', 'Legend', 'Hero', 'Champion'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}_${index}_${randomStr}`;
}
 
// 生成分数
function generateScore() {
    // 使用正态分布生成更真实的分数
    const random = Math.random();
    if (random < 0.7) {
        // 70%的玩家在1000-30000分
        return Math.floor(Math.random() * 29000) + 1000;
    } else if (random < 0.95) {
        // 25%的玩家在30000-80000分
        return Math.floor(Math.random() * 50000) + 30000;
    } else {
        // 5%的高分玩家在80000-150000分
        return Math.floor(Math.random() * 70000) + 80000;
    }
}
 
// 更新进度
function updateProgress(total) {
    const progress = (totalImported / total) * 100;
    const elapsed = (Date.now() - importStartTime) / 1000;
    const speed = totalImported / elapsed;
    const remaining = (total - totalImported) / speed;
    
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${progress.toFixed(1)}%`;
    document.getElementById('importedCount').textContent = totalImported.toLocaleString();
    document.getElementById('importSpeed').textContent = Math.floor(speed).toLocaleString();
    document.getElementById('remainingTime').textContent = remaining > 0 ? `${Math.ceil(remaining)}秒` : '完成';
}
 
// 确认清空排行榜
function confirmClearLeaderboard() {
    showConfirmDialog(
        '确认清空',
        '确定要清空所有排行榜数据吗？此操作不可恢复！',
        clearLeaderboard
    );
}
 
// 清空排行榜
async function clearLeaderboard() {
    try {
        const response = await fetch(`${API_URL}?action=clear_leaderboard`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification('排行榜已清空', 'success');
            loadLeaderboard();
        } else {
            showNotification('清空失败', 'error');
        }
    } catch (error) {
        console.error('清空失败:', error);
        showNotification('清空失败', 'error');
    }
}
 
// 显示确认对话框
function showConfirmDialog(title, message, callback) {
    const dialog = document.getElementById('confirmDialog');
    document.querySelector('.modal-title').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    dialog.style.display = 'block';
}
 
// 确认操作
function confirmAction() {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'none';
    if (confirmCallback) {
        confirmCallback();
        confirmCallback = null;
    }
}
 
// 取消操作
function cancelAction() {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'none';
    confirmCallback = null;
}
 
// 显示通知
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <div class="notification-content">${message}</div>
        <span class="notification-close" onclick="this.parentElement.remove()">×</span>
    `;
    
    container.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
 
// 解析响应
function parseResponse(response) {
    if (response.body && typeof response.body === 'string') {
        return JSON.parse(response.body);
    }
    return response;
}
 
// HTML转义
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
 
// 监听回车键
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPlayer();
    }
});
 
document.getElementById('newPlayerName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const scoreInput = document.getElementById('newPlayerScore');
        if (scoreInput.value) {
            addPlayer();
        } else {
            scoreInput.focus();
        }
    }
});
 
document.getElementById('newPlayerScore').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPlayer();
    }
});
 
// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
