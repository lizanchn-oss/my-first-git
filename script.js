document.addEventListener('DOMContentLoaded', function() {
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeDescriptionInput = document.getElementById('recipe-description');
    const addBtn = document.getElementById('add-btn');
    const recipeList = document.getElementById('recipe-list');

    // 示例食谱，包含详细的菜谱信息
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

    // 全局食谱数组
    let recipes = [...sampleRecipes];

    // 从localStorage加载收藏状态
    const favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));

    // 渲染食谱列表
    function renderRecipes() {
        recipeList.innerHTML = '';
        // 收藏的食谱放在前面
        const sortedRecipes = recipes.sort((a, b) => {
            const aFav = favorites.has(a.name);
            const bFav = favorites.has(b.name);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return 0;
        });
        sortedRecipes.forEach(recipe => addRecipeToList(recipe));
    }

    // 初始化示例食谱
    renderRecipes();

    // 添加食谱事件
    addBtn.addEventListener('click', function() {
        const name = recipeNameInput.value.trim();
        const description = recipeDescriptionInput.value.trim();

        if (name && description) {
            // 为新添加的食谱创建基本结构（没有详细菜谱）
            const newRecipe = {
                name: name,
                description: description,
                ingredients: ['食材信息待添加'],
                steps: ['步骤信息待添加']
            };
            recipes.push(newRecipe);
            renderRecipes();
            recipeNameInput.value = '';
            recipeDescriptionInput.value = '';
        } else {
            alert('请输入食谱名称和描述');
        }
    });

    // 允许按Enter键添加
    recipeNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            recipeDescriptionInput.focus();
        }
    });

    recipeDescriptionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    function addRecipeToList(recipe) {
        const li = document.createElement('li');
        li.className = 'recipe-item';

        const content = document.createElement('div');
        content.className = 'recipe-content';

        const nameDiv = document.createElement('a');
        nameDiv.className = 'recipe-name';
        nameDiv.textContent = recipe.name;
        nameDiv.href = `recipe-detail.html?name=${encodeURIComponent(recipe.name)}`;
        nameDiv.style.textDecoration = 'none';
        nameDiv.style.color = 'inherit';
        nameDiv.style.cursor = 'pointer';

        const descDiv = document.createElement('div');
        descDiv.className = 'recipe-description';
        descDiv.textContent = recipe.description;

        content.appendChild(nameDiv);
        content.appendChild(descDiv);

        // 按钮容器
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'recipe-buttons';

        // 星星图标
        const starBtn = document.createElement('button');
        starBtn.className = 'star-btn';
        starBtn.textContent = favorites.has(recipe.name) ? '★' : '☆';
        starBtn.addEventListener('click', function() {
            if (favorites.has(recipe.name)) {
                favorites.delete(recipe.name);
            } else {
                favorites.add(recipe.name);
            }
            localStorage.setItem('favorites', JSON.stringify([...favorites]));
            renderRecipes();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', function() {
            recipes = recipes.filter(r => r.name !== recipe.name);
            favorites.delete(recipe.name);
            localStorage.setItem('favorites', JSON.stringify([...favorites]));
            renderRecipes();
        });

        buttonsDiv.appendChild(starBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(content);
        li.appendChild(buttonsDiv);
        recipeList.appendChild(li);
    }
});