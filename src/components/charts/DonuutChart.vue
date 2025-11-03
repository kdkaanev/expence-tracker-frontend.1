<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
  import { computed } from 'vue';
  import { Doughnut} from 'vue-chartjs';
  import { centerTextPlugin } from '../../utiles/chartCenterText.js';


 




ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin);
const props = defineProps({
  chartData: Object,
  centerText: {
    type: Object,
    required: false,
    default: null,
  }
 
  });

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    ...(props.centerText && {
      centerText: {
        lines: props.centerText.lines,
        lineHeight: props.centerText.lineHeight || 22,
      },
    }),
    
    cutout: '70%',

  },
}));


</script>

<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />  

  </div>
</template>

<style scoped>
 
</style>