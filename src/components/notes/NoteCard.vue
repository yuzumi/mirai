<template>
  <q-card
    class="note-card full-height"
    bordered
  >
    <q-card-section>
      <h6 class="q-my-none">
        {{ note.title }}
      </h6>
    </q-card-section>

    <q-card-section>
      {{ note.description }}
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        flat
        round
        color="primary"
        icon="edit"
      />
      <q-btn
        flat
        round
        color="red"
        icon="delete"
        @click.stop="handleNoteDelete(note)"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useQuasar } from 'quasar';

export default {
  name: 'NoteCard',
  emits: ['delete'],
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const $q = useQuasar();

    const handleNoteDelete = (note) => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete the note?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        emit('delete', note);
      });
    };

    return {
      handleNoteDelete,
    };
  },
};
</script>
