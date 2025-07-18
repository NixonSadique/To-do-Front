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
            listId: listId,
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
        headers: { 'Authorization': 'Bearer' + token }
    })

    return await response.json()
}

const completeTask = async (id) => {
    const response = await fetch(`${baseTaskUrl}/complete/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    return await response.text();
}

const sendListForm = async (event) => {
    event.preventDefault();
    const listtitle = document.getElementById('listTitle');
    const listDescription = document.getElementById('listDescription');
    try {
        console.log('userId', userId)
        const creationResponse = await createList(userId, listtitle.value, listDescription.value);
        alert(creationResponse);
        addLists();
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('showContainer1').onclick = async () => {

    esconderConteudo();
    const listContainer = document.getElementById('listContainer');
    listContainer.classList.remove('hidden');

    const listForm = document.getElementById('listForm');
    listForm.addEventListener('submit', sendListForm);

}

const addLists = async () => {
    const lists = await getUserLists();

    const sidebar = document.getElementById('sidebar');
    sidebar.querySelectorAll('.tarefa').forEach(e => e.remove());

    for (let i = 0; i < lists.length; i++) {
        let a = document.createElement('a');
        a.textContent = lists[i].title + " ID: " + lists[i].id;
        a.href = '#';
        a.style.display = 'block';
        a.classList.add('tarefa')
        a.id = `lista${lists[i].id}`

        sidebar.appendChild(a);
        a.addEventListener('click', (event) => {
            esconderConteudo();
            generateContent(lists[i])
        });
    }
}

const generateContent = async (taskList) => {
    const title = taskList.title;
    const id = taskList.id;
    const description = taskList.description;
    const date = taskList.creationDate;

    const tasksInList = await getTasksInList(id);

    const h1 = document.createElement('h1');
    h1.textContent = title + ' #ID:' + id;

    const dateParagraph = document.createElement('p');
    dateParagraph.textContent = creationDate;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;

    const div = document.createElement('div');
    div.id = 'checkboxContainer';
    div.appendChild(h1);
    div.appendChild(dateParagraph);
    div.appendChild(descriptionParagraph);

    const contentBox = document.getElementById("content-box");
    contentBox.appendChild(div);

    console.log('tasksInList', tasksInList.length)

    const form = document.createElement('form');
    form.id = 'checkboxForm';

    for (let i = 0; i < tasksInList.length; i++) {
        let id = tasksInList[i].id;
        const message = tasksInList[i].message;
        const isComplete = tasksInList[i].completed;
        const priority = tasksInList[i].priority;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task${id}`;
        checkbox.checked = isComplete;
        
        const label = document.createElement('label');
        label.htmlFor = `task${id}`;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(message + "\nPriority: " + priority))
        
        form.appendChild(label);
        div.appendChild(form);

        checkbox.addEventListener('click', (event) => {
            completeTask(id)
        });

    }

}


const esconderConteudo = () => {
    const taskContainer = document.getElementById('taskContainer');
    const isTaskContainerHidden = taskContainer.classList.contains('hidden');
    if (!isTaskContainerHidden) {
        taskContainer.classList.add('hidden');
    }

    const listContainer = document.getElementById('listContainer');
    const isListContainerHidden = listContainer.classList.contains('hidden');
    if (!isListContainerHidden) {
        listContainer.classList.add('hidden')
    }


    const checkboxContainer = document.getElementById('checkboxContainer');
    if (checkboxContainer != null) {
        checkboxContainer.remove();
    }

}


document.getElementById('listarTarefas').onclick = () => {
    esconderConteudo();
    addLists();
    
}

const sendTaskForm = async (event) => {
    event.preventDefault();
    const listId = document.getElementById('listId');
    const taskName = document.getElementById('taskName');
    const priority = document.getElementById('priority');

    try {
        const creationResponse = await createTask(listId.value, taskName.value, priority.value);
        alert(creationResponse);
        addLists();
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('createTask').addEventListener('click', (event) => {
    esconderConteudo();
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.classList.remove('hidden')

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', sendTaskForm)
})