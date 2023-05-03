<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customer'
import api from '@/axios/api'
import Form from '@/views/customers/components/Form.vue'

const customerStore = useCustomerStore()
const route = useRoute()
const customer = ref({})
const data = ref({})
const errors = ref({})

getCustomer(route.params.id as string)

watch(
    () => route.params.id,
    (id) => {
        if (id) getCustomer(id as string)
    }
)

function getCustomer(id: string){
    api.get('/api/customers/' + id)
        .then(res => {
            customer.value = {...res.data.data}
            data.value = res.data.data
        })
        .catch(error => {
            console.log('get customer')
            console.log(error)
        })
}

function update(data: any){
    api.put('/api/customers/' + data.id, data)
        .then(res => {
            customerStore.getCustomers()
            customer.value = res.data
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
        :customer="customer"
        @submit="update"
    />
</template>