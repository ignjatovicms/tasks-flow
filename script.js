
const inputTask = document.getElementById("input-task");
const addTask = document.querySelector(".add-task");
const taskContainer = document.querySelector("#task-container"); 
const storedInput = JSON.parse(localStorage.getItem("textinput"));

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createTask(task, index)
{
  let taskElement = document.createElement("div"); // box on the screen
  taskElement.classList.add("task");

  let li = document.createElement("li");  
  li.innerText = task.text; //Show task in Task text

  taskElement.appendChild(li);

  let checkBtn = document.createElement("button");
  checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  checkBtn.classList.add("checkTask")
  taskElement.appendChild(checkBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteBtn.classList.add("deleteTask")
  taskElement.appendChild(deleteBtn); 

  taskContainer.appendChild(taskElement); 

  checkBtn.addEventListener("click", function()
  {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskElement.classList.toggle("checked");

    updateProgressBar();
  });

  deleteBtn.addEventListener("click", function()
  {
    tasks.splice(index, 1); // removes the task at the given index from the array
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    setTimeout(() => {
      taskElement.remove();
      updateProgressBar();
    }, 400)
  });

  if (task.done) 
  { // If task is marked as done, add "checked" CSS class
    taskElement.classList.add("checked");
  }
}

addTask.addEventListener("click", function()
{
  if (inputTask.value.trim() === "") // prevent empty or whitespace-only input
  {
    inputTask.style.border = "1px solid #FF3B30";
    alert("Please enter a task...");
    return; 
  } 
  else 
  {
    inputTask.style.border = "";
  }

  let newTask = { text: inputTask.value, done:false };

  tasks.push(newTask); //Add tasks as object in tasks array
  localStorage.setItem("tasks", JSON.stringify(tasks)); //Saves array in Local Storage

  createTask(newTask, tasks.length-1);

  inputTask.value = "";
});

function updateMotivationMessage(progress) 
{
  const messageEl = document.getElementById('motivationMessage');

  let message = "";
  let color = "#6b7280";

  if (progress === 100) {
    message = "All tasks completed! Great job 🎉";
    color = "#22c55e";
  } else if (progress >= 70) {
    message = "Almost there, keep going 💪";
  } else if (progress >= 40) {
    message = "Making good progress 👍";
  } else if (progress > 0) {
    message = "You’ve got this, keep pushing 🚀";
  } else {
    message = "Start small, stay consistent ✨";
  }

  messageEl.innerText = message;
  messageEl.style.color = color;
}


function updateProgressBar() 
{
  const allTasks = document.querySelectorAll('.task');
  const completedTasks = document.querySelectorAll('.task.checked');

  const total = allTasks.length;
  const done = completedTasks.length;

  let progress = 0;

  if (total > 0) 
  {
    progress = (done / total) * 100;
  }

  // update bar
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = progress + "%";

  // update text
  const progressText = document.getElementById('progressText');
  if (progressText) {
    progressText.innerText = Math.round(progress) + "% completed";
  }
  //  connect with motivation
  updateMotivationMessage(Math.round(progress));
}

inputTask.addEventListener("focus", () => {
  inputTask.style.border = "";
});


inputTask.addEventListener("input", () => {
  if (inputTask.value !== "") 
  {
      inputTask.style.border = "";
  }
});


tasks.forEach((element , index)  => {
  createTask(element , index);
}); // loop through tasks and render each one to the DOM