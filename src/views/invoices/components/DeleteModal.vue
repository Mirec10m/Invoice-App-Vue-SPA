<script setup lang="ts">
import { useInvoiceStore } from '@/stores/invoice'
import { useRouter } from 'vue-router'
import api from '@/axios/api'

const invoiceStore = useInvoiceStore()
const router = useRouter()

defineProps(['invoice'])

function deleteInvoice(id: any){
    api.delete('/api/invoices/' + id)
        .then(res => {
            document.getElementById('deleteInvoiceModalClose')!.click()
            invoiceStore.getInvoices()
            invoiceStore.getSum()
            router.push({name: 'invoices.index'})
        })
        .catch(error => console.log(error))
}
</script>

<template>
    <div class="modal fade" id="deleteInvoiceModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <font-awesome-icon icon="trash-can" class="mr-5" />
                        Vymazať záznam
                    </h1>
                    <button id="deleteInvoiceModalClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Naozaj chcete vymazať faktúru -
                    <b>č. {{ invoice.number }}</b>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zrušiť</button>
                    <button @click="deleteInvoice(invoice.id)" type="button" class="btn btn-danger">Vymazať</button>
                </div>
            </div>
        </div>
    </div>
</template>