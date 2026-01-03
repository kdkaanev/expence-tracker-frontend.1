<script setup>
    import { useAuthStore } from '../store/authStore';
    import { storeToRefs } from 'pinia'
    import { useBudgetStore } from '../store/budgetStore.js';
    import BarChart from '../components/charts/BarChart.vue';
    import { categoryIcons } from "../services/categoryIcons.js";
    import DonuutChart from '../components/charts/DonuutChart.vue';
    import { useTransactionStore } from '../store/transactionsStore';
    import {computed } from 'vue';
    import  { useRouter } from "vue-router";

   
   


    const authStore = useAuthStore();
    const budgetStore = useBudgetStore();
    const transactionStore = useTransactionStore();
   
    const { budgets } = storeToRefs(budgetStore);
    const { positiveTransactions, negativeTransactions } = storeToRefs(transactionStore);
     const { daysOfMonth, dailyExpenses } = storeToRefs(transactionStore);
    const router = useRouter();




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

    const totalBudgets = computed(() => {
        return budgets.value.reduce((sum, b) => sum + Number(b.amount), 0);

    });
  
    const spentFromBudgets = computed(() => {
        return transactionStore.transactions
            .filter(t => t.type === 'expense' && budgetStore.budgets.some(b => b.category_name === t.category_name))
            .reduce((sum, t) => sum + Number(t.amount), 0);
    });
    const remainingBudget = computed(() => {
        return totalBudgets.value - spentFromBudgets.value;
    });

  const chartData = computed(() => ({
    labels: ['Похарчено', 'Оставащ бюджет'],
    datasets: [
      {
        data: [spentFromBudgets.value, remainingBudget.value],
        backgroundColor: ['#46a9ff', '#27ae60'],
        hoverBackgroundColor: ['#36a2eb', '#27ae60'],
      },
    ]
  }));

   const barData = computed(() => ({
        labels: daysOfMonth.value.map(day => day.split('-')[2]),
        datasets: [
            {
                label: Date().toLocaleString('default', { month: 'long' }),
                backgroundColor: '#22c55e',
                data: dailyExpenses.value,
                borderRadius: 8,
            },
        ],
    }));


    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Дневни разходи',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


  

     function getIcon(categoryName) {
      return categoryIcons[categoryName] || "tag"; // default to "tag"
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

    const goToAllTransactions = () => {
        router.push('/transactions');
    };
    const goToBudgets = () => {
        router.push('/budget');
    };
</script>

<template>
    
       
        <article class="container">
             
           <section class="title">
            <h1 v-if="firstName">Здравей, {{ firstName }}</h1>
            <h1 v-else>Добре дошъл, {{ authStore.user.email }}</h1>
            <p>твоят финансов преглед за {{ currentMonth }}.</p>
           </section>
           <div class="info">
            <section class="card odd">
                <h2>Общ баланс</h2>
                <p>€&ensp;{{ balance }}</p>
            </section>
            <section class="card even">
                <h2>Приходи този месец</h2>
                <p>€&ensp;{{ totalIncomingThisMonth }}</p>
            </section>
            <section class="card even">
                <h2>Разходи този месец</h2>
                <p>€&ensp;{{ totalOutgoingThisMonth }}</p>
            </section>
            <section class="card odd">
                <h2>Спестявания</h2>
                <p>€&ensp;{{ balanceThisMonth }}</p>
            </section>
           
           </div>
           <section class="charts">
                <div class="bar-chart">
                <BarChart 
                :bar-data="barData" 
                :bar-options="barOptions"
                   
                />
            </div>
            
            <div class="mode-view budget">
                <h2>Общ бюджет: {{ totalBudgets }}</h2>
                <h2 @click="goToBudgets" class="see-all">Виж Бюджети</h2>
            </div>

        
                
            <div  v-if="totalBudgets > 0" class="donut">
                  <DonuutChart
                    :chart-data="chartData"
                    :center-text="{
                      lines: [
                        { text: `€${totalBudgets}`, fontSize: 20, color: '#333' },
                        { text: `Оставащ: €${remainingBudget}`, fontSize: 14, color: remainingBudget < 0 ? 'red' : '#666' },
                      ],
                      
                    }"
                />
              </div>
             
            
              


           </section>
           <section class="transactions">
            <div class="mode-view">
                <h2>Последни транзакции</h2>
                <h2 @click="goToAllTransactions" class="see-all">Виж всички</h2>
            </div>
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
                        {{ negativeTransactions.includes(transaction) ? '-' : '+' }}€&ensp;{{ Math.abs(transaction.amount).toFixed(2) }}
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
    flex-direction: column;
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
.mode-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.see-all {
    color: #007bff;
    cursor: pointer;
}
.see-all:hover {
    text-decoration: underline;
}
.budget {
    gap: 4rem;
}

.bar-chart {
    width: 100%;
    max-width: 600px;
    height: 300px;
    
}
.donut {
    width: 100%;
    max-width: 400px;
    height: 400px;
    margin: 0 auto;
}

@media (max-width: 600px) {
    .info {
        grid-template-columns: 1fr !important;
    }
    tbody tr {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        border: 1px solid #ddd;
        padding: 0.5rem;
        margin-bottom: 1rem;    
    
}
.transactions {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
tr td {
    width: 100%;
    text-align: center;
}
}
</style>

