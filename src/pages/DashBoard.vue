<script setup>
    import { useAuthStore } from '../store/authStore';
    import { storeToRefs } from 'pinia'

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
    const transactions = ref([]);
    const totalIncomeAmount = ref(0);
    const totalExpenseAmount = ref(0);
    const budget = ref(0);
    const { positiveTransactions, negativeTransactions } = storeToRefs(transactionStore);

    onMounted(async() => {
      if (!authStore.isAuthenticated) {
            window.location.href = '/auth/login';
            return;
        }
      await authStore.fetchCurrentUser()
        await transactionStore.fetchTransactions();
        console.log(totalIncomingThisMonth.value, totalOutgoingThisMonth.value);

    });

    
    const incomingTransactions = computed(() => {
        return transactionStore.transactions.filter(t => t.type === 'income');
        
    });
    const outgoingTransactions = computed(() => {
        return transactionStore.transactions.filter(t => t.type === 'expense');
        
    });
    const totalIncome = computed(() => {
        return incomingTransactions.value.reduce((sum, t) => sum + Number(t.amount), 0);
    });
    const totalExpense = computed(() => {
        return outgoingTransactions.value.reduce((sum, t) => sum + Number(t.amount), 0);
    });
    const balance = computed(() => {
        return totalIncome.value - totalExpense.value;
    });
    const incomingThisMonth = computed(() => {
        const now = new Date();
        return incomingTransactions.value.filter(t => {
            const tDate = new Date(t.transaction_date);
            return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
        });
    });

  const outgoingThisMonth = computed(() => {
        const now = new Date();
        return outgoingTransactions.value.filter(t => {
            const tDate = new Date(t.transaction_date);
            return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
        });
    });
    const totalIncomingThisMonth = computed(() => {
        return incomingThisMonth.value.reduce((sum, t) => sum + Number(t.amount), 0);
    });
    const totalOutgoingThisMonth = computed(() => {
        return outgoingThisMonth.value.reduce((sum, t) => sum + Number(t.amount), 0);
    });
    const balanceThisMonth = computed(() => {
        return totalIncomingThisMonth.value - totalOutgoingThisMonth.value;
    });

  const chartData = computed(() => ({
    labels: ['Spent', 'Remaining Budget'],
    datasets: [
      {
        data: [totalExpense.value, balanceThisMonth.value],
        backgroundColor: ['#46a9ff', '#27ae60'],
        hoverBackgroundColor: ['#36a2eb', '#27ae60'],
      },
    ]
  }));

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
    },
    centerText: {
        text: `${balanceThisMonth.value}`,
        color: '#333',
        font: { size: '20' },
      },
    },
  };

  

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
            <h1 v-if="firstName">Welcome, {{ firstName }}</h1>
            <h1 v-else>Welcome, {{ authStore.user.email }}</h1>
            <p>your financial review for {{ currentMonth }}.</p>
           </section>
           <div class="info">
            <section class="card odd">
                <h2>Total Balance</h2>
                <p>${{ balance }}</p>
            </section>
            <section class="card even">
                <h2>Income this month</h2>
                <p>${{ totalIncomingThisMonth }}</p>
            </section>
            <section class="card even">
                <h2>Expenses this month</h2>
                <p>${{ totalOutgoingThisMonth }}</p>
            </section>
            <section class="card odd">
                <h2>Saving</h2>
                <p>${{ balance }}</p>
            </section>
           
           </div>
           <section class="charts">
            <div  >
                  <DonuutChart
                    :chart-data="chartData"
                    :chart-options="chartOptions"
                />
              </div>
             
            
              


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

                      <td> 
                        <span class="amount" :class="{ 'negative': negativeTransactions.includes(transaction) , 'positive': positiveTransactions.includes(transaction) }">
                        {{ negativeTransactions.includes(transaction) ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                    </span>
                      </td>
                       
                        
                        
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
.negative {
    color: red;
}
.positive {
    color: green;
}
.amount {
    font-weight: bold;
    font-size: 1.1rem;
    
}
</style>

