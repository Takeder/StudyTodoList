const MOCK_TODOS = [
  {
    id: 1,
    title: 'Node 1',
    status: false,
  },
  {
    id: 2,
    title: 'Node 2',
    status: false,
  },
  {
    id: 3,
    title: 'Node 3',
    status: false,
  },
  {
    id: 4,
    title: 'Node 4',
    status: false,
  },
];

export const getTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TODOS);
    }, 1000);
  });
};
