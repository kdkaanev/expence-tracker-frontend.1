<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
  import { Doughnut} from 'vue-chartjs';


  ChartJS.register(ArcElement, Tooltip, Legend,);

  defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    required: true,
  },
  });


</script>

<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />  

  </div>
</template>

<style scoped>
  .chart-container {
    height: 400px;
    width: auto;
    position: relative;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
}
</style>