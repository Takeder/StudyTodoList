import cn from 'classnames';
import style from './style.module.css';
import { Button } from '../../../../shared/ui/Button';

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
                autoFocus // Чтобы сразу печатать
                className={style.editInput}
                value={editTaskValue}
                onChange={editTaskHandler}
                onKeyDown={(e) =>
                  e.key === 'Enter' && clickEditHandler(item.id)
                } // Сохранение по Enter
                onBlur={() => clickEditHandler(item.id)} // Сохранение при потере фокуса (опционально)
                type="text"
              />
            ) : (
              <label htmlFor={`note${item.id}`}>{item.title}</label>
            )}
            <span className={style.actionsContainer}>
              <Button variant="ghost" onClick={() => clickEditHandler(item.id)}>
                ✏️
              </Button>
              <Button variant="ghost" onClick={() => deleteTask(item.id)}>
                🗑️
              </Button>
            </span>
          </li>
        );
      })}
    </ul>
  );
};
