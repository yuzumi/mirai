<template>
  <apexchart
    class="stats-chart"
    type="pie"
    width="420"
    :options="options"
    :series="data.series"
  />
</template>

<script>
export default {
  name: 'StatsChart',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          width: 420,
          type: 'pie',
        },
        labels: this.data.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      };
    },
  },
};
</script>
