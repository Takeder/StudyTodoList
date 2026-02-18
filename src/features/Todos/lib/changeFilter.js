export function changeFilter(filter, tasks) {
  if (filter === 'all') {
    return tasks;
  } else if (filter === 'done') {
    return tasks.filter((item) => item.status);
  } else if (filter === 'active') {
    return tasks.filter((item) => !item.status);
  }
}
