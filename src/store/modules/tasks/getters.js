/* eslint-disable no-shadow */

import { groupBy } from 'lodash';

const getTodayDateString = () => new Date().toLocaleString().split(',')[0];

const toTime = (a) => (new Date(a)).getTime();

const compareDates = (a, b) => toTime(a) - toTime(b);

export const sortedTasks = (state) => (
  state.tasks
    .slice()
    .sort((a, b) => compareDates(a.date, b.date))
);

export const groupedTasks = (_state, { sortedTasks }) => {
  const today = getTodayDateString();

  const tasks = sortedTasks.map((task) => ({
    ...task,
    date: toTime(task.date) === toTime(today) ? 'Today' : task.date,
  }));

  return groupBy(tasks, 'date');
};

export const getStats = (_state, { groupedTasks }) => (groupName) => {
  const tasksGroupedByCategory = groupBy(groupedTasks?.[groupName] ?? {}, 'category');

  return Object
    .keys(tasksGroupedByCategory)
    .map((category) => ({
      label: category,
      set: tasksGroupedByCategory[category].length,
    }))
    .reduce(({ labels, series }, { label, set }) => ({
      labels: [...labels, label],
      series: [...series, set],
    }), { labels: [], series: [] });
};

export const numberOfTasks = (state) => (
  state.tasks.length
);
