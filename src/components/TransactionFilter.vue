<script setup>
import { startOfDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ref, watch } from 'vue';

const props = defineProps({
  categories: Array,
  selectedCategory: [String, Number],
  startOfDay: String,
  endOfDay: String,
});

const emits = defineEmits(['update:filter']);

const localCategory = ref(props.selectedCategory || '');
const localStartOfDay = ref(props.startOfDay || '');
const localEndOfDay = ref(props.endOfDay || '');


watch([localCategory, localStartOfDay, localEndOfDay], () => {
  emits('update:filter', {
    category: localCategory.value,
    startOfDay: localStartOfDay.value,
    endOfDay: localEndOfDay.value,
  });
});

</script>


<template>
    <div class="filter">
        <select v-model="localCategory">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id" class="capitalize">
            {{ category.name}}
            </option>
        </select>
    
        <input
            type="date"
            v-model="localStartOfDay"
            :placeholder="new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' })"
        />
    
        <input
            type="date"
            v-model="localEndOfDay"
            :placeholder="new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' })"
        />
    </div>
</template>


<style scoped>

.filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
select, input[type="date"] {
  padding: 5px;
  font-size: 16px;
}
select {
  width: 150px;
}
input[type="date"] {
  width: 200px;
}
.capitalize {
  text-transform: capitalize;
}


</style>
 