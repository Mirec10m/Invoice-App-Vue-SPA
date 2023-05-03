import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/axios/api'

export const useCustomerStore = defineStore( 'customer', () => {
    const customers = ref(null)

    function getCustomers(filter = '') {
        api.get('/api/customers' + '?filter=' + filter)
            .then(res => customers.value = res.data.data)
            .catch(error => console.log(error))
    }

    return {customers, getCustomers}
})