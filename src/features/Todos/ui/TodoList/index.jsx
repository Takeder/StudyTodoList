import cn from 'classnames';
import style from './style.module.css';

export const TodoList = ({
  items,
  changeStatus,
  editTaskValue,
  editTaskHandler,
  clickEditHandler,
  deleteTask,
  editTaskId,
}) => {
  return (
    <ul className={style.taskList}>
      {items.map((item) => {
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
                onChange={editTaskHandler}
                type="text"
              />
            ) : (
              <label htmlFor={`note${item.id}`}>{item.title}</label>
            )}
            <span className={style.actionsContainer}>
              <button
                className="edit-btn"
                onClick={() => clickEditHandler(item.id)}
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  deleteTask(item.id);
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
  );
};
