<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import Input from '@/components/form/Input.vue'

defineEmits(['submit'])
const props = defineProps(['errors', 'data', 'editing', 'customer'])
const data = props.data ? toRef(props, 'data') : ref({})

const heading = computed(() => {
    return props.editing ? 'Editovať partnera - ' + props.customer.name : 'Nový partner'
})
</script>

<template>
    <div class="invoice-form container">
        <div class="row mb-3 g-3 align-items-center">
            <div class="col-auto">
                <label class="col-form-label-lg">
                    {{ heading }}
                </label>
            </div>
        </div>

        <div class="card p-4 mb-3">
            <div class="card-title bold mb-3">
                Fakturačné údaje
            </div>

            <div class="row">
                <div class="col-5">
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <Input
                                    label="Názov firmy"
                                    type="text"
                                    v-model="data.name"
                                    :errors="errors.name"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <Input
                                    label="Adresa"
                                    type="text"
                                    v-model="data.address"
                                    :errors="errors.address"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="mb-3">
                                <Input
                                    label="PSČ"
                                    type="text"
                                    v-model="data.postal_code"
                                    :errors="errors.postal_code"
                                />
                            </div>
                        </div>

                        <div class="col-8">
                            <div class="mb-3">
                                <Input
                                    label="Mesto / Obec"
                                    type="text"
                                    v-model="data.city"
                                    :errors="errors.city"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="mb-3">
                            <Input
                                label="Krajina"
                                type="text"
                                v-model="data.country"
                                :errors="errors.country"
                            />
                        </div>
                    </div>
                </div>

                <div class="col-5 offset-1">
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <Input
                                    label="IČO"
                                    type="text"
                                    v-model="data.business_id"
                                    :errors="errors.business_id"
                                />
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="mb-3">
                                <Input
                                    label="DIČ"
                                    type="text"
                                    v-model="data.tax_id"
                                    :errors="errors.tax_id"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <Input
                                    label="IČ DPH"
                                    type="text"
                                    v-model="data.vat_id"
                                    :errors="errors.vat_id"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-4 mb-3">
            <div class="card-title bold mb-3">
                Kontaktné údaje
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="mb-3">
                        <Input
                            label="E-mail"
                            type="text"
                            v-model="data.email"
                            :errors="errors.email"
                        />
                    </div>
                </div>

                <div class="col-4">
                    <div class="mb-3">
                        <Input
                            label="Telefón"
                            type="text"
                            v-model="data.phone"
                            :errors="errors.phone"
                        />
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