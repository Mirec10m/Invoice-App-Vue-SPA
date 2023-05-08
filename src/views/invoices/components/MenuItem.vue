<script setup lang="ts">
import { toRef } from 'vue'
import api from '@/axios/api'

interface Invoice {
    id: number,
    number: string,
    formatted_created_at?: string,
    formatted_sum?: string,
    customer?: {
        name: string
    }
}

interface Props {
    item: Invoice
}

const props = defineProps<Props>()
const invoice = toRef(props, 'item')

defineEmits(['setDeleteInvoice'])

function download(id: Number){
    api.get('/api/invoices/pdf/' + id, {responseType: 'arraybuffer'})
        .then(res => {
            let blob = new Blob([res.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'FA_' + invoice.value.number + '.pdf'
            link.click()
        })
        .catch(error => console.log(error))
}
</script>

<template>
    <router-link :to="{ name: 'invoices.edit', params: { id: invoice.id } }" class="list-group-item list-group-item-action py-3 lh-sm">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <div class="mb-1 small">{{ invoice.number }} | {{ invoice.formatted_created_at }}</div>

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle custom-dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <font-awesome-icon icon="grip-vertical" />
                </button>
                <ul class="dropdown-menu menu-items">
                    <li>
                        <button @click.prevent="download(invoice.id)" type="button" class="dropdown-item">
                            <font-awesome-icon icon="download" class="mr-5" />
                            Stiahnuť PDF
                        </button>
                    </li>
                    <hr>
                    <li>
                        <button @click.prevent="$emit('setDeleteInvoice', invoice)" type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteInvoiceModal" data-bs-id="{{ invoice.id }}">
                            <font-awesome-icon icon="trash-can" class="mr-5" />
                            Vymazať
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="mb-1 small bold">
            {{ invoice.customer ? invoice.customer.name : '' }}
        </div>

        <div class="text-right">
            {{ invoice.formatted_sum }} €
        </div>

    </router-link>
</template>