// script.js - 云函数版本

// API 配置
const API_URL = 'https://shengtaidahui-shanghai-927ed19f8-1310738255.ap-shanghai.app.tcloudbase.com/backpack';
let currentItems = [];
let selectedItem = null;
let confirmCallback = null;
let currentEnchantingItem = null;

// 页面加载时获取装备列表
window.onload = function() {
    loadItems();
};

// 解析云函数响应
function parseCloudResponse(response) {
    // 云函数可能将实际数据包装在body字段中
    if (response.body && typeof response.body === 'string') {
        return JSON.parse(response.body);
    }
    return response;
}

// 通知系统
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <span class="notification-close" onclick="this.parentElement.remove()">×</span>
    `;

    container.appendChild(notification);

    // 自动移除通知
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// 自定义确认对话框
function showConfirmDialog(title, message, callback) {
    const dialog = document.getElementById('confirm-dialog');
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-message').textContent = message;
    confirmCallback = callback;
    dialog.style.display = 'block';
}

function confirmAction() {
    document.getElementById('confirm-dialog').style.display = 'none';
    if (confirmCallback) {
        confirmCallback();
        confirmCallback = null;
    }
}

function cancelAction() {
    document.getElementById('confirm-dialog').style.display = 'none';
    confirmCallback = null;
}

// 加载装备列表 - 云函数版本
async function loadItems() {
    try {
        // 使用GET请求调用云函数
        const response = await fetch(`${API_URL}?action=get_items`);
        const data = await response.json();
        currentItems = parseCloudResponse(data);

        // 确保currentItems是数组
        if (!Array.isArray(currentItems)) {
            console.error('Invalid items data:', currentItems);
            currentItems = [];
        }

        renderInventory();
    } catch (error) {
        console.error('Failed to load items:', error);
        showNotification('加载失败', '无法加载装备列表', 'error');
    }
}

// 渲染背包
function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';

    // 创建64个格子（8x8）
    for (let i = 0; i < 64; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';

        if (i < currentItems.length) {
            const item = currentItems[i];
            slot.className += ' occupied';
            slot.innerHTML = `
                <div class="item-icon rarity-${item.rarity}">
                    ${getItemIcon(item.type)}
                    <span class="item-level">Lv.${item.level}</span>
                </div>
            `;
            slot.onclick = () => selectItem(item);

            // 添加稀有度边框效果
            slot.style.borderColor = item.color;
        }

        grid.appendChild(slot);
    }
}

// 获取装备图标
function getItemIcon(type) {
    const icons = {
        'weapon': '⚔️',
        'armor': '🛡️',
        'accessory': '💎'
    };
    return icons[type] || '📦';
}

// 选择装备显示详情
function selectItem(item) {
    selectedItem = item;
    const detailDiv = document.getElementById('item-detail');

    // 构建装备详情HTML
    let html = `
        <h3 class="rarity-${item.rarity}">${item.name}</h3>
        <p class="item-type">类型: ${getTypeName(item.type)} | 等级: ${item.level}</p>
        <ul class="stats-list">
    `;

    // 显示基础属性
    if (item.stats) {
        html += renderStats(item.stats);
    }

    html += '</ul>';

    // 显示特殊效果
    if (item.special_effect) {
        html += `
            <div class="special-effect">
                <h4>${item.special_effect.name}</h4>
                <p>${item.special_effect.description}</p>
            </div>
        `;
    }

    // 显示附魔信息
    if (item.enchantments && item.enchantments.length > 0) {
        html += '<div class="enchantments"><h4>附魔:</h4><ul>';
        item.enchantments.forEach(ench => {
            const qualityClass = `enchant-quality-${ench.quality}`;
            html += `<li class="${qualityClass}">${ench.name}: +${formatEnchantValue(ench.stat, ench.value)}</li>`;
        });
        html += '</ul></div>';
    }

    // 添加操作按钮
    const enchantCount = item.enchantments ? item.enchantments.length : 0;
    const canEnchant = enchantCount < 3;

    html += `
        <div style="margin-top: 20px;">
            ${canEnchant ?
        `<button class="btn btn-primary" onclick="showEnchantDialog('${item._id}')">附魔 (${enchantCount}/3)</button>` :
        `<button class="btn btn-primary" disabled style="opacity: 0.5;">已达最大附魔次数</button>`
    }
            <button class="btn btn-danger" onclick="confirmDeleteItem('${item._id}')">销毁</button>
        </div>
    `;

    detailDiv.innerHTML = html;
}

// 格式化附魔数值
function formatEnchantValue(stat, value) {
    const percentStats = ['crit_rate', 'life_steal', 'damage_reduction', 'exp_bonus'];
    if (percentStats.includes(stat)) {
        return `${(value * 100).toFixed(1)}%`;
    }
    return value;
}

// 渲染属性
function renderStats(stats, prefix = '') {
    let html = '';

    for (const [key, value] of Object.entries(stats)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            html += renderStats(value, key + '.');
        } else if (Array.isArray(value)) {
            value.forEach(stat => {
                if (stat.type && stat.value) {
                    const statName = getStatName(stat.type);
                    html += `<li><span class="stat-name">${statName}</span><span class="stat-value">+${stat.value}</span></li>`;
                }
            });
        } else {
            const statName = getStatName(key);
            const statValue = formatStatValue(key, value);
            html += `<li><span class="stat-name">${statName}</span><span class="stat-value">${statValue}</span></li>`;
        }
    }

    return html;
}

// 获取类型名称
function getTypeName(type) {
    const names = {
        'weapon': '武器',
        'armor': '护甲',
        'accessory': '饰品'
    };
    return names[type] || type;
}

// 获取属性名称
function getStatName(stat) {
    const names = {
        'attack': '攻击力',
        'defense': '防御力',
        'health': '生命值',
        'crit_rate': '暴击率',
        'attack_speed': '攻击速度',
        'fire': '火焰抗性',
        'ice': '冰霜抗性',
        'thunder': '雷电抗性',
        'life_steal': '生命偷取',
        'elemental_damage': '元素伤害',
        'damage_reduction': '伤害减免',
        'all_resistance': '全部抗性',
        'health_regen': '生命回复',
        'strength': '力量',
        'agility': '敏捷',
        'intelligence': '智力',
        'luck': '幸运',
        'exp_bonus': '经验加成'
    };
    return names[stat] || stat;
}

// 格式化属性值
function formatStatValue(stat, value) {
    if (stat === 'crit_rate') {
        return `${(value * 100).toFixed(1)}%`;
    } else if (stat === 'attack_speed') {
        return `${value.toFixed(1)}`;
    } else if (stat.includes('resistance') || stat.includes('fire') || stat.includes('ice') || stat.includes('thunder')) {
        return `${value}%`;
    }
    return value;
}

// 初始化示例数据 - 云函数版本
async function initSampleData() {
    try {
        // 使用POST请求调用云函数
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'init_data' })
        });

        const data = await response.json();
        const result = parseCloudResponse(data);

        await loadItems();
        showNotification('初始化成功', result.message || '示例数据已加载', 'success');
    } catch (error) {
        console.error('Failed to init data:', error);
        showNotification('初始化失败', '无法初始化示例数据', 'error');
    }
}

// 初始化示例数据 - 云函数版本
async function deleteSampleData() {
    try {
        // 使用POST请求调用云函数
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete_data' })
        });

        const data = await response.json();
        const result = parseCloudResponse(data);

        await loadItems();
        showNotification('删除成功', result.message || '示例数据已删除', 'success');
    } catch (error) {
        console.error('Failed to init data:', error);
        showNotification('删除失败', '无法删除示例数据', 'error');
    }
}

// 显示创建装备模态框
function showCreateItemModal() {
    document.getElementById('create-modal').style.display = 'block';
}

// 关闭模态框
function closeModal() {
    document.getElementById('create-modal').style.display = 'none';
    document.getElementById('create-item-form').reset();
}

// 创建装备表单提交 - 云函数版本
document.getElementById('create-item-form').onsubmit = async function(e) {
    e.preventDefault();

    const itemData = {
        action: 'create_item',
        name: document.getElementById('item-name').value,
        type: document.getElementById('item-type').value,
        rarity: document.getElementById('item-rarity').value,
        level: parseInt(document.getElementById('item-level').value)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        });

        if (response.ok) {
            const data = await response.json();
            const result = parseCloudResponse(data);

            closeModal();
            await loadItems();
            showNotification('创建成功', `装备"${itemData.name}"已创建`, 'success');
        } else {
            const errorData = await response.json();
            const error = parseCloudResponse(errorData);
            showNotification('创建失败', error.error || '无法创建装备', 'error');
        }
    } catch (error) {
        console.error('Failed to create item:', error);
        showNotification('创建失败', '无法创建装备', 'error');
    }
};

// 确认删除装备
function confirmDeleteItem(itemId) {
    const item = currentItems.find(i => i._id === itemId);
    showConfirmDialog(
        '确认销毁装备',
        `确定要销毁"${item.name}"吗？此操作不可恢复！`,
        () => deleteItem(itemId)
    );
}

// 删除装备 - 云函数版本
async function deleteItem(itemId) {
    try {
        // 使用GET请求调用云函数（也可以用POST）
        const response = await fetch(`${API_URL}?action=delete_item&item_id=${itemId}`, {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            const result = parseCloudResponse(data);

            await loadItems();
            document.getElementById('item-detail').innerHTML = '<p class="no-selection">点击装备查看详情</p>';
            showNotification('销毁成功', result.message || '装备已被销毁', 'success');
        } else {
            const errorData = await response.json();
            const error = parseCloudResponse(errorData);
            showNotification('删除失败', error.error || '无法删除装备', 'error');
        }
    } catch (error) {
        console.error('Failed to delete item:', error);
        showNotification('删除失败', '无法删除装备', 'error');
    }
}

// 显示附魔对话框
function showEnchantDialog(itemId) {
    const item = currentItems.find(i => i._id === itemId);
    currentEnchantingItem = item;

    const dialog = document.getElementById('enchant-dialog');
    document.getElementById('enchant-item-name').textContent = item.name;
    document.getElementById('enchant-item-name').className = `rarity-${item.rarity}`;
    document.getElementById('enchant-item-type').textContent = `${getTypeName(item.type)} - 等级 ${item.level}`;

    // 重置界面
    document.getElementById('enchant-animation').style.display = 'none';
    document.getElementById('enchant-result').style.display = 'none';
    document.getElementById('enchant-result').innerHTML = '';
    document.getElementById('enchant-btn').disabled = false;
    document.getElementById('enchant-btn').innerHTML = '<span class="enchant-icon">✨</span> 开始附魔';

    dialog.style.display = 'block';
}

// 关闭附魔对话框
function closeEnchantDialog() {
    document.getElementById('enchant-dialog').style.display = 'none';
    currentEnchantingItem = null;
    // 刷新装备详情
    if (selectedItem) {
        const updatedItem = currentItems.find(i => i._id === selectedItem._id);
        if (updatedItem) {
            selectItem(updatedItem);
        }
    }
}

// 执行附魔 - 云函数版本
async function performEnchantment() {
    if (!currentEnchantingItem) return;

    const enchantBtn = document.getElementById('enchant-btn');
    const animationDiv = document.getElementById('enchant-animation');
    const resultDiv = document.getElementById('enchant-result');

    // 禁用按钮，显示动画
    enchantBtn.disabled = true;
    enchantBtn.innerHTML = '<span class="enchant-icon">⏳</span> 附魔中...';
    animationDiv.style.display = 'flex';
    resultDiv.style.display = 'none';

    try {
        // 使用POST请求调用云函数
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'enchant_item',
                item_id: currentEnchantingItem._id
            })
        });

        const data = await response.json();
        const result = parseCloudResponse(data);

        // 模拟附魔过程
        setTimeout(() => {
            animationDiv.style.display = 'none';

            if (response.ok && result.success) {
                // 显示成功结果
                const enchant = result.enchantment;
                resultDiv.innerHTML = `
                    <div class="enchant-success">
                        附魔成功！
                    </div>
                    <div class="enchant-stat enchant-quality-${enchant.quality}">
                        <strong>${enchant.name}</strong>: +${formatEnchantValue(enchant.stat, enchant.value)}
                    </div>
                `;
                resultDiv.style.display = 'block';

                // 更新本地数据
                loadItems();

                // 显示通知
                showNotification('附魔成功', result.message, 'success');

                // 更新按钮
                enchantBtn.innerHTML = '<span class="enchant-icon">✅</span> 附魔完成';
            } else {
                // 显示失败信息
                resultDiv.innerHTML = `
                    <div style="color: #dc143c; font-size: 18px;">
                        附魔失败：${result.message || result.error || '未知错误'}
                    </div>
                `;
                resultDiv.style.display = 'block';

                showNotification('附魔失败', result.message || result.error || '未知错误', 'error');

                enchantBtn.disabled = false;
                enchantBtn.innerHTML = '<span class="enchant-icon">✨</span> 重新附魔';
            }
        }, 2000);

    } catch (error) {
        console.error('Failed to enchant item:', error);

        setTimeout(() => {
            animationDiv.style.display = 'none';
            resultDiv.innerHTML = `
                <div style="color: #dc143c; font-size: 18px;">
                    网络错误，请重试
                </div>
            `;
            resultDiv.style.display = 'block';

            showNotification('附魔失败', '网络错误，请重试', 'error');

            enchantBtn.disabled = false;
            enchantBtn.innerHTML = '<span class="enchant-icon">✨</span> 重新附魔';
        }, 1000);
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const createModal = document.getElementById('create-modal');
    const confirmDialog = document.getElementById('confirm-dialog');
    const enchantDialog = document.getElementById('enchant-dialog');

    if (event.target === createModal) {
        closeModal();
    } else if (event.target === confirmDialog) {
        cancelAction();
    } else if (event.target === enchantDialog) {
        closeEnchantDialog();
    }
};

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes notificationSlideOut {
        to {
            transform: translateX(120%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);