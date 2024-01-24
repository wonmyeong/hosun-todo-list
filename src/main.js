//인풋창 입력 값을 가져온다
//버튼을 누르면 값을 리스트에 추가한다.

let userInput = document.getElementById("user-input");
let addButton = document.getElementById("todo__addButton");
let todoList = document.getElementById("todo-list");
let todoStatus = document.querySelectorAll("#todo_status div>a");
let underLine = document.getElementById("under-line");

let allList = [];
let filterList = [];
let mode = "all";
let list = [];

addButton.addEventListener("click", addTask);
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let task = {
    id: newID(),
    taskContent: `${userInput.value}`,
    isCompleted: false,
  };

  allList.push(task);
  render();
}

//todo-all이 클릭되면 mode는 all allList가 랜더링
//todo__ongoing or todo__done이 클릭되면 모드는 filter filterList가 랜더링
//map함수가 안되는 이유

// mode에 따라 다르다. all이면 allList 랜더링
// ongoing or done 이면 iscomplete에 따라서 구분

function render() {
  let listContext = "";

  if (mode === "all") {
    list = allList;
  } //allList는 적용상태 모드는 ongoing
  //문제는 처음 ongoing 탭을 눌렀을 때 filterList 인자들이 변경되지 않았다.
  else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted) {
      listContext += `<div class="todo-task">
        <div id="task-content">${list[i].taskContent}</div>
        <div id= "todo-task__button">
            <button id =${list[i].id} onClick="toggleTask(event)"><i class="fa-regular fa-circle-check fa-2x"></i></button>
            <button id =${list[i].id} onClick="deleteTask(event)" ><i class="fa-regular fa-circle-xmark fa-2x"></i></button>
        </div>
    </div>`;
    } else {
      listContext += `<div class="todo-task">
        <div>${list[i].taskContent}</div>
        <div id= "todo-task__button">
        <button id =${list[i].id} onClick="toggleTask(event)"><i class="fa-regular fa-circle-check fa-2x"></i></button>
        <button id =${list[i].id} onClick="deleteTask(event)" ><i class="fa-regular fa-circle-xmark fa-2x"></i></button>
        </div>
    </div>`;
    }
  }
  todoList.innerHTML = listContext;
}
//다른 탭 이벤트를 클릑한 후 돌아와야 todo가 지워졌다.
//현재 코드는 allList에서 todo 값을 지운다.

function toggleTask(event) {
  let taskSelected = event.target.id;
  console.log(taskSelected);
  for (let i = 0; i < allList.length; i++) {
    if (taskSelected == allList[i].id) {
      allList[i].isCompleted = !allList[i].isCompleted;
      break;
    }
  }

  render();
}

for (let i = 0; i < todoStatus.length; i++) {
  todoStatus[i].addEventListener("click", function (event) {
    filter(event.target.id);
    todoUnderline(event);
  });
}

function todoUnderline(event) {
  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
  underLine.style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
}

//delete 키를 누르면 바로 allList에 적용된다
function deleteTask(event) {
  _id = event.target.id;
  for (let i = 0; i < allList.length; i++) {
    if (allList[i].id == _id) {
      const idx = allList.indexOf(allList[i]);
      allList.splice(idx, 1);
    }
  }

  filter(mode);
}

function filter(_mode) {
  mode = _mode;
  filterList = [];
  if (mode === "all") {
    //전체를 보여준다
    render();
  } else if (mode === "ongoing") {
    //진행 중인 task
    //iscomplete =false
    for (let i = 0; i < allList.length; i++) {
      if (allList[i].isCompleted == false) {
        filterList.push(allList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    //끝난 task
    //iscomplete = true
    for (let i = 0; i < allList.length; i++) {
      if (allList[i].isCompleted == true) {
        filterList.push(allList[i]);
      }
    }
    render();
  }
}

function newID() {
  return Math.random().toString(36).substr(2, 16);
}
