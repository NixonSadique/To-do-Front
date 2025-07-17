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

const sendForm = async (event) => {
    event.preventDefault();
    const listtitle = document.getElementById('listTitle');
    const listDescription = document.getElementById('listDescription');
    try {
        const creationResponse = await createList(userId | 1, listtitle.value, listDescription.value);
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
    listForm.addEventListener('submit', sendForm);

}

const addLists = async () => {
    const lists = await getUserLists();

    
    const sidebar = document.getElementById('sidebar');
    sidebar.querySelectorAll('.tarefa').forEach( e => e.remove());
    // let a = null;
    
    
    
    for (let i = 0; i < lists.length; i++) {
        // console.log(`list${i}`,lists[i]);
        let a = document.createElement('a');
        a.textContent = lists[i].title;
        a.href = '#';
        a.style.display = 'block';
        a.classList.add('tarefa')
        a.id = `lista${lists[i].id}`

        sidebar.appendChild(a);
        a.addEventListener('click', (event) =>{
            esconderConteudo();
            generateContent(lists[i])
        });
    }
}

const completeTask = async (id) => {
    const response = await fetch(`${baseTaskUrl}/complete/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    return await response.text();
}


const generateContent = async (taskList) => {
    //extrai dados da lista de tarefas
    const title = taskList.title;
    const id = taskList.id;
    const description = taskList.description;
    const date = taskList.creationDate;

    const tasksInList = await getTasksInList(id);//call to endpoint

    // console.log('tasks in list', await tasksInList)

    //Criar os elementos que surgem da lista de tarefas (ELEMENTOS #1)
    const h1 = document.createElement('h1');
    h1.textContent = title + ' #ID:' + id;

    // const dateParagraph = document.createElement('p');
    // dateParagraph.textContent = creationDate+'';

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;

    //criar a div que vai conter todos os outros elementos e adicionar ELEMENTOS#1
    const div = document.createElement('div');
    div.id = 'checkboxContainer';
    div.appendChild(h1);
    // div.appendChild(dateParagraph);
    div.appendChild(descriptionParagraph);


    // const a = document.createElement('a');
    // a.href = '#';
    // a.id = 'createTask';
    // a.textContent = '+';
    // a.classList.add('hidden');

    const contentBox = document.getElementById("content-box");
    contentBox.appendChild(div);

    console.log('tasksInList', tasksInList.length)
    
    const form = document.createElement('form');
    form.id = 'checkboxForm';

    for (let i = 0; i < tasksInList.length; i++) {
        //alocacao dos dados do objeto de tareda i em variaveis
        let id = tasksInList[i].id;
        const message = tasksInList[i].message;
        const isComplete = tasksInList[i].completed;
        const priority = tasksInList[i].priority;

        console.log('tasks in List'+ id,tasksInList[i])

        //Criacao das tarefas
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task${id}`;
        checkbox.checked = isComplete;

        const task = document.createElement('label');
        task.htmlFor = `task${id}`;

        task.textContent = message + "\nPriority: " + priority;

        //adicionar as tarefas a div

        form.appendChild(checkbox)
        form.appendChild(task)
        div.appendChild(form);

        checkbox.addEventListener('click', (event) =>{
            event.preventDefault();
            completeTask(id)
        });

    }

}


const esconderConteudo =  () => {
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
    if (checkboxContainer != null ) {
        checkboxContainer.remove();
    }
    
}

document.getElementById('createTask').onclick = () => {
    esconderConteudo();
    addLists();
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.classList.remove('hidden')

}