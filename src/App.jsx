import React from "react";
import { useState } from "react";
import "./App.css";
import style from "./style.module.css";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.length > 0) {
            setTasks((prevTasks) => {
                return [
                    ...prevTasks,
                    { id: Date.now(), title: task, status: false },
                ];
            });
            setTask("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    const deleTask = (id) => {
        // удаление таски - [...].filter()
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const changeStatus = (taskId) => {
        // Находишь таску по айдишнику
        // console.log(findTask);

        // Меняешь status
        // Возвращаешь новое сотояние
        setTasks((prevState) => {
            const findTask = prevState.find((item) => item.id === taskId);
            return prevState.map((item) => {
                if (item.id === findTask.id) {
                    return {
                        ...item,
                        status: !findTask.status,
                    };
                }
                return item;
            });
        });
    };

    console.log("tasks", tasks);
    console.log("task", task);

    return (
        <>
            <input
                value={task}
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button disabled={task.length === 0} onClick={addTask}>
                Add task
            </button>
            {tasks.length === 0 && (
                <p className={style.empty}>TaskList is empty</p>
            )}
            <ul>
                {tasks.map((todo) => {
                    return (
                        <li
                            key={todo.id}
                            className={style.todoItem}
                            onClick={() => changeStatus(todo.id)}
                        >
                            <p className={todo.status ? style.done : ""}>
                                {todo.title}
                            </p>
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

// Нужно реализовать TaskList с возможность добавления и удаления зачёркнутых тасок.

// Условия:

// -Если инпут пустой, то ничего не происходит

// -Если мы добавили таску, инпут очищается

// -Если список тасок пустой, пользователь должен видеть это на экране ('TaskList is empty')

// -Если список тасок не пустой, то под списком должна появиться кнопка 'Delete selected tasks'

// -При нажатии на таску, она должна быть перечёркнута. Все таски, которые перечёркнуты, должны быть удалены

// при нажатии на кнопку Delete selected tasks.

// -стили для отступов (по желанию) можешь сделать с использованием файла style.css, но стиль для перечёркивания должен быть реализован без использования созданных тобой селекторов. (инлайн стиль)

export default App;
