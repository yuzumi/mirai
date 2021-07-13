<template>
  <q-page class="q-pa-sm q-gutter-y-sm">
    <q-btn
      round
      color="primary"
      icon="add"
      @click="openDialog"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">New note</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-sm">
          <q-input
            v-model.trim="note.title"
            autofocus
            label="Title"
          />

          <q-input
            v-model.trim="note.description"
            autogrow
            label="Description"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click.stop="closeDialog" v-close-popup />
          <q-btn flat label="Add" @click.stop="handleNoteAdd" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div>
      <div class="row q-col-gutter-sm">
        <div
          class="col-3"
          v-for="note of notes"
          :key="note.id"
        >
          <note-card
            :note="note"
            @delete="deleteNote"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

import NoteCard from 'components/notes/NoteCard.vue';

export default {
  name: 'Notes',
  components: {
    NoteCard,
  },
  setup() {
    const store = useStore();

    const dialog = ref(false);

    const note = reactive({
      title: '',
      description: '',
    });

    const resetNote = () => {
      note.title = '';
      note.description = '';
    };

    const openDialog = () => {
      dialog.value = true;
    };

    const closeDialog = () => {
      dialog.value = false;
    };

    const handleNoteAdd = () => {
      store.commit('notes/addNote', note);
      resetNote();
    };

    return {
      note,
      dialog,

      notes: computed(() => store.getters['notes/notes']),

      openDialog,
      closeDialog,

      handleNoteAdd,

      deleteNote: ({ id }) => store.commit('notes/deleteNote', id),
    };
  },
};
</script>
