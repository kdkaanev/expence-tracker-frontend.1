<template>
  <button
    :class="['btn', variantClass, sizeClass, { disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" }, // primary, secondary, danger
  size: { type: String, default: "md" },        // sm, md, lg
  disabled: { type: Boolean, default: false },
});

// Класове за варианти
const variantClass = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "btn-secondary";
    case "danger":
      return "btn-danger";
    default:
      return "btn-primary";
  }
});

// Класове за размери
const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "btn-sm";
    case "lg":
      return "btn-lg";
    default:
      return "btn-md";
  }
});
</script>

<style scoped>
/* Базов стил */
.btn {
  border-radius: 0.3rem;
  font-weight: 500;
  transition: background 0.2s ease;
  cursor: pointer;

}

/* Варианти */
.btn-primary {
  background: #27ae60;
  color: white;
  border: none;
}
.btn-primary:hover {
  background: #219150;
}

.btn-secondary {
  background: transparent;
  color: #333;
}
.btn-secondary:hover {
  background: #cfcfcf;
}

.btn-danger {
  background: #e63946;
  color: white;
}
.btn-danger:hover {
  background: #c53030;
}

/* Размери */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
.btn-md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Disabled */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
