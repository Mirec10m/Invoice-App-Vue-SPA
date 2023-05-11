<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
    label?: string,
    modelValue?: string,
    type: string,
    placeholder?: string,
    errors?: object,
    required?: boolean
}

defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
    emits('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<template>
    <label v-if="label" class="form-label">
        {{ label }}
        <span v-if="required" class="error-color">*</span>
    </label>
    <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :class="['form-control', errors ? 'error-border' : '']"
        @input="updateValue"
    />
    <div v-if="errors">
        <div v-for="error in errors" class="error-color">
            {{ error }}
        </div>
    </div>
</template>