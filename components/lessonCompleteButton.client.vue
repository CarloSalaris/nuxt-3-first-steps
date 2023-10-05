<template>
    <div class="text-center">
        <button
            class="btn"
            :class="modelValue ? 'btn-success' : 'btn-primary'"
            @click="() => $emit('update:modelValue', !modelValue)"
            >
            {{ modelValue ? `Completed!` : `Mark as Complete`}}
        </button>
    </div>
</template>

<script setup>

defineProps({
    modelValue:{
        type: Boolean,
        default: false,
    },
});

defineEmits(['update:modelValue']);

</script>
