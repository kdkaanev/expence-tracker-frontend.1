<script setup>
    import { Chart as ChartJS,Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ca } from 'date-fns/locale';
import { computed } from 'vue';
    import { Bar } from 'vue-chartjs';

     ChartJS.register(Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale);


     const props = defineProps({
      category: {
        type: Number,
        required: true
      },
      statusFn: {
        type: Function,
        required: true
      }
     });

     

    const status = computed(() => props.statusFn(props.category));
    const statusUsed = computed(() => status.value.used);
    console.log(status.value.used);
    
    const progressBackground = computed(() => {
        if (status.value.used >= 90) {
            return 'linear-gradient(90deg, #e63946, #ff7b00)'; 
        } else if (status.value.used >= 70) {
            return '#ffb703'; // yellow
        } else {
            return '#26d926'; // Green
        }
    });

</script>


<template>
    <div class="bar-container">
        <div class="bar" :style="{ width: statusUsed + '%', background: progressBackground }"></div>
        
        
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


