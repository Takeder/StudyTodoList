import { useState } from "react";

import cn from "classnames";

import style from "./style.module.css";

const MOCK_TODOS = [
    {
        id: 1,
        title: "Node 1",
        status: false,
    },
    {
        id: 2,
        title: "Node 2",
        status: false,
    },
    {
        id: 3,
        title: "Node 3",
        status: false,
    },
    {
        id: 4,
        title: "Node 4",
        status: false,
    },
];

function searchTodos(tasks, search) {
    if (search === "") {
        return tasks;
    }
    return tasks.filter((item) =>
        item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
}

function Todos() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState(MOCK_TODOS);
    const [search, setSearch] = useState("");

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

    const tasksData = searchTodos(tasks, search);
    console.log(tasksData);

    return (
        <div className={style.todoApp}>
            <h1 className={style.title}>TODO LIST</h1>
            <div className={style.searchContainer}>
                <input
                    type="text"
                    className={style.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск заметки..."
                />
                <select className={style.filterSelect}>
                    <option value="all">Все</option>
                    <option value="done">Выполненные</option>
                    <option value="active">Невыполненные</option>
                </select>
                <button className={style.modeToggle}>🌙</button>
            </div>
            <ul className={style.taskList}>
                {tasksData.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className={cn(style.taskItem, {
                                //пакет для удобства объединения стилей в одну строку
                                [style.completed]: item.status, //если статус true, то будет добавляться статус completed
                            })}
                        >
                            <input
                                onChange={() => changeStatus(item.id)}
                                type="checkbox"
                                id={`note${item.id}`}
                                checked={item.status}
                            />
                            <label htmlFor={`note${item.id}`}>
                                {item.title}
                            </label>
                            <span className={style.actionsContainer}>
                                <button className="edit-btn">✏️</button>
                                <button
                                    onClick={() => {
                                        deleTask(item.id);
                                    }}
                                    className="delete-btn"
                                >
                                    🗑️
                                </button>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <button className={style.addButton}>+</button>
        </div>
    );
}

export default Todos;
