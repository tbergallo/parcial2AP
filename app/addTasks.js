const now = new Date();
const formattedDate = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

export function addTaskModal(){
    const addCardBtn = document.getElementById("add-task");
    addCardBtn.addEventListener('click', ()=>{
        const modalElement = document.getElementById("taskDetailsModal"); // Get the modal element itself
        const modal = new bootstrap.Modal(modalElement);
        const modalBody = document.querySelector("#taskDetailsModal .modal-body");
    
        modalBody.innerHTML = `
            <input type="text" id="taskTitle" name="taskTitle" placeholder="title" required>
            <p id="modal-date">${formattedDate} ${formattedTime}</p>
            <input type="text" id="taskdetails" name="taskdetails" placeholder="details" required>
        `;
        
        const editButton = document.getElementById("edit-task");
        const doneButton = document.getElementById("mark-completed");
    
        editButton.style.display = 'none'; // Hide the edit button
        doneButton.textContent = 'Add';
    
         // Create modal instance
        modal.show()
        doneButton.addEventListener('click', ()=> {
            addTask().then(() => {
                modal.hide();
                location.reload() // Call hide() inside the .then() after addTask completes
              });      
        })
    
    })

}

function addTask(){
    const title = document.querySelector('#taskTitle').value;
    const details = document.querySelector('#taskdetails').value
    if (!title || !details) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const newTask = {
        title: title,
        date: now,
        status: 'active', // Make sure you include status
        details: details
    };

    let urlTasks = 'https://67100c9ea85f4164ef2ce87c.mockapi.io/taskCards';

    const opciones = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    }

    return fetch(urlTasks, opciones)
    .then(response => {
        if (response.status === 201) {
            console.log('task editada con éxito');
            return response.json();
        } else {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}, message: ${response.text()}`);
        }
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
}
