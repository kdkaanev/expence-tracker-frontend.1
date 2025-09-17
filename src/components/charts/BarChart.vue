<script setup>
  import { Chart as ChartJS,Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { Bar } from 'vue-chartjs';

  ChartJS.register(Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale);


  const props = defineProps({
    categories: {
      type: Array,
      default: () => ['01', '02', '03', '04', '05', '06', '07','08,09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
    },
    values: {
      type: Array,
      default: () => [500, 700, 400, 600, 800, 300, 900, 200, 100, 400, 600, 800, 300, 900, 200, 100, 400, 600, 800, 300, 900, 200, 100, 400, 600, 800, 300, 900, 200, 100, 400],
    },
  });

  const chartData = {
    labels: props.categories,
    datasets: [
      {
        label: 'July',
        backgroundColor: '#22c55e',
        data: props.values,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500
        }
          
      },
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'July',
        
      },
    },
  };
</script>

<template>
  <div class="bar">
    <Bar :data="chartData" :options="chartOptions" />

  </div>
</template>

<style scoped>
  .bar {
    width: 100%;
    height: 400px;
  }
</style>