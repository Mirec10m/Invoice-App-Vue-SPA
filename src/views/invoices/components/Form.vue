<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import FormSupplier from '@/views/invoices/components/FormSupplier.vue'
import Input from '@/components/form/Input.vue'
import InvoiceNumberInput from '@/views/invoices/components/InvoiceNumberInput.vue'

const customerStore = useCustomerStore()
customerStore.getCustomers()
const {customers} = storeToRefs(customerStore)

defineEmits(['submit'])
const props = defineProps(['errors', 'data', 'editing'])
const data = props.data ? toRef(props, 'data') : ref({})

function setDueDate(){
    if(data.value.issued_at && data.value.due_days){
        const date = new Date(data.value.issued_at)
        const days = parseInt(data.value.due_days)
        date.setDate(date.getDate() + days)

        data.value.due_at = [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
        ].join('-')
    }
}

function setDueDays(){
    if(data.value.issued_at && data.value.due_at){
        const issuedAt = new Date(data.value.issued_at).getTime()
        const dueAt = new Date(data.value.due_at).getTime()
        const diffTime = Math.abs(dueAt - issuedAt)
        data.value.due_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
}
</script>

<template>
    <div class="invoice-form container">
        <div class="row mb-3 g-3 align-items-center">
            <div class="col-auto">
                <label class="col-form-label-lg">Faktúra č.:</label>
            </div>
            <div class="col-auto">
                <InvoiceNumberInput
                    type="text"
                    v-model="data.number"
                    :errors="errors.number"
                    :editing="editing"
                />
            </div>
        </div>

        <div class="card p-4 mb-3">
            <div class="row">
                <div class="col-6">
                    <div class="mb-5">
                        <label class="form-label">Zákazník</label>

                        <VueSelect
                            v-model="data.customer_id"
                            label="name"
                            :reduce="customer => customer.id"
                            :options="customers"
                            placeholder="Vyberte zákazníka"
                        />

                        <div v-if="errors && errors.customer_id">
                            <div v-for="error in errors.customer_id">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-3 offset-3">
                    <div class="text-end">
                        <label class="form-label">Dodávateľ</label>
                    </div>

                    <FormSupplier />
                </div>
            </div>

            <div class="row mb-5">
                <div class="col-3">
                    <div class="mb-3">
                        <label class="form-label">Dátum vystavenia</label>
                        <VueDatePicker
                            v-model="data.issued_at"
                            @update:model-value="setDueDate"
                            model-type="yyyy-MM-dd"
                            :format="'dd. MM. yyyy'"
                            :enable-time-picker="false"
                            auto-apply
                        />

                        <div v-if="errors && errors.issued_at">
                            <div v-for="error in errors.issued_at">
                                {{ error }}
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Dátum dodania</label>
                        <VueDatePicker
                            v-model="data.delivered_at"
                            model-type="yyyy-MM-dd"
                            :format="'dd. MM. yyyy'"
                            :enable-time-picker="false"
                            auto-apply
                        />

                        <div v-if="errors && errors.delivered_at">
                            <div v-for="error in errors.delivered_at">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="mb-3">
                        <label class="form-label">Splatnosť</label>
                        <input @change="setDueDate" v-model="data.due_days" type="text" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Dátum splatnosti</label>
                        <VueDatePicker
                            v-model="data.due_at"
                            @update:model-value="setDueDays"
                            model-type="yyyy-MM-dd"
                            :format="'dd. MM. yyyy'"
                            :enable-time-picker="false"
                            auto-apply
                        />

                        <div v-if="errors && errors.due_at">
                            <div v-for="error in errors.due_at">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-3">
                    <div class="mb-5">
                        <InvoiceNumberInput
                            label="Variabilný symbol"
                            type="text"
                            v-model="data.variable_symbol"
                            :errors="errors.variable_symbol"
                            :editing="editing"
                        />

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">IBAN</label>
                        <input type="text" class="form-control" value="SK0211000000002949043065">
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-4 mb-3">
            <div class="row mb-3">
                <div class="col-1">
                    <label class="form-label">Č.</label>
                </div>
                <div class="col-8">
                    <label class="form-label">Názov položky</label>
                </div>
                <div class="col-3">
                    <label class="form-label">Cena</label>
                </div>
            </div>

            <div class="row">
                <div class="col-1">
                    1.
                </div>
                <div class="col-8">
                    <Input
                        type="text"
                        v-model="data.item"
                        :errors="errors.item"
                    />
                </div>
                <div class="col-3">
                    <Input
                        type="text"
                        v-model="data.sum"
                        :errors="errors.sum"
                    />
                </div>
            </div>
        </div>

        <div class="card p-4 mb-3">
            <div class="row">
                <div class="col-6 offset-6">
                    <div class="row">
                        <div class="col-6">
                            Spolu
                        </div>
                        <div class="col-6 text-right">
                            <div class="invoice-form-sum">
                                {{ data.sum }}
                                EUR
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button @click="$emit('submit', data)" class="btn btn-primary">
                Uložiť
            </button>
        </div>
    </div>
</template>