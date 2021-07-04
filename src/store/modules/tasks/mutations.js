import { uid } from 'quasar';

export const addTask = (state, payload) => {
  state.tasks = [
    ...state.tasks,
    {
      id: uid(),
      ...payload,
    },
  ];
};

export const deleteGroup = (state, name) => {
  state.tasks = state.tasks
    .filter((task) => (String(task.date) !== name));
};

export const deleteTask = (state, id) => {
  state.tasks = state.tasks
    .filter((task) => (task.id !== id));
};
