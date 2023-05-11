<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import api from '@/axios/api'

interface Props {
    label?: string,
    modelValue?: string,
    type: string,
    placeholder?: string,
    errors?: object,
    editing?: boolean
}

interface Invoice {
    number: String
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
    emits('update:modelValue', (e.target as HTMLInputElement).value)
};

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

if(props.editing !== true){
    getLastInvoice()
}

function getLastInvoice(){
    api.get('/api/invoices/get/last')
        .then(res => setInvoiceNumber(res.data.data))
        .catch(error => console.log(error))
}

function setInvoiceNumber(invoice: Invoice){
    value.value = invoice ? (Number(invoice.number) + 1).toString() : new Date().getFullYear().toString() + '00001'
}
</script>

<template>
    <label v-if="label" class="form-label">
        {{ label }}
    </label>
    <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="form-control"
        @input="updateValue"
    />
    <div v-if="errors">
        <div v-for="error in errors">
            {{ error }}
        </div>
    </div>
</template>