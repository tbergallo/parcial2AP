import { initializeCardModal, loadTasks } from "./showTasks.js";
import { menuEvents } from "./menu.js";
import { addTaskModal } from "./addTasks.js";
import { speechbutton } from "./audioPlayer.js";

menuEvents()
loadTasks() 
document.addEventListener("tasksLoaded", initializeCardModal); 
addTaskModal()
document.addEventListener("tasksLoaded", speechbutton); 

