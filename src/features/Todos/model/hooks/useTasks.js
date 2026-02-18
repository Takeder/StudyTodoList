import { useState, useEffect } from 'react';
import { getTodos } from '../api/getTodos';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getTodos();
      setTasks(result);
      setIsLoading(false);
    })();
  }, []);
  return {
    tasks,
    isLoading,
    setTasks,
  };
};
