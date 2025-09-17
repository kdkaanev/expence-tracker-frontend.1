<script setup>
    import HorizontalBar from '../components/charts/HorizontalBar.vue';

    import Button from '../components/ui/Button.vue';
    import { computed } from 'vue';

    const potsData = [
        { pot: 'Vacation', goal: 2000, saved: 500 },
        { pot: 'Emergency Fund', goal: 5000, saved: 1200 },
        { pot: 'New Car', goal: 15000, saved: 8000 },
        { pot: 'Home Renovation', goal: 7000, saved: 3500 },
    ];


    const potStatus = (pot) => {
        const potInfo = potsData.find(p => p.pot === pot);
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
        <section class="container">
            <div class="grid">
                <div v-for="item in potsData" :key="item.pot" class="pot-card">
                    <h3>{{ item.pot }}</h3>
                    <p>${{ item.saved }} / ${{ item.goal }}</p>
                    <HorizontalBar
                        :firsst-value="potStatus(item.pot).progress"
                        first-color="#3b82f6"
                        second-color="#d1d5db"
                    />
                    <p>{{ potStatus(item.pot).remaining }} remaining</p>

                    <Button variant="primary">Add Funds</Button>
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

</style>