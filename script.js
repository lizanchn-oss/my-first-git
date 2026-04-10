document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            alert('请输入完整的登录信息');
            return;
        }

        // 模拟北大身份认证登录逻辑
        console.log('正在连接北大身份认证中心...', { username });
        
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerText;
        
        loginBtn.disabled = true;
        loginBtn.innerText = '验证中...';
        loginBtn.style.opacity = '0.7';

        setTimeout(() => {
            alert('北京大学身份认证成功！\n欢迎回来：' + username);
            loginBtn.disabled = false;
            loginBtn.innerText = originalText;
            loginBtn.style.opacity = '1';
        }, 1200);
    });

    // 为输入框添加动态反馈
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.parentElement.querySelector('label');
            if (label) label.style.color = '#8c1918';
        });
        
        input.addEventListener('blur', () => {
            const label = input.parentElement.querySelector('label');
            if (label) label.style.color = '';
        });
    });
});
