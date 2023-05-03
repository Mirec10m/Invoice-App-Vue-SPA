<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import { useRouter } from 'vue-router'
import api from '@/axios/api'

const customerStore = useCustomerStore()
const router = useRouter()

defineProps(['customer'])

function deleteCustomer(id: any){
    api.delete('/api/customers/' + id)
        .then(res => {
            document.getElementById('deleteCustomerModalClose')!.click()
            customerStore.getCustomers()
            router.push({name: 'customers.index'})
        })
        .catch(error => console.log(error))
}
</script>

<template>
    <div class="modal fade" id="deleteCustomerModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <font-awesome-icon icon="trash-can" class="mr-5" />
                        Vymazať záznam
                    </h1>
                    <button id="deleteCustomerModalClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Naozaj chcete vymazať partnera -
                    <b>{{ customer.name }}</b>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zrušiť</button>
                    <button @click="deleteCustomer(customer.id)" type="button" class="btn btn-danger">Vymazať</button>
                </div>
            </div>
        </div>
    </div>
</template>