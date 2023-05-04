import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/axios/api'

export const useInvoiceStore = defineStore( 'invoice', () => {
    const invoices = ref(null)
    const sum = ref(0)

    function getInvoices(filter = '') {
        api.get('/api/invoices' + '?filter=' + filter)
            .then(res => invoices.value = res.data.data)
            .catch(error => console.log(error))
    }

    function getSum(filter = '') {
        api.get('/api/invoices/get/sum' + '?filter=' + filter)
            .then(res => sum.value = res.data)
            .catch(error => console.log(error))
    }

    return {invoices, sum, getInvoices, getSum}
})