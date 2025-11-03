<script setup>
  import { Chart as ChartJS,Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { Bar } from 'vue-chartjs';

  ChartJS.register(Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale);


  const props = defineProps({
    barData: {
      type: Object,
      required: true,
    },
    barOptions: {
      type: Object,
      required: true,
    },
  });


</script>

<template>
  <div class="bar">
    <Bar :data="barData" :options="barOptions" />
    

  </div>
</template>

<style scoped>
  .bar {
    width: 100%;
    height: 400px;
  }
</style>