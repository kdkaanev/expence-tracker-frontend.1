<script setup>
    import HorizontalBar from '../components/charts/HorizontalBar.vue';
    import { onMounted, ref } from 'vue';
    import { usePotsStore } from '../store/potsStore';
    import Button from '../components/ui/Button.vue';
    import { computed } from 'vue';
import { add } from 'date-fns';

    const potsStore = usePotsStore();
    const potsData = computed(() => potsStore.pots);
    const editMode = ref(false);
    const showModal = ref(false);
    const showEditModal = ref(false);
    const formPotRef = ref(null);
    const showAddFundsModal = ref(false);
    const showWithdrawFundsModal = ref(false);


    onMounted(async () => {
        await potsStore.fetchPots();
        console.log('Pots data:', potsData.value);
    });


    const formPot = ref({
        id: null,
        pot: '',
        goal: 0,
       
    });

    const formAddFunds = ref({
        id: null,
        addAmount: 0
    });

    const formWithdrawFunds = ref({
        id: null,
        withdrawAmount: 0
    });
    const openAddPotModal = async () => {
        editMode.value = false;
        formPot.value = {
            id: null,
            pot: '',
            goal: 0,
            
        };
        showModal.value = true;

    };

    const openEditModal = (pot) => {
        editMode.value = true;
        formPot.value = {
            id: pot.id,
            pot: pot.pot,
            goal: pot.goal,
            
        };
        showModal.value = true;
        console.log('Editing pot:', formPot.value);
    };
    const closeModal = () => {
        showModal.value = false;
        showEditModal.value = false;
    };

    const openAddFundsModal = (pot) => {
        formAddFunds.value = {
            id: pot.id,
            addAmount: 0
        };
        showAddFundsModal.value = true;
        

        alert(`Open add funds modal for pot: ${pot.pot}`);
    };



    const openWithdrawFundsModal = (pot) => {
        formWithdrawFunds.value = {
            id: pot.id,
            withdrawAmount: 0
        };
        showWithdrawFundsModal.value = true;
        alert(`Open withdraw funds modal for pot: ${pot.pot}`);
    };
    const submitForm = async () => {
        if (editMode.value) {
            await potsStore.updatePot(formPot.value);
        } else {
            await potsStore.addPot(formPot.value);
        }
        closeModal();
    };
    const deletePot = async (potId) => {

        if (!confirm('Are you sure you want to delete this pot?')) {
            return;
        }
        await potsStore.deletePot(potId);
    };
    const addFunds = async () => {
        const amount = parseFloat(document.getElementById('addAmount').value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount to add.');
            return;
        }
        await potsStore.addMoneyToPot(formAddFunds.value.id, { amount });
        closeModal();
    };

    const withdrawFunds = async () => {
        const amount = parseFloat(document.getElementById('withdrawAmount').value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount to withdraw.');
            return;
        }
        await potsStore.withdrawMoneyFromPot(formWithdrawFunds.value.id, { amount });
        closeModal();
    };


    const potStatus = (pot) => {
        const potInfo = potsData.value.find(p => p.pot === pot);
        if (potInfo) {
            const progress = ((potInfo.saved / potInfo.goal) * 100).toFixed(0);
            return { progress: progress > 100 ? 100 : progress, remaining: potInfo.goal - potInfo.saved };
        }
        return { progress: 0, remaining: 0 };
    };

</script>



<template>
    <article>
        <h1>Pots</h1>
        <Button variant="primary" 
        class="btn-add"
        @click="openAddPotModal"
        >Add New Pot</Button>
        <form @submit.prevent="submitForm" v-if="showModal" ref="formPotRef">
           
            <!-- Modal content for adding/editing pot would go here -->
           
             <span class="close" @click="closeModal">&times;</span>
             <h2>{{ editMode ? 'Edit Pot' : 'Add Pot' }}</h2>
                <label for="pot">Pot Name:</label>
                <input v-model="formPot.pot" id="pot" required />

                <label for="goal">Goal Amount:</label>
                <input v-model.number="formPot.goal" id="goal" type="number" required />

                <Button variant="primary" type="submit">{{ editMode ? 'Update Pot' : 'Add Pot' }}</Button>

                

            </form>
             <form @submit.prevent="addFunds" v-if="showAddFundsModal">
                <!-- Modal content for adding funds would go here -->
                <span class="close" @click="closeModal">&times;</span>
                <h2>Add Funds to {{ formPot.pot }}</h2>
                <label  for="addAmount">Amount to Add:</label>
                <input v-model="formPot" id="addAmount" type="number" required />
                <Button variant="primary" type="submit">Add Funds</Button>
            </form>

            <form @submit.prevent="withdrawFunds" v-if="showWithdrawFundsModal">
                <!-- Modal content for withdrawing funds would go here -->
                <span class="close" @click="closeModal">&times;</span>
                <h2>Withdraw Funds from {{ formPot.pot }}</h2>
                <label for="withdrawAmount">Amount to Withdraw:</label>
                <input v-model="formPot" id="withdrawAmount" type="number" required />
                <Button variant="primary" type="submit">Withdraw Funds</Button>
            </form>
        
        <section class="container">
            <div class="grid">
                <div v-for="item in potsData" :key="item.id" class="pot-card">
                    <h3>{{ item.pot }}</h3>
                    <p>${{ item.saved }} / ${{ item.goal }}</p>
                    <div class="buttons">
                        <button class="transparant" @click="openEditModal(item)">✏️</button>
                        <button class="transparant" @click="deletePot(item.id)">🗑️</button>
                        <button class="transparant" @click="openAddFundsModal(item)">➕</button>
                        <button class="transparant" @click="openWithdrawFundsModal(item)">➖</button>
                    </div>
                    <HorizontalBar
                        :key="item.id"
                        :value="item.saved"
                        :total="item.goal"
                        mode="pot"
                    />
                    <p>{{ potStatus(item.pot).remaining }} remaining</p>

                 
                    
                </div>
            </div>
        </section>
    </article>
</template>


<style scoped>
    .container {
        padding: 20px;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    .pot-card {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .pot-card h3 {
        margin-bottom: 10px;
        font-size: 1.2em;
    }
    .pot-card p {
        font-size: 1.5em;
        font-weight: bold;
        color: #4caf50;
    }

    .transparant{
    background-color: transparent;
    border: none;
    cursor: pointer;
    
   
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

</style>