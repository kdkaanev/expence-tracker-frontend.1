<script setup>
    import { useAuthStore } from '../store/authStore';
    import NavBar from '../components/NavBar.vue';
    import { categoryIcons } from "../services/categoryIcons.js";
    import DonuutChart from '../components/charts/DonuutChart.vue';
    import LineChart from '../components/charts/LineChart.vue';
    import { Doughnut } from 'vue-chartjs';
    import { icon } from '@fortawesome/fontawesome-svg-core';
    import { useTransactionStore } from '../store/transactionsStore';
    import { ref, onMounted, computed } from 'vue';

    const authStore = useAuthStore();

    const transactionStore = useTransactionStore();
    onMounted(async() => {
      if (!authStore.isAuthenticated) {
            window.location.href = '/auth/login';
            return;
        }
      await authStore.fetchCurrentUser()
        await transactionStore.fetchTransactions();

    });



const transactions = [
    { id: 1, category: 'Grocery', amount: 50.0, date:'2025-09-10', type: 'expense', icon: 'fas fa-envelope' },
    { id: 2, category: 'Salary', amount: 3000.0, date:'2025-09-11', type: 'income', icon: 'fas fa-money-bill' },
    { id: 3, category: 'Electricity Bill', amount: 100.0, date:'2025-09-11', type: 'expense', icon: 'fas fa-bolt' },
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
  const budget = computed(() => {
    return props.values.reduce((total, value) => total + value, 0);
  });

     function getIcon(categoryName) {
      return categoryIcons[categoryName] || "tag"; // по подразбиране tag
};
     const lastThreeTransactions = computed(() => {
        return transactionStore.transactions
            .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
            .slice(0, 3);
    });
    const firstName = computed(() => {
        if (authStore.user && authStore.user.profile) {
            return `${authStore.user.profile.first_name}`;
        }
        return authStore.user.email ;
    });
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
</script>

<template>
    
       
        <article class="container">
             
           <section class="title">
            <h1 v-if="authStore.user.profile">Welcome, {{ firstName }}</h1>
            <h1 v-else>Welcome, {{ authStore.user.email }}</h1>
            <p>your financial review for {{ currentMonth }}.</p>
           </section>
           <div class="info">
            <section class="card odd">
                <h2>Total Balance</h2>
                <p>$5,000.00</p>
            </section>
            <section class="card even">
                <h2>Income this month</h2>
                <p>$3,000.00</p>
            </section>
            <section class="card even">
                <h2>Expenses this month</h2>
                <p>$1,500.00</p>
            </section>
            <section class="card odd">
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
              <tbody>
                   <tr v-for="transaction in lastThreeTransactions" :key="transaction.id">
                   <!-- <tr v-for="transaction in transactions" :key="transaction.id"> -->
                        <td><div class="cat-name">
                          <font-awesome-icon
                            :icon="getIcon(transaction.category_name)"
                            class="text-blue-500 w-5 h-5"
                        /><span class="capitalize">{{transaction.category_name}}</span>
                        </div> </td>
                        <td>{{ transaction.transaction_date}}</td>
                        <td>{{ transaction.description }}</td>

                      <td> {{ transaction.amount}}</td>
                       
                        
                        
                    </tr>
                </tbody>
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
.odd {
    background-color: #27ae60;
}
.odd:hover {
    background-color: #219150;
    cursor: pointer;
}
.even {
    background-color: #46a9ff;
    
}
.even:hover {
    background-color: #1B7FBF;
    cursor: pointer;
}
.container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cat-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.capitalize{
    text-transform: capitalize;
}
</style>

