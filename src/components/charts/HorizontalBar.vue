<script setup>
    import { Chart as ChartJS,Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { computed } from 'vue';
    import { Bar } from 'vue-chartjs';

     ChartJS.register(Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale);


     const props = defineProps({
       firsstValue: {
         type: Number,
         required: true,
       },
       firstColor: {
         type: String,
         default: '#22c55e',
       },
       secondColor: {
         type: String,
         default: '#ef4444',
       },
     });



</script>


<template>
    <div class="bar-container">
        <div class="bar" :style="{ width: firsstValue + '%', backgroundColor: firstColor }"></div>
        <div class="bar" :style="{ width: (100 - firsstValue) + '%', backgroundColor: secondColor }"></div>
        
    </div>
</template>

<style scoped>
   .bar-container {
        display: flex;
        width: 100%;
        height: 20px;
        background-color: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
    }
    .bar {
        height: 100%;
        transition: width 0.3s ease-in-out;
    }
</style>


