<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInvoiceStore } from '@/stores/invoice'
import { storeToRefs } from 'pinia'
import MenuItem from '@/views/invoices/components/MenuItem.vue'
import DeleteModal from '@/views/invoices/components/DeleteModal.vue'

const invoiceStore = useInvoiceStore()
const { invoices, sum } = storeToRefs(invoiceStore)

invoiceStore.getInvoices()
invoiceStore.getSum()

const formattedSum = computed(() => {
    let price = sum.value.toFixed(2).replace('.', ',')
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
})

let timer: any = null
const deleteInvoice = ref({})

function setDeleteInvoice(invoice: any){
    deleteInvoice.value = invoice
}

function filterInvoices(event: Event){
    clearTimeout(timer);
    const value = (event.target as HTMLInputElement).value

    timer = setTimeout(() => {
        invoiceStore.getInvoices(value)
        invoiceStore.getSum(value)
    }, 500);
}
</script>

<template>
    <main class="d-flex flex-nowrap min-h-100">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
            <div class="p-4 border-bottom">
                <div class="d-grid gap-2">
                    <router-link :to="{ name: 'invoices.create' }" class="btn btn-primary mb-2">
                        <font-awesome-icon icon="plus" class="mr-5" />
                        Nová faktúra
                    </router-link>
                    <div class="input-group mb-3">
                    <span class="input-group-text">
                        <font-awesome-icon icon="search" />
                    </span>
                        <input @keyup="filterInvoices" type="text" class="form-control" placeholder="Hľadať">
                    </div>
                </div>
            </div>

            <div class="summary p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="summary-label">Spolu</div>
                    <div class="summary-sum">{{ formattedSum }} €</div>
                </div>
            </div>

            <div class="list-group list-group-flush border-bottom scrollarea">
                <MenuItem
                    v-for="invoice in invoices"
                    :item="invoice"
                    :key="invoice.id"
                    @setDeleteInvoice="setDeleteInvoice"
                />
            </div>
        </div>

        <div class="content">
            <RouterView />
        </div>
    </main>

    <DeleteModal :invoice="deleteInvoice" />
</template>