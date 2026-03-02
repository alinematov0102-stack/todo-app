function getTasks() {
  const data = localStorage.getItem("todoTasks");
  return data ? JSON.parse(data) : [];
}
function saveTasks(tasks) {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
function render() {
  const tasks = getTasks();
  const todos = tasks.filter((t) => !t.done);
  const dones = tasks.filter((t) => t.done);

  document.getElementById("todoCount").textContent = todos.length;
  document.getElementById("doneCount").textContent = dones.length;

  const todoSection = document.getElementById("todoSection");
  const doneSection = document.getElementById("doneSection");
  todoSection.classList.toggle("hidden", todos.length === 0);
  doneSection.classList.toggle("hidden", dones.length === 0);

  document.getElementById("todoList").innerHTML = todos
    .map(
      (t) => `
     <div data-id="${t.id}" class="bg-gray-800 rounded-xl px-5 py-4 flex items-center justify-between border border-transparent hover:border-purple-500/20 transition-colors duration-200">
                    <span class="text-white/80 text-sm flex-1 mr-3">${escapeHtml(t.text)}</span>
                    <div class="flex items-center gap-3">
                        <button onclick="completeTask('${t.id}')" class="cursor-pointer text-white/40 hover:text-emerald-400 hover:scale-110 transition-all duration-150" title="Bajarildi">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button onclick="editTask('${t.id}')" class="cursor-pointer text-white/40 hover:text-yellow-400 hover:scale-110 transition-all duration-150" title="Tahrirlash">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button onclick="deleteTask('${t.id}')" class="cursor-pointer text-white/40 hover:text-red-400 hover:scale-110 transition-all duration-150" title="O'chirish">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
    `,
    )
    .join("");

  document.getElementById("doneList").innerHTML = dones
    .map(
      (t) => `
     <div class="bg-gray-900 rounded-xl px-5 py-4 flex items-center justify-between border border-transparent hover:border-purple-500/20 transition-colors duration-200">
            <p class="text-green-700 line-through">${escapeHtml(t.text)}</p>
            <div class="flex items-center gap-4">
            <button onclick="undoTask('${t.id})" class="cursor-pointer text-green-700  hover:text-green-900 hover:scale-110 transition-all duration-150 " title="Qaytarish">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" width="24" height="24" viewBox="0 0 16 16"><path fill="#00892e" fill-rule="evenodd" d="M7.32.029a8 8 0 0 1 7.18 3.307V1.75a.75.75 0 0 1 1.5 0V6h-4.25a.75.75 0 0 1 0-1.5h1.727A6.5 6.5 0 0 0 1.694 6.424A.75.75 0 1 1 .239 6.06A8 8 0 0 1 7.319.03Zm-3.4 14.852A8 8 0 0 0 15.76 9.94a.75.75 0 0 0-1.455-.364A6.5 6.5 0 0 1 2.523 11.5H4.25a.75.75 0 0 0 0-1.5H0v4.25a.75.75 0 0 0 1.5 0v-1.586a8 8 0 0 0 2.42 2.217" clip-rule="evenodd"/></svg>
            </button>
            <button onclick="deleteTask('${t.id})" class="cursor-pointer text-white/40 hover:text-red-400 hover:scale-110 transition-all duration-150" title="O'chirish">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            </div>
      </div>
    `,
    )
    .join("");
}
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;
  const tasks = getTasks();
  tasks.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    text,
    done: false,
    createdAt: Date.now(),
  });
  saveTasks(tasks);
  input.value = "";
  render();
  input.focus();
}
// function editTask (id){
//     const tasks = getTasks()
//     const task = tasks.find((t) => t.id === id)
//     if(!task) return

//     const container = document.querySelector(`[data-id="${id}"]`)
//     if(!container) return

//     const span = container.querySelector("span")
//     const btns = container.querySelector(".flex.items-center")

//     const input = document.createElement("input")
//     input.type = "text"
//     input.value = task.text
//     input.className =
//     "flex-1 mr-3 bg-gray-700 border border-purple-500/40 rounded-lg px-3 py-1.5 text-white text-sm outline"
//     span.replaceWith(input)
// }
function completeTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = true;
    task.completedAt = Date.now();
  }
  saveTasks(tasks);
  render();
}

function undoTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = false;
    delete task.completedAt;
  }
  saveTasks(tasks);
  render();
}

function deleteTask(id) {
  console.log("Ishladi");

  saveTasks(getTasks().filter((t) => t.id != id));
  render();
}
render();
document.getElementById("taskInput").focus();
