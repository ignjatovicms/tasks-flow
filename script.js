
const inputTask = document.getElementById("input-task");
const addTask = document.querySelector(".add-task");
const taskContainer = document.querySelector("#task-container"); 

addTask.addEventListener("click", function()
{
if (inputTask.value.trim() === "") // prevent empty or whitespace-only input
    {
    inputTask.style.border = "1px solid #FF3B30";
    alert("Please enter a task...");
    return; 
    } 
else {
        inputTask.style.border = "";
     }

let task = document.createElement("div"); //task container
task.classList.add("task");

let li = document.createElement("li"); // task text 
li.innerText = inputTask.value;
task.appendChild(li);

let checkBtn = document.createElement("button");
checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
checkBtn.classList.add("checkTask")
task.appendChild(checkBtn);

let deleteBtn = document.createElement("button");
deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
deleteBtn.classList.add("deleteTask")
task.appendChild(deleteBtn); 

taskContainer.appendChild(task);
inputTask.value = "";

checkBtn.addEventListener("click", function(){
    task.classList.toggle("checked");
    updateProgressBar();
});


deleteBtn.addEventListener("click", function(e){
    let target = e.currentTarget.parentElement;
    target.classList.add("removing");
  
    setTimeout(() => {
      task.remove();
      updateProgressBar();
    }, 400)
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
});
