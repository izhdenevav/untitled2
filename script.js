let counterDone = 0;
let counterNotDone = 0;
let counterAll = 0;

let idOfFilter;

let collectionDone = [];
let collectionNotDone = [];
let collectionAll = [];

function deleteTask(id1, id2) {
    let li = document.getElementById(id1);
    let checkbx = document.getElementById(id2);
    if (checkbx.checked) {
        const $done = document.querySelector('#done');
        counterDone = counterDone - 1;
        $done.textContent = "Сделано (" + counterDone.toString() + ")";
        for (let i = 0; i < collectionDone.length; i++) {
            if (collectionDone[i] === id1) {
                collectionDone.splice(i, 1);
            }
        }
    } else {
        const $ntdone = document.querySelector('#ntdone');
        counterNotDone = counterNotDone - 1;
        $ntdone.textContent = "Не сделано (" + counterNotDone.toString() + ")";
        for (let i = 0; i < collectionNotDone.length; i++) {
            if (collectionNotDone[i] === id1) {
                collectionNotDone.splice(i, 1);
            }
        }
    }
    const $all = document.querySelector('#all');
    counterAll = counterAll - 1;
    $all.textContent = "Все (" + counterAll.toString() + ")";
    for (let i = 0; i < collectionAll.length; i++) {
        if (collectionAll[i] === id1) {
            collectionAll.splice(i, 1);
        }
    }
    li.remove();
}

function createTask() {
    let text = document.getElementById("inputTask").value;
    const $text = document.createElement('span');
    $text.innerText = text;
    const $newLi = document.createElement('li');
    const $newInpt = document.createElement('input');
    const $newBtn = document.createElement('button');
    const $tasks = document.querySelector('#tasks');
    $newLi.id = Math.random().toString(36).substring(2);
    $newInpt.id = Math.random().toString(36).substring(2);
    collectionAll.push($newLi.id);
    collectionNotDone.push($newLi.id);
    $tasks.appendChild($newLi);
    $newInpt.type = 'checkbox';
    $newInpt.onclick = () => getCheckedTasks($newLi.id);
    $newBtn.textContent = '✖';
    $newBtn.onclick = () => deleteTask($newLi.id, $newInpt.id);
    $newBtn.className = 'xButton';
    $newLi.appendChild($newInpt);
    $newLi.appendChild($text);
    $newLi.appendChild($newBtn);
    const inputTask = document.getElementById('inputTask');
    inputTask.value = "";
    const $notDone = document.querySelector('#ntdone');
    const $all = document.querySelector('#all');
    counterNotDone += 1;     counterAll += 1;
    $notDone.textContent = "Не сделано (" + counterNotDone.toString() + ")";
    $all.textContent = "Все (" + counterAll.toString() + ")";
}

function getCheckedTasks(id) {
    counterDone += 1; counterNotDone = counterNotDone - 1;
    collectionDone.push(id);
    for (let i = 0; i < collectionNotDone.length; i++) {
        if (collectionNotDone[i] === id) {
            collectionNotDone.splice(i, 1);
        }
    }
    if (idOfFilter === "ntdone") {
        hideAll();
        showCollection(collectionNotDone);
    }
    const $done = document.querySelector('#done');
    const $notDone = document.querySelector('#ntdone');
    $done.textContent = "Сделано (" + counterDone.toString() + ")";
    $notDone.textContent = "Не сделано (" + counterNotDone.toString() + ")";
    const $li = document.getElementById(id);
    $li.className = 'checkedTask';
}

function showAll() {
    for (let i = 0; i < collectionAll.length; i++)
    {
        const li = document.getElementById(collectionAll[i]);
        li.style.display = "flex";
    }
}

function showCollection(collection) {
    for (let i = 0; i < collection.length; i++) {
        const li = document.getElementById(collection[i]);
        li.style.display = "flex";
    }
}

function hideAll() {
    for (let i = 0; i < collectionAll.length; i++)
    {
        const li = document.getElementById(collectionAll[i]);
        li.style.display = "none";
    }
}

function render(clicked_id) {
    const clickedBtn = document.getElementById(clicked_id);
    idOfFilter = clicked_id;
    clickedBtn.className = 'clickedBtn';
    switch (clicked_id) {
        case ("ntdone"):
            document.querySelector('#done').className = 'notClickedButton';
            document.querySelector('#all').className = 'notClickedButton';
/*            for (let i = 0; i < collectionNotDone.length; i++) {
                alert(document.getElementById(collectionNotDone[i]).innerText);
            }*/
            hideAll();
            showCollection(collectionNotDone);
            break;

        case ("done"):
            document.querySelector('#ntdone').className = 'notClickedButton';
            document.querySelector('#all').className = 'notClickedButton';
            hideAll();
            showCollection(collectionDone);
            break;

        case ("all"):
            document.querySelector('#done').className = 'notClickedButton';
            document.querySelector('#ntdone').className = 'notClickedButton';
            showAll();
            break;
    }
}

