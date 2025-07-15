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
    const response = await fetch(baseListUrl + "/" + userId, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    return await response.json();   
}

const getTasksInList = async (listId) => {
    const response = await fetch(baseTaskUrl + '/' + listId, {
        method: 'GET',
        headers: {'Authorization' : 'Bearear' + token}
    }) 
}

const sendForm = async(event) => {
    event.preventDefault();
    const listtitle = document.getElementById('listTitle');
    const listDescription = document.getElementById('listDescription');
    try {
        const creationResponse = await createList(userId | 1,listtitle.value, listDescription.value);
        alert(creationResponse);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('showContainer1').onclick = () => {
    const taskContainer = document.getElementById('taskContainer');
    const isTaskContainerHidden = taskContainer.classList.contains('hidden');
    const listContainer = document.getElementById('listContainer');
    
    if (!isTaskContainerHidden) {
        taskContainer.classList.add('hidden');
    }
    
    listContainer.classList.remove('hidden');
    
    const listForm = document.getElementById('listForm');
    listForm.addEventListener('submit', sendForm);
    addLists();
    
}

const addLists = async () =>{
    const lists = await getUserLists();

    console.log(lists[0]);

    const sidebar = document.getElementById('sidebar');
    // let a = null;
    


    for (let i = 0; i < lists.length; i++) {
        let a = document.createElement('a');
        a.textContent = lists[i].title;
        a.href = '#';
        a.style.display = 'block';
        a.id(`lista${lists[i].id}`)
        sidebar.appendChild(a);
        a.addEventListener('click', generateContent(lists[i]));
    }
}


const generateContent = (taskList) => {
    const title = taskList.title;
    const id = taskList.id;
    const description = consttaskList.description;
    const date =taskList.creationDate;



}


document.getElementById('createTask').onclick = () => {
    addLists();
    // const listContainer = document.getElementById('listContainer');
    // const isListContainerHidden = listContainer.classList.contains('hidden');
    // const taskContainer = document.getElementById('taskContainer');

    // if (!isListContainerHidden) {
    //     listContainer.classList.add('hidden')
    // }
    // taskContainer.classList.remove('hidden')

}