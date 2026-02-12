import { useContext, useEffect, useState } from 'react';
import Modal from './Modal';

import cn from 'classnames';

import { getTodos } from './model';

import style from './style.module.css';

function searchTodos(tasks, search) {
  if (search === '') {
    return tasks;
  }
  return tasks.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
}

function changeFilter(filter, tasks) {
  if (filter === 'all') {
    return tasks;
  } else if (filter === 'done') {
    return tasks.filter((item) => item.status);
  } else if (filter === 'active') {
    return tasks.filter((item) => !item.status);
  }
}

function Todos() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getTodos();
      setTasks(result);
      setIsLoading(false);
    })();
  }, []);

  const editHandler = (id) => {
    if (editTaskId) {
      const updateTasks = tasks.map((item) => {
        if (item.id === editTaskId) {
          return {
            ...item,
            title: editTaskValue,
          };
        }
        return item;
      });
      setTasks(updateTasks);
      setEditTaskValue('');
      setEditTaskId(null);
    } else {
      setEditTaskId(id);
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

  const changeFilterHandler = (e) => {
    setFilter(e.target.value);
  };

  const tasksData = searchTodos(changeFilter(filter, tasks), search);

  // Функция срабатывает при нажатии APPLY в модальном окне
  const handleAddTask = (text) => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now(), title: text, status: false }]); // Добавляем новую заметку в список
    }
    setIsModalOpen(false); // Закрываем окно
  };

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
        <select className={style.filterSelect} onChange={changeFilterHandler}>
          <option value="all">Все</option>
          <option value="done">Выполненные</option>
          <option value="active">Невыполненные</option>
        </select>
        <button className={style.modeToggle}>🌙</button>
      </div>
      <ul className={style.taskList}>
        {isLoading ? (
          <p>Загрузка..</p>
        ) : (
          tasksData.map((item) => {
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
                {editTaskId === item.id ? (
                  <input
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                    type="text"
                  />
                ) : (
                  <label htmlFor={`note${item.id}`}>{item.title}</label>
                )}
                <span className={style.actionsContainer}>
                  <button
                    className="edit-btn"
                    onClick={() => editHandler(item.id)}
                  >
                    ✏️
                  </button>
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
          })
        )}
      </ul>
      <button className={style.addButton} onClick={() => setIsModalOpen(true)}>
        +
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleAddTask}
      />
    </div>
  );
}

export default Todos;
