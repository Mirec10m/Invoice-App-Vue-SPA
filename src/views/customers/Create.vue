<script setup lang="ts">
import { ref } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import { useRouter } from 'vue-router'
import api from '@/axios/api'
import Form from '@/views/customers/components/Form.vue'

const customerStore = useCustomerStore()
const router = useRouter()
const errors = ref({})

function create(data: Object){
    api.post('/api/customers', data)
        .then(res => {
            customerStore.getCustomers()
            router.push({name: 'customers.edit', params: {id: res.data.id}})
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