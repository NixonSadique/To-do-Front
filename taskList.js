const baseListUrl = "http://localhost:8080/todo/list";
const baseTaskUrl = "http://localhost:8080/todo/task"

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

const createList = async (userId, title, description) => {
    const response = await fetch(baseListUrl + "/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            userId: userId,
            title: title,
            description: description
        })

    });

    return await response.text();
}

const createTask = async (listId, message, priority) => {
    const response = await fetch(baseTaskUrl + "/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            listId: '',
            message: message,
            priority: priority
        })

    });

    return await response.text();
}

const getUserLists = async () => {
    const response = await fetch(baseListUrl + userId, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    return await response.json();   
}

const getTasksInList = async (listId) => {
    const response = await fetch(baseTaskUrl + listId, {
        method: 'GET',
        headers: {'Authorization' : 'Bearear' + token}
    }) 
}

document.getElementById('showContainer1').onclick = () => {

    if (!document.getElementById('taskContainer').classList.contains('hidden')) {
        document.getElementById('taskContainer').classList.add('hidden')
    }
    document.getElementById('listContainer').classList.remove('hidden')
    
}

document.getElementById('showContainer2').onclick = () => {
    
    if (!document.getElementById('listContainer').classList.contains('hidden')) {
        document.getElementById('listContainer').classList.add('hidden')
    } 
    document.getElementById('taskContainer').classList.remove('hidden')
    
    //organize these 'experiments'
}