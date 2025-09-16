<script setup>
    import { Chart as ChartJS,Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { computed } from 'vue';
    import { Bar } from 'vue-chartjs';

     ChartJS.register(Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale);


     const props = defineProps({
       lables: {
         type: Array,
         required: true,
       },
       values: {
         type: Array,
        required: true,
       },
       maxValue: {
        type: Number,
        required: true,
        default: 1000
       },
     });

        const chartData = computed(() => ({
            labels: props.lables,
            datasets: [
                {
                    label: 'Budget Usage',
                    backgroundColor: '#22c55e',
                    data: props.values,
                    borderRadius: 8,
                },
                ],
        }));

        const chartOptions = computed(() => ({
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: props.maxValue,
                  
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
               
            },
        }));

</script>


<template>
    <div class="bar">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
    .bar {
        width: 400px;
        height: 100px;
    }
</style>


