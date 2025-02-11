"use strict";

//nessas linhas o botão de add, o input e a tabela são salvos em variáveis através do id e do selector
const btnAddTask = document.getElementById('add-task');
const taskNew = document.getElementById('task-text');
const tableBody = document.querySelector('table tbody');
let editingRow = null;


//função para adicionar tarefas
function addTask() {
    //variável que armazena o valor do input
    let taskText = taskNew.value;

    //verifica se o input está vazio, se não estiver entra no elsa para fazer as ações
    if (!taskText) {
        alert('Please, write a new task to save.')
    }
    else {
        if (editingRow) {
            const taskCell = editingRow.querySelector('.task-column');
            taskCell.innerText = taskText
            btnAddTask.textContent = 'Add'; // Volta o botão para "Add Task"
            editingRow = null;
        } else {
            //cria uma nova linha 'tr' e salva no newRow
            let newRow = document.createElement("tr");

            //cria uma nova linha 'td' e salva no newDone
            //nas linhas abaixo adiciona ao newDone a classe e o html que deve ser criado
            let newDone = document.createElement("td");
            newDone.classList.add('checkbox-column');
            newDone.innerHTML = '<input type="checkbox">';

            //cria uma nova linha 'td' e salva no newTask
            //nas linhas abaixo adiciona ao newTask a classe e joga o valor do input
            let newTask = document.createElement("td");
            newTask.classList.add('task-column');
            newTask.innerHTML = taskText;

            //cria uma nova linha 'td' e salva no newActions
            //nas linhas abaixo adiciona ao newActions a classe e cria os botões
            let newActions = document.createElement("td");
            newActions.classList.add('action-column');
            newActions.innerHTML = ' <button class="edit-task">Edit</button><button class="delete-task">Delete</button>';

            //aqui dentro da newRow são adicionados os elementos que criamos
            newRow.appendChild(newDone);
            newRow.appendChild(newTask);
            newRow.appendChild(newActions);

            //após serem todos vinculados ao newRow eles são adicionados a tabela
            tableBody.appendChild(newRow);
        }
        taskNew.value = ''; 
    }
}

function editTask(event) {
    if (event.target.classList.contains('edit-task')) {
        const row = event.target.closest('tr');
        const taskCell = row.querySelector('.task-column');
        const currentText = taskCell.innerText;

        taskNew.value = currentText;
        btnAddTask.textContent = 'Save';
        editingRow = row;
    }
}

function deleteTask(event) {
    if (event.target.classList.contains('delete-task')) {
        const row = event.target.closest('tr');
        row.remove();
    }
}


//chamada dos botões
btnAddTask.addEventListener('click', addTask);
tableBody.addEventListener('click', (event => {
    editTask(event);
    deleteTask(event);
}))