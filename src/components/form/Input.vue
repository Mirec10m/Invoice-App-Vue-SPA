<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
    label?: string,
    modelValue?: string,
    type: string,
    placeholder?: string,
    errors?: object
}

defineProps<Props>()
defineEmits(['update:modelValue'])

</script>

<template>
    <label v-if="label" class="form-label">
        {{ label }}
    </label>
    <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-control"
    />
    <div v-if="errors">
        <div v-for="error in errors">
            {{ error }}
        </div>
    </div>
</template>