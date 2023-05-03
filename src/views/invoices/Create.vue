<script setup lang="ts">
import { ref } from 'vue'
import { useInvoiceStore } from '@/stores/invoice'
import { useRouter } from 'vue-router'
import api from '@/axios/api'
import Form from '@/views/invoices/components/Form.vue'

const invoiceStore = useInvoiceStore()
const router = useRouter()
const errors = ref({})

function create(data: Object){
    api.post('/api/invoices', data)
        .then(res => {
            invoiceStore.getInvoices()
            invoiceStore.getSum()
            router.push({name: 'invoices.edit', params: {id: res.data.id}})
        })
        .catch(error => {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        })
}
</script>

<template>
    <Form
        :errors="errors"
        @submit="create"
    />
</template>