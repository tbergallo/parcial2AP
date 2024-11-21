import { cambiarModal, pushEdits } from "./editTasks.js";



export function loadTasks(){
    let urlTasks = 'https://67100c9ea85f4164ef2ce87c.mockapi.io/taskCards';
    let tasks = ''
    fetch(urlTasks)
    .then(response => {
        if (response.status === 200) return response.json();
        else throw new Error('No se pudieron obtener las imágenes.');
    })
    .then(data => {
        tasks = data;
        showTaskCard(tasks);
        // Dispatch an event to signal that tasks have been loaded
        const tasksLoadedEvent = new Event('tasksLoaded');
        document.dispatchEvent(tasksLoadedEvent);
    })
    .catch(error => console.log(error), showDefaultTaskCard());
}

function showTaskCard(tasks){
    let bodyActive = document.getElementById('tasks-container-active')
    let bodyCompleted = document.getElementById('tasks-container-completed')
    let activeContent = ""
    let completedContent = ""
    
    tasks.forEach(task => {
        const taskCard = `
            <div class="task-card ${task.status}">
                <div class="task-info" id="task-info">
                    <h3>${task.title}</h3>
                    <p class="task-date">${task.date}</p>
                    <p class="modal-details">${task.details}</p>
                </div>
                <button class="play-audio">▶</button>
                <span class="task-id" style="display:none;">${task.id}</span> </div>
            </div>`;
        
        if (task.status === 'active') {
            activeContent += taskCard;
        } else {
            completedContent += taskCard;
        }
    });
    
    bodyActive.innerHTML = activeContent
    bodyCompleted.innerHTML = completedContent || showDefaultTaskCard('completed');    

}

function showDefaultTaskCard(status){
    return `
        <div class="task-card ${status}">
            <div class="task-info" id="task-info">
                <h3>Diseñar interfaz de usuario</h3>
                <p class="task-date">15 de febrero de 2024, 10:30 AM</p>
                <p class="modal-details">Avanzar con proyecto de parcial</p>
                </div>
                <button class="play-audio">▶</button>
                <span class="task-id" style="display:none;">0</span> </div>
            </div>
        `
}

let originalModalBodyHTML;

export function initializeCardModal() {
    const taskCards = document.querySelectorAll(".task-card");
    const modalBody = document.querySelector("#taskDetailsModal .modal-body");
    const modalElement = document.getElementById("taskDetailsModal"); 

    originalModalBodyHTML = modalBody.innerHTML;

    taskCards.forEach((card) => {
        card.addEventListener("click", () => {
            const modal = new bootstrap.Modal(modalElement);
            const task = {
                id: card.querySelector(".task-id").textContent,
                title: card.querySelector("h3").textContent,
                date: card.querySelector(".task-date").textContent,
                details: card.querySelector(".modal-details").textContent
            }
            
            document.getElementById("modal-title").textContent = task.title
            document.getElementById("modal-date").textContent = task.date
            document.getElementById("modal-details").textContent = task.details
            modal.show();

            const editButton = document.getElementById("edit-task")
            const doneButton = document.getElementById("mark-completed")

            if (editButton) {
                editButton.addEventListener('click', () => {
                    cambiarModal(task)
                    editButton.style.display = 'none'
                    doneButton.style.display = 'none'
                    editButton.addEventListener('click', () => {
                        pushEdits(task).then(() => {
                            location.reload() 
                          })
                    })
                        
                });
            }

            if (doneButton){
                doneButton.addEventListener('click', ()=> {
                    task.status = 'completed'
                    pushEdits(task).then(() => {
                        modal.hide();
                        location.reload()
                      });   
                })
            }
        });
    });

    modalElement.addEventListener('hidden.bs.modal', () => {
        modalBody.innerHTML = originalModalBodyHTML;
    });
}