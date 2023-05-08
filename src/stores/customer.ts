import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/axios/api'

export const useCustomerStore = defineStore( 'customer', () => {
    interface Customer {
        id: number,
        name: string,
        city: string,
        address: string
    }

    const customers = ref<Customer[] | null>(null)

    function getCustomers(filter = '') {
        api.get('/api/customers' + '?filter=' + filter)
            .then(res => customers.value = res.data.data)
            .catch(error => console.log(error))
    }

    return {customers, getCustomers}
})