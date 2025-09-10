<template>
    <div class="dashboard">
        <h1>Finance Dashboard</h1>
        <div class="dashboard-sections">
            <section class="pots">
                <h2>Pots</h2>
                <!-- Example pots list -->
                <ul>
                    <li v-for="pot in pots" :key="pot.id">
                        {{ pot.name }}: ${{ pot.balance }}
                    </li>
                </ul>
            </section>
            <section class="transactions">
                <h2>Transactions</h2>
                <!-- Example transactions list -->
                <ul>
                    <li v-for="tx in transactions" :key="tx.id">
                        {{ tx.date }} - {{ tx.description }}: ${{ tx.amount }}
                    </li>
                </ul>
            </section>
            <section class="recurring-bills">
                <h2>Recurring Bills</h2>
                <!-- Example recurring bills list -->
                <ul>
                    <li v-for="bill in recurringBills" :key="bill.id">
                        {{ bill.name }}: ${{ bill.amount }} ({{ bill.frequency }})
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const pots = ref([
    { id: 1, name: 'Savings', balance: 1200 },
    { id: 2, name: 'Emergency', balance: 500 },
])

const transactions = ref([
    { id: 1, date: '2024-06-01', description: 'Groceries', amount: -50 },
    { id: 2, date: '2024-06-02', description: 'Salary', amount: 2000 },
])

const recurringBills = ref([
    { id: 1, name: 'Netflix', amount: 15, frequency: 'Monthly' },
    { id: 2, name: 'Gym', amount: 40, frequency: 'Monthly' },
])
</script>

<style scoped>
.dashboard {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
}
.dashboard-sections {
    display: flex;
    gap: 2rem;
}
section {
    flex: 1;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
}
h2 {
    margin-top: 0;
}
ul {
    list-style: none;
    padding: 0;
}
</style>