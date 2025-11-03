<!-- <script setup>
import {Chart as Cartjs,Title,Tooltip,Legend,LineElement,CategoryScale,LinearScale,PointElement, Filler, plugins} from 'chart.js';
import { Line } from 'vue-chartjs';

Cartjs.register(Title,Tooltip,Legend,LineElement,CategoryScale,LinearScale,PointElement,Filler);


const chartData = {
    labels: ['01', '05', '09', '23', '30'],
    datasets: [
        {
            label: 'Balance',
            data: [7000, 6500, 6000, 5800, 5000, 5200, 4800],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
        },
        {
            label: 'Income',
            data: [600, 700, 800, 600, 900, 800, 1000],
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.2)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#27ae60',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#27ae60',
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {display: false}, 
        title: {
            display: true,
            text: 'Balance for September',
            font: { size: 16 },
            color: '#000',
            
        },

    },
    scales: {
        x: {
            grid: { display: false },
    
        },
        y: {
            beginAtZero: true,
            grid: { color: '#f0f0f0' },
            ticks: { stepSize: 2500,},
        },
    },
   
};

</script>


<template>
    <div class="chart-container" >
        <Line :data="chartData" :options="chartOptions" />
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
</style> -->