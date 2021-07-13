import { uid } from 'quasar';

export const addNote = (state, payload) => {
  state.notes = [
    ...state.notes,
    {
      id: uid(),
      ...payload,
    },
  ];
};

export const deleteNote = (state, id) => {
  state.notes = state.notes.filter((note) => note.id !== id);
};
