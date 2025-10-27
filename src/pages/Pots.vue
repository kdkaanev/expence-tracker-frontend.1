<script setup>
    import HorizontalBar from '../components/charts/HorizontalBar.vue';
    import { onMounted, ref } from 'vue';
    import { usePotsStore } from '../store/potsStore';
    import Button from '../components/ui/Button.vue';
    import { computed } from 'vue';

    const potsStore = usePotsStore();
    const potsData = computed(() => potsStore.pots);
    const editMode = ref(false);
    const showModal = ref(false);
    const showEditModal = ref(false);


    onMounted(async () => {
        await potsStore.fetchPots();
        console.log('Pots data:', potsData.value);
    });


    const formPot = ref({
        pot: '',
        goal: 0,
        
    });

    const openAddPotModal = async () => {
        editMode.value = false;
        formPot.value = {
            pot: '',
            goal: 0,
            
        };
        showModal.value = true;

    };

    const openEditModal = (pot) => {
        editMode.value = true;
        formPot.value = { ...pot };
        showEditModal.value = true;
    };
    const submitForm = async () => {
        if (editMode.value) {
            // Update existing pot logic here
        } else {
            await potsStore.addPot({
                pot: formPot.value.pot,
                goal: formPot.value.goal,
                
            });
        }
        showModal.value = false;
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
        <section v-if="showModal" ref="formPot">
            <!-- Modal content for adding/editing pot would go here -->
            <form @submit.prevent="submitForm">
                <label for="pot">Pot Name:</label>
                <input v-model="formPot.pot" id="pot" required />

                <label for="goal">Goal Amount:</label>
                <input v-model.number="formPot.goal" id="goal" type="number" required />

                <button type="submit">Add Pot</button>

            </form>

                
        </section>
        <section class="container">
            <div class="grid">
                <div v-for="item in potsData" :key="item.id" class="pot-card">
                    <h3>{{ item.pot }}</h3>
                    <p>${{ item.saved }} / ${{ item.goal }}</p>
                    <button class="transparant" @click="openEditModal(item)">✏️</button>
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

</style>