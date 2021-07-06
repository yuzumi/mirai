<template>
  <q-page class="q-pa-sm q-gutter-y-sm">
    <q-btn
      round
      color="primary"
      icon="add"
      @click="openDialog"
    />

     <q-dialog v-model="chart">
      <q-card>
        <q-card-section>
          <div class="text-h6">Stats</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <stats-chart :data="stats" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-sm">
          <q-input
            v-model.trim="task.name"
            autofocus
            label="Name"
            :rules="rules.name"
          />

          <q-input
            v-model.trim="task.description"
            autogrow
            label="Description"
          />

          <q-select
            v-model="task.category"
            :options="options.category"
            label="Category"
          />

          <q-select
            v-model="task.priority"
            :options="options.priority"
            label="Priority"
          />

          <q-input v-model="task.date" mask="date" :rules="rules.date" label="Date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="date" transition-show="scale" transition-hide="scale">
                  <q-date v-model="task.date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="secondary" flat />
                      <q-btn v-close-popup label="Accept" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click.stop="closeDialog" v-close-popup />
          <q-btn flat label="Add" @click.stop="handleTaskAdd" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div style="max-width: 75%; width: 100%;">
      <q-list>
        <q-expansion-item
          v-for="(group, name) in groupedTasks"
          :key="name"
          :content-inset-level="1"
          expand-separator
          icon="mail"
          :label="name"
          :caption="group.length.toString()"
          :default-opened="itemOpenByDefault(name)"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="task" color="primary" />
            </q-item-section>

            <q-item-section>
              {{ name }}
            </q-item-section>

            <q-item-section side>
              <div class="row items-center">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="donut_large"
                  title="Show stats"
                  @click.stop="showStats(name)"
                />
                <q-btn
                  flat
                  round
                  color="red"
                  icon="delete"
                  title="Delete group"
                  @click.stop="handleGroupDelete(name)"
                />
              </div>
            </q-item-section>
          </template>

          <q-expansion-item
            v-for="task of group"
            :key="task.id"
            :content-inset-level="1"
            expand-separator
            icon="schedule"
            :label="task.name"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="task" :color="getIconColorClass(task)" />
              </q-item-section>

              <q-item-section>
                {{ task.name }}
              </q-item-section>

              <q-item-section side>
                <div class="row items-center">
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="delete"
                    title="Delete task"
                    @click.stop="handleTaskDelete(task.id)"
                  />
                </div>
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                {{ task.description || 'No description' }}
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { format } from 'date-fns';

import StatsChart from 'components/tasks/StatsChart.vue';

const store = {
  computed: {
    ...mapGetters('tasks', [
      'groupedTasks',
      'getStats',
    ]),
  },
  methods: {
    ...mapMutations('tasks', [
      'addTask',
      'deleteGroup',
      'deleteTask',
    ]),
  },
};

export default {
  name: 'Tasks',
  mixins: [store],
  data() {
    return {
      dialog: false,
      chart: false,
      stats: {},
      task: {
        name: '',
        description: '',
        date: format(new Date(), 'yyyy/MM/dd'),
        priority: 'low',
        category: 'unknown',
      },
      rules: {
        name: [(value) => (value && value.length > 0) || 'Enter a name'],
        date: ['date'],
      },
      options: {
        priority: ['low', 'medium', 'high'],
        category: ['sport', 'work', 'everyday life', 'other', 'unknown'],
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    handleTaskAdd() {
      this.addTask(this.task);
      this.closeDialog();
    },
    handleGroupDelete(name) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete the group '${name}'?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.deleteGroup(name);
      });
    },
    handleTaskDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete the task?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.deleteTask(id);
      });
    },
    getIconColorClass(task) {
      switch (task.priority) {
        case 'low': return 'yellow';
        case 'medium': return 'green';
        case 'high': return 'red';
        default: return 'primary';
      }
    },
    showStats(groupName) {
      this.stats = this.getStats(groupName);
      this.chart = true;
    },
    itemOpenByDefault(name) {
      return name === 'Today';
    },
  },
  components: {
    StatsChart,
  },
};
</script>
