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
      value: {
        type: Number,
        required: false
      },
      total: {
        type: Number,
        required: false
      },
      statusFn: {
        type: Function,
        required: true
      },
      mode : {
        type: String,
        required: false,
        default: 'budget' 
      }
     });

     

    
    const statusUsed = computed(() => {
        if (props.mode === 'budget' && props.statusFn && props.category) {
            return props.statusFn(props.category).used;
        } else if (props.mode === 'pot' && props.total) {
            return ((props.value / props.total) * 100).toFixed(0);
        }
        return 0;
    });
   
    
    const progressBackground = computed(() => {
        if (statusUsed.value.used >= 90) {
            return 'linear-gradient(90deg, #e63946, #ff7b00)'; 
        } else if (statusUsed.value.used >= 70) {
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


