import { useState } from "react";

import style from "./style.module.css";

function Todos() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), title: task, status: false }]);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changeStatus = (taskId) => {
    const updateTasks = tasks.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    setTasks(updateTasks);
  };

  return (
    <>
      <input
        placeholder="add todo"
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button disabled={task.length === 0} onClick={addTask}>
        Add task
      </button>
      {tasks.length === 0 && <p className={style.empty}>TaskList is empty</p>}
      <ul>
        {tasks.map((todo) => {
          return (
            <li
              key={todo.id}
              className={style.todoItem}
              onClick={() => changeStatus(todo.id)}
            >
              <input type="checkbox" checked={todo.status} />
              <p className={todo.status ? style.done : ""}>{todo.title}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); //отмена всплытия события для кнопки
                  deleTask(todo.id);
                }}
              >
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Todos;
