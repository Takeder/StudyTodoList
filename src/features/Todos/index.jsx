import { useEffect, useState } from 'react';

import { TodoList } from './ui/TodoList';

import Modal from './ui/Modal';

import { getTodos } from './model';

import style from './style.module.css';
import { useTheme } from '../../app/themProvider';

import { changeFilter, searchTodos } from './lib';
import { useTasks } from './model/hooks/useTasks';

function Todos() {
  const [search, setSearch] = useState('');

  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const { theme, toggleTheme } = useTheme();

  const { tasks, isLoading, setTasks } = useTasks();

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
      const taskToEdit = tasks.find((t) => t.id === id);
      setEditTaskId(id);
      setEditTaskValue(taskToEdit.title); // Подставляем текст, чтобы не было пусто
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

  const editTaskHandler = (e) => {
    setEditTaskValue(e.target.value);
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
        <button className={style.modeToggle} onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <TodoList
          items={tasksData}
          changeStatus={changeStatus}
          editTaskValue={editTaskValue}
          editTaskHandler={editTaskHandler}
          clickEditHandler={editHandler}
          deleteTask={deleTask}
          editTaskId={editTaskId}
        />
      )}

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
