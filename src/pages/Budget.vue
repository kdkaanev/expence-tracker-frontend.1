<script setup>
import { icon } from '@fortawesome/fontawesome-svg-core';
import DonuutChart from '../components/charts/DonuutChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import Button from '../components/ui/Button.vue';


    const budgetData = [
        { category: 'Food', limit: 300, spent: 150, icon: 'fas fa-utensils' },
        { category: 'Transport', limit: 100, spent: 60, icon: 'fas fa-bus' },
        { category: 'Entertainment', limit: 150, spent: 80, icon: 'fas fa-film' },
        { category: 'Utilities', limit: 200, spent: 120, icon: 'fas fa-lightbulb' },
        { category: 'Health', limit: 100, spent: 40, icon: 'fas fa-heartbeat' },
        { category: 'Shopping', limit: 250, spent: 200, icon: 'fas fa-shopping-cart' },
    ];
    const props = defineProps({
    categories: {
      type: Array,
      default: () => ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping'],
    },
    values: {
      type: Array,
      default: () => [300, 100, 150, 200, 100, 250],
    },
    });
    const chartData = {
    labels: props.categories,
    datasets: [
      {
        data: props.values,
        backgroundColor: ['#27ae60', '#f39c12', '#e74c3c', '#8e44ad', '#3498db', '#e67e22'],
        borderWidth: 2,
      },
    ],
    };
    const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 14 },

      },
    }
    },
    };
</script>

<template>
    <article>
        <h1>Budgets</h1>
        <section class="container">
            
            <div class="leftside">
                <section class="card donut">
                    <DonuutChart :chart-data="chartData" :chart-options="chartOptions" />
                    <div class="summary">
                        <p>Total Budget</p>
                        <h3>$1,100</h3>
                    </div>
                </section>
                <section class="budget-list">
                    <div  v-for="item in budgetData" :key="item.category" class="card budget-item">
                        <i :class="item.icon" class="icon"></i>
                        <div class="budget-details">
                            <h3>{{ item.category }}</h3>
                            <p>Limit: ${{ item.limit }}</p>
                            <p>Spent: ${{ item.spent }}</p>
                            <p>Remaining: ${{ item.limit - item.spent }}</p>
                        </div>
                    </div>
                </section>
            </div>
            <div class="rightside">
                <LineChart />
                <Button variant="primary">+ Add Budget</Button>
            </div>

        </section>
    </article>
</template>

<style scoped>
    .container {
    display: flex;
    flex-direction: row;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .leftside {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 50%;
    }
    .rightside {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50%;
        padding-left: 20px;
        border-left: 1px solid #eee;
    }
    .budget-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 400px;
        overflow-y: auto;
    }
    .budget-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .budget-item:last-child {
        border-bottom: none;
    }
    .icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: #27ae60;
    }
    .budget-details h3 {
        margin: 0;
        font-size: 1.2rem;
    }
    .budget-details p {
        margin: 2px 0;
        color: #555;
    }
    .donut {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 400px;
        width: auto;
    }
    .card {
        background-color: #f9f9f9;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .rightside {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

</style>

