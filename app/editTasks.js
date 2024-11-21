export function cambiarModal(card) {
    const modalElement = document.getElementById("taskDetailsModal");
    const modal = new bootstrap.Modal(modalElement); // Crear la instancia del modal

    const modalBody = modalElement.querySelector(".modal-body");
    modalBody.innerHTML = `
        <input type="text" id="taskTitle" name="taskTitle" value="${card.title}" required>
        <p id="modal-date">${card.date}</p>
        <input type="text" id="taskdetails" name="taskdetails" value="${card.details}" required>
        <button type="button" class="btn btn-primary" id="edit-done">Done</button>
    `;

    // Cambiar el comportamiento del botón 'Done' según sea necesario
    const doneButton = document.getElementById("edit-done");
    if (doneButton) {
        doneButton.addEventListener('click', () => {
            // Obtener los nuevos valores del formulario
            const updatedTitle = document.getElementById("taskTitle").value;
            const updatedDetails = document.getElementById("taskdetails").value;

            // Actualizar el objeto 'task' con los nuevos valores
            card.title = updatedTitle;
            card.details = updatedDetails;

            // Llamar a la función para guardar los cambios
            pushEdits(card).then(() => {
                modal.hide(); // Ocultar el modal
                location.reload(); // Recargar la página después de guardar
            }).catch(error => {
                console.error("Error al guardar los cambios:", error);
            });
        });
    }

    modal.show(); // Mostrar el modal
}



export function pushEdits(task){
    console.log("Task to edit:", task); // Log the entire task object
    let title;
    try {
        title = document.querySelector('#taskTitle').value;
    } catch (er) {
        title = task.title;
    }

    if (!title && title != task.title) {
        alert("Por favor, complete el campo.");
        return;
    }

    const updatedTask = {
        title: title,
        date: task.date,
        status: task.status, // Make sure you include status
        id: task.id,
    };

    let urlTasks = 'https://67100c9ea85f4164ef2ce87c.mockapi.io/taskCards';
    const urlTaskEdit = `${urlTasks}/${task.id}`;
    console.log("URL for PUT request:", urlTaskEdit); // Log the URL

    const opciones = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    }

    console.log(urlTaskEdit)
    return fetch(urlTaskEdit, opciones)
    .then(response => {
        if (response.status === 200) {
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
