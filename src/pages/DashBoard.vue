<script setup>
    import { useAuthStore } from '../store/authStore';
    import NavBar from './NavBar.vue';
    const authStore = useAuthStore();
    import DonuutChart from '../components/charts/DonuutChart.vue';
import { Doughnut } from 'vue-chartjs';
   
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
            <div style="width: 300px; height: 400px;" >
                  <DonuutChart
                    :chart-data="chartData"
                    :chart-options="chartOptions"
                />
              </div>
             
            
            <section class="card">
                <h2>Balance for September</h2>
                <p>$500.00</p>
            </section>
           </section>
           <section class="last">
            <h2>Last Transactions</h2>
            <ul>
                <li>Grocery - $50.00</li>
                <li>Salary - $3,000.00</li>
                <li>Electricity Bill - $100.00</li>
                
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
    margin-top: o.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;

}
.card > h2{
    margin-bottom: 0.5rem;
    font-size: smaller;
    font-weight: light;
    
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}
</style>

