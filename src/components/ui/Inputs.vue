<template>
  <div class="input-group">
    <label v-if="label" class="input-label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <span v-if="icon" class="input-icon">
        <i :class="icon"></i>
      </span>
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="model"
        :class="['input-field', { 'input-error': error, 'with-icon': icon }]"
      />
    </div>
    <p v-if="error" class="input-error-text">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
  error: String,
  icon: String, // напр. "fas fa-envelope"
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped>

.input-group {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #333;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  top: 40%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #888;
  font-size: 1rem;
  pointer-events: none;
}

.input-field {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field.with-icon {
  padding-left: 2.5rem; /* повече място за иконата */
}

.input-field:focus {
  outline: none;
  border-color: #27ae60;
  box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.25);
}

.input-error {
  border-color: #e63946;
}

.input-error:focus {
  box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.25);
}

.input-error-text {
  color: #e63946;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>