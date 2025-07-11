const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const form = document.getElementById('form');
const loginUrl = "http://localhost:8080/todo/auth/login";


const authenticateLogin = async (event) => {
    event.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    try {
        const response = await authenticateUser(username, password);
        console.log('response: ',response);
    } catch (error) {
        console.error('Erro ao autenticar o usuario: ', error);
    }
}

const authenticateUser = async (username, password) => {
    const data = await fetch(loginUrl, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    
    const response = await data.json();
    return response.token;
}

form.addEventListener('submit', authenticateLogin);