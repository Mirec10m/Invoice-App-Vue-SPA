<script setup lang="ts">
import { ref } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import MenuItem from '@/views/customers/components/MenuItem.vue'
import DeleteModal from '@/views/customers/components/DeleteModal.vue'

const customerStore = useCustomerStore()
const {customers} = storeToRefs(customerStore)

customerStore.getCustomers()

let timer: any = null
const deleteCustomer = ref({})

function setDeleteCustomer(customer: any){
    deleteCustomer.value = customer
}

function filterCustomers(event: Event){
    clearTimeout(timer);

    timer = setTimeout(() => {
        customerStore.getCustomers((event.target as HTMLInputElement).value)
    }, 500);
}
</script>

<template>
    <main class="d-flex flex-nowrap min-h-100">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
            <div class="p-4 border-bottom">
                <div class="d-grid gap-2">
                    <router-link :to="{ name: 'customers.create' }" class="btn btn-primary mb-2">
                        <font-awesome-icon icon="plus" class="mr-5" />
                        Nový partner
                    </router-link>
                    <div class="input-group mb-3">
                    <span class="input-group-text">
                        <font-awesome-icon icon="search" />
                    </span>
                        <input @keyup="filterCustomers" type="text" class="form-control" placeholder="Hľadať">
                    </div>
                </div>
            </div>

            <div class="list-group list-group-flush border-bottom scrollarea">
                <MenuItem
                    v-for="customer in customers"
                    :item="customer"
                    :key="customer.id"
                    @setDeleteCustomer="setDeleteCustomer"
                />
            </div>
        </div>

        <div class="content">
            <RouterView />
        </div>
    </main>

    <DeleteModal :customer="deleteCustomer" />
</template>