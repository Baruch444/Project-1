const addTask = () => {
    const validation = validate();
    if (!validation) return false;

    const newTask = getTask();

    const taskList = getTaskFromStorage();

    taskList.push(newTask);

    saveTaskToStorage(taskList);

    displayTask(taskList);

    clearForm();

    const addedNote = document.querySelector("#sectionBox .notes:last-child");
    addedNote.classList.add("fade-in");
};

const validate = () => {
    const textBox = document.getElementById("textBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const textErr = document.getElementById("textErr");
    const dateErr = document.getElementById("dateErr");
    const timeErr = document.getElementById("timeErr");
    const text = textBox.value;
    const date = dateBox.value;
    const time = timeBox.value;
    textBox.style.borderColor, (textBox.style.border = "");
    dateBox.style.borderColor = "";
    timeBox.style.borderColor = "";
    textErr.innerText = "";
    timeErr.innerText = "";
    dateErr.innerText = "";
    if (text === "") {
        textErr.innerText = "Missing Task!";
        textBox.style.border = "3px solid red";
        window.event.preventDefault();
        return false;
    }
    if (date === "") {
        dateErr.innerText = "Missing Date!!!";
        dateBox.style.border = "2px solid red";
        window.event.preventDefault();
        return false;
    }
    if (time === "") {
        timeErr.innerText = "Missing Time!!!";
        timeBox.style.border = "2px solid red";
        window.event.preventDefault();
        return false;
    }
    return true;
};

const getTask = () => {
    const textBox = document.getElementById("textBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const text = textBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    const newTask = {
        text,
        date,
        time,
    };
    return newTask;
};

const getTaskFromStorage = () => {
    const taskStr = localStorage.getItem("tasks");
    const tasks = taskStr === null ? [] : JSON.parse(taskStr);
    return tasks;
};

const saveTaskToStorage = (arr) => {
    const str = JSON.stringify(arr);
    localStorage.setItem("tasks", str);
};

const displayTask = (taskList) => {
    const sectionBox = document.getElementById("sectionBox");
    sectionBox.innerHTML = "";
    let index = 0;
    for (const newTask of taskList) {
        const note = document.createElement("div");
        note.classList.add("notes");
        const trash = `<div class="trash">
            <i class="fa-solid fa-trash-can" onclick="deleteTask(${index})"></i>
            </div>`;
        if (index === taskList.length - 1) note.style.opacity = 1;

        note.innerHTML += trash;
        const textNote = document.createElement("p");
        textNote.textContent = newTask.text;
        const textDate = document.createElement("span");
        textDate.textContent = newTask.date;
        const lineBreak = document.createElement("br");
        const textTime = document.createElement("span");
        textTime.textContent = newTask.time;
        note.appendChild(textNote);
        note.appendChild(textDate);
        note.appendChild(lineBreak);
        note.appendChild(textTime);
        sectionBox.appendChild(note);

        index++;
    }
};

const clearForm = () => {
    document.getElementById("textBox").value = "";
    document.getElementById("dateBox").value = "";
    document.getElementById("timeBox").value = "";
    document.getElementById("textBox").focus();
};

const loadTasks = () => {
    const tasks = getTaskFromStorage();
    displayTask(tasks);
};

loadTasks();

const deleteTask = (index) => {
    const taskList = getTaskFromStorage();
    taskList.splice(index, 1);
    saveTaskToStorage(taskList);
    displayTask(taskList);
};
