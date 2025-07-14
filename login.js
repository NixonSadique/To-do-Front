const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const form = document.getElementById('loginForm');
const loginUrl = "http://localhost:8080/todo/auth/login";


const authenticateLogin = async (event) => {
    event.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    try {
        const data = await authenticateUser(username, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId)
    } catch (error) {
        console.error('Erro ao autenticar o usuario: ', error);
    }
}

const authenticateUser = async (username, password) => {
    const response = await fetch(loginUrl, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    
    
    return await data.json();
}

form.addEventListener('submit', authenticateLogin);