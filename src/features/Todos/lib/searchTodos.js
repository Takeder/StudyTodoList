export function searchTodos(tasks, search) {
  if (search === '') {
    return tasks;
  }
  return tasks.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
}
