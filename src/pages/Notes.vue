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
          <q-card
            class="note-card full-height"
            bordered
          >
            <q-card-section>
              <h6 class="q-my-none">{{ note.title }}</h6>
            </q-card-section>

            <q-card-section>
              {{ note.description }}
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round color="primary" icon="edit" />
              <q-btn flat round color="red" icon="delete" @click.stop="handleNoteDelete(note)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Notes',
  setup() {
    const $q = useQuasar();

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

    const handleNoteDelete = ({ id }) => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete the note?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        store.commit('notes/deleteNote', id);
      });
    };

    return {
      note,
      dialog,

      notes: computed(() => store.getters['notes/notes']),

      openDialog,
      closeDialog,

      handleNoteAdd,
      handleNoteDelete,
    };
  },
};
</script>
