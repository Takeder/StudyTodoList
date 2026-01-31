import React from "react";
import { useState } from "react";
// const tasks = [
//     {
//         id: Date.now(),
//         name: 'name',
//     }
// ]
export default () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([])

    const addTask = () => {
        setTasks((prevTasks) => {
            return [...prevTasks, { id: Date.now(), title: task, status: false }]
        })
    }

    const deleTask = () => {
      // удаление таски - [...].filter()
    }

    const changeStatus = (taskId) => {
        // Находишь таску по айдишнику
        const findTask = tasks.find((item) => item.id === taskId)
        // Меняешь status
        // Возвращаешь новое сотоянийе
        setTasks((prevState) => {
            const newTask = { ...findTask, status: !findTask.status }
            return [...prevState, newTask]
       })
    }

    console.log('tasks', tasks);
    console.log('task', task)

    
    return (
        <>
            <input value={task} onChange={(event) => setTask(event.target.value)} />
            <button onClick={addTask}> Add task </button>
            <ul>
                {tasks.map((todo) => <li key={todo.id} >{todo.title}</li>)}
            </ul>
        </>
    )
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