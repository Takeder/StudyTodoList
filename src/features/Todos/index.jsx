import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cn from 'classnames';

import { Modal } from '../../shared/ui/modal/modal';

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
const modalRoot = document.getElementById('root');

function Todos() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getTodos();
      setTasks(result);
      setIsLoading(false);
    })();
  }, []);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), title: task, status: false }]);
    setTask('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
      setIsOpen(false);
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

  return (
    <div className={style.todoApp}>
      <h1 className={style.title}>TODO LIST</h1>
      <div className={style.searchContainer}>
        <input
          type="text"
          name="search-task"
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
                <label htmlFor={`note${item.id}`}>{item.title}</label>
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
          })
        )}
      </ul>
      <button onClick={() => setIsOpen(!isOpen)} className={style.addButton}>
        +
      </button>
      {createPortal(
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <>
            <h2 className={style.modalTitle}>New Note</h2>
            <input
              name="add-task"
              type="text"
              autoFocus
              className={style.addTaskInput}
              onKeyDown={handleKeyDown}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Добавить задачу"
            />
            <div className={style.modalActions}>
              <button
                className={cn(style.btn, style.cancelBtn)}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                disabled={task.length === 0}
                className={cn(style.btn, style.applyBtn)}
                onClick={() => {
                  addTask();
                  setIsOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </>
        </Modal>,
        modalRoot
      )}
    </div>
  );
}

export default Todos;
