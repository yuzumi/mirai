/* eslint-disable no-shadow */

export const notes = (state) => state.notes;

export const numberOfNotes = (_state, { notes }) => notes.length;
