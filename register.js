usernameInput = document.getElementById('username');
passwordInput = document.getElementById('password');
const form = document.getElementById('form')

const createUser = async () => {

    const createUserURL = 'http://localhost:8080/todo/user/create'

    const data =  await fetch(createUserURL,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            username: usernameInput.value, 
            password : passwordInput.value
        })
    });

    const response = await data.text();
    return response;
}

const sendForm = async (event) =>{
    event.preventDefault();
    try {
        const user = await createUser();
        alert(user);
        window.location.href = './login.html';
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', sendForm)

