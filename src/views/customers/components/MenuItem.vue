<script setup lang="ts">
import { toRef } from 'vue'

interface Props {
    item: Object
}

const props = defineProps<Props>()
const customer = toRef(props, 'item')

defineEmits(['setDeleteCustomer'])
</script>

<template>
    <router-link :to="{ name: 'customers.edit', params: { id: customer.id } }" class="list-group-item list-group-item-action py-3 lh-sm">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <div class="overflow-dots mb-1 bold">
                {{ customer.name }}
            </div>

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle custom-dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <font-awesome-icon icon="grip-vertical" />
                </button>
                <ul class="dropdown-menu menu-items">
                    <li>
                        <button @click.prevent="$emit('setDeleteCustomer', customer)" type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteCustomerModal" data-bs-id="{{ customer.id }}">
                            <font-awesome-icon icon="trash-can" class="mr-5" />
                            Vymazať
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="mb-1 small">
            <div class="overflow-dots">
                {{ customer.city }},
                {{ customer.address }}
            </div>
        </div>
    </router-link>
</template>