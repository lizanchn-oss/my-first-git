document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('back-btn');
    const recipeTitle = document.getElementById('recipe-title');
    const recipeContent = document.getElementById('recipe-content');

    // 返回按钮事件
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // 获取URL参数中的食谱名称
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get('name');

    if (!recipeName) {
        recipeContent.innerHTML = '<p>未找到食谱信息</p>';
        return;
    }

    // 示例食谱数据（与主页面保持同步）
    const sampleRecipes = [
        {
            name: '番茄炒蛋',
            description: '经典的中式家常菜，简单美味',
            ingredients: ['鸡蛋 3个', '番茄 2个', '盐 适量', '糖 少许', '食用油 适量'],
            steps: [
                '鸡蛋打散，加入少许盐搅拌均匀',
                '番茄洗净切块',
                '热锅倒油，放入鸡蛋液炒至半熟盛出',
                '锅中再倒油，放入番茄翻炒出汁',
                '放入炒好的鸡蛋，加入盐和糖调味，快速翻炒均匀即可'
            ]
        },
        {
            name: '宫保鸡丁',
            description: '川菜代表，麻辣鲜香',
            ingredients: ['鸡胸肉 300g', '花生米 50g', '干辣椒 8-10个', '花椒 适量', '葱姜蒜 适量', '酱油 2勺', '糖 1勺', '醋 1勺'],
            steps: [
                '鸡胸肉切丁，用盐、料酒腌制10分钟',
                '花生米炒熟备用',
                '热锅倒油，放入花椒和干辣椒炒香',
                '放入葱姜蒜爆香，然后放入鸡丁翻炒至变色',
                '加入酱油、糖、醋调味，翻炒均匀',
                '最后放入花生米，快速翻炒即可出锅'
            ]
        },
        {
            name: '红烧肉',
            description: '肥而不腻，入口即化',
            ingredients: ['五花肉 500g', '姜 几片', '葱 适量', '八角 2个', '酱油 3勺', '料酒 2勺', '冰糖 30g', '水 适量'],
            steps: [
                '五花肉切块，冷水下锅煮开，撇去浮沫',
                '捞出肉块，用温水冲洗干净',
                '热锅倒油，放入冰糖小火炒至融化变红',
                '放入肉块翻炒上色，加入姜片、葱段、八角',
                '倒入酱油、料酒和水，没过肉块',
                '大火烧开后转小火慢炖1-2小时至肉烂即可'
            ]
        },
        {
            name: '水煮鱼',
            description: '鲜嫩麻辣，四川特色',
            ingredients: ['鱼片 400g', '豆芽 200g', '干辣椒 10个', '花椒 1勺', '姜蒜 适量', '郫县豆瓣酱 2勺', '料酒 1勺', '盐 适量'],
            steps: [
                '鱼片用盐、料酒腌制10分钟',
                '豆芽洗净备用',
                '热锅倒油，放入花椒、干辣椒、姜蒜爆香',
                '加入郫县豆瓣酱炒出红油',
                '倒入适量水烧开，放入豆芽煮软',
                '放入鱼片，煮至鱼片变白即可',
                '撒上葱花和香菜提味'
            ]
        }
    ];

    // 查找对应的食谱
    const recipe = sampleRecipes.find(r => r.name === decodeURIComponent(recipeName));

    if (!recipe) {
        recipeContent.innerHTML = '<p>未找到该食谱的详细信息</p>';
        return;
    }

    // 设置标题
    recipeTitle.textContent = recipe.name;

    // 生成详情内容
    const contentHTML = `
        <div class="recipe-detail">
            <p class="recipe-description-detail">${recipe.description}</p>

            <div class="ingredients">
                <h2>食材</h2>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>

            <div class="steps">
                <h2>步骤</h2>
                <ol>
                    ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;

    recipeContent.innerHTML = contentHTML;
});