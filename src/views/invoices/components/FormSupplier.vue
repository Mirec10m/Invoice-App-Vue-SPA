<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
</script>

<template>
    <div class="invoice-form-owner">
        <div>{{ user.company_name }}</div>
        <div>
            {{ user.company_address }},
            {{ user.company_postal_code }}
            {{ user.company_city }},
            {{ user.company_country }}
        </div>
        <div>IČO: {{ user.business_id }}</div>
        <div>DIČ: {{ user.tax_id }}</div>
        <small>{{ user.vat ? 'Platiteľ DPH' : 'Nie je platiteľ DPH' }}</small>
    </div>
</template>