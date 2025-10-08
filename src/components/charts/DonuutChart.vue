<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
  import { Doughnut} from 'vue-chartjs';


 

 const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart
    ctx.save()

    const fontSize = (height / 100).toFixed(2)
    ctx.font = `${fontSize}em sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'

    // Текстът, който ще се показва (взимаме го от chart.config.options.plugins.centerText)
    const text = chart.config.options.plugins.centerText?.text || ''
    const textX = width / 2 + chart.chartArea.left
    const textY = height / 2 + chart.chartArea.top

    ctx.fillText(text, textX, textY)
    ctx.restore()
  }
}
ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin);
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
 
</style>