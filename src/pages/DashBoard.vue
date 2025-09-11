<script setup>
    import { useAuthStore } from '../store/authStore';
    import NavBar from './NavBar.vue';
    const authStore = useAuthStore();
    import DonuutChart from '../components/charts/DonuutChart.vue';
    import LineChart from '../components/charts/LineChart.vue';
import { Doughnut } from 'vue-chartjs';
import { icon } from '@fortawesome/fontawesome-svg-core';



const transactions = [
    { id: 1, description: 'Grocery', amount: 50.0, date:'2025-09-10', type: 'expense', icon: 'fas fa-envelope' },
    { id: 2, description: 'Salary', amount: 3000.0, date:'2025-09-11', type: 'income', icon: 'fas fa-money-bill' },
    { id: 3, description: 'Electricity Bill', amount: 100.0, date:'2025-09-11', type: 'expense', icon: 'fas fa-bolt' },
];
    const props = defineProps({
    categories: {
      type: Array,
      default: () => ['Savings', 'Expenses', 'Investments'],
    },
    values: {
      type: Array,
      default: () => [300, 500, 200],
    },
  });
  const chartData = {
    labels: props.categories,
    datasets: [
      {
        data: props.values,
        backgroundColor: ['#27ae60', '#f39c12', 'e74c3c'],
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
    
       
        <article class="dashboard">
             
           <section class="title">
            <h1>Welcome, Ivan!</h1>
            <p>your financial review for September.</p>
           </section>
           <div class="info">
            <section class="card">
                <h2>Total Balance</h2>
                <p>$5,000.00</p>
            </section>
            <section class="card">
                <h2>Income this month</h2>
                <p>$3,000.00</p>
            </section>
            <section class="card">
                <h2>Expenses this month</h2>
                <p>$1,500.00</p>
            </section>
            <section class="card">
                <h2>Saving</h2>
                <p>$1,500.00</p>
            </section>
           
           </div>
           <section class="charts">
            <div  >
                  <DonuutChart
                    :chart-data="chartData"
                    :chart-options="chartOptions"
                />
              </div>
             
            
              <LineChart />


           </section>
           <section class="transactions">
            <h2>Last Transactions</h2>
            <ul>
                <li v-for="tx in transactions" :key="tx.id" class="transactions-item">
                  <i :class="tx.icon" class="icon"></i>
                 <div class="transactions-info">
                     <span class="description">{{ tx.description }}</span>
                      <span class="date">{{ tx.date }}</span>
                  
                 </div>
                 <span :class="tx.type === 'income' ? 'income' : 'expense'">
                    {{ tx.type === 'income' ? '+' : '-' }}${{ tx.amount.toFixed(2) }}
                  </span>
                </li>
              
            </ul>
           </section>
           
        </article>
    
</template>

<style scoped>
.dashboard {
    padding: 2rem;
}
.card {
    background: #f9f9f9;
    border: 1px;
    border-radius: 8px;
    padding: 1.5rem;
    padding-left: 0.5rem;
    margin-top: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;

}
 h2{
    margin-bottom: 0.5rem;
    font-size: smaller;
    font-weight: normal;
    
}
.card > p{
    font-size: larger;
    font-weight: bold;
}
.card > h2, .card > p {
   text-align: start;
  
   
}   
.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    transition: all 0.3s ease;
}
.dount {
    max-width: 400px;
    height: 400px;
    margin: 0 auto;
}
.charts {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.last {
    margin-top: 2rem;

}
.transactions{
    margin-top: 2rem;
    max-width: 600px;
  margin: 0 auto;
}
.transactions-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
}
.icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: #27ae60;
}
.transactions-info {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 2rem;
   justify-content:start;
    align-items: center;
    padding-right: 1rem;
}
.date {
    color: #888;
    font-size: 0.875rem;
    margin-left: 1rem;
    text-align: end;
}

</style>

