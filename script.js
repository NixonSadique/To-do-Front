username = document.getElementById('username');
password = document.getElementById('password');
const form = document.getElementById('form')

const createUser = async () => {

    const createUserURL = 'http://localhost:8080/todo/user/create'

    const response =  await fetch(createUserURL,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            username: username.value, 
            password : password.value
        })
    })

    const data = await response.text();
    return data;
}

const criar = async (event) =>{
    event.preventDefault();
    try {
        user = await createUser();
        console.log(user)
        console.log(user)
        console.log({user})
    } catch (error) {
        
    }
}

form.addEventListener('submit', criar)

