<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useInvoiceStore } from '@/stores/invoice'
import api from '@/axios/api'
import Form from '@/views/invoices/components/Form.vue'

interface FormData {
    customer_id: Number,
    due_days: Number
}

const invoiceStore = useInvoiceStore()
const route = useRoute()
const data = ref(<FormData>{})
const errors = ref({})

getInvoice(route.params.id as string)

watch(
    () => route.params.id,
    (id) => {
        if (id) getInvoice(id as string)
    }
)

function getInvoice(id: string){
    api.get('/api/invoices/' + id)
        .then(res => {
            // Destructure response to FormData
            const {customer, user, ...invoice} = res.data.data
            data.value = invoice

            // Set customer_id
            if (res.data.data.customer)
                data.value.customer_id = res.data.data.customer.id

            // Set due days
            if(invoice.issued_at && invoice.due_at){
                const issuedAt = new Date(invoice.issued_at).getTime()
                const dueAt = new Date(invoice.due_at).getTime()
                const diffTime = Math.abs(dueAt - issuedAt)
                data.value.due_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            }
        })
        .catch(error => console.log(error))
}

function update(data: any){
    api.put('/api/invoices/' + data.id, data)
        .then(res => {
            invoiceStore.getInvoices()
            invoiceStore.getSum()
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
        :data="data"
        :errors="errors"
        :editing="true"
        @submit="update"
    />
</template>