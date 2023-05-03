<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const {errors} = storeToRefs(auth)

const data = ref({
    email: "user@test.com",
    password: "secret"
})
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card login-card">
                    <div class="card-body p-5">
                        <h1 class="card-title mb-4 text-center">Prihlásenie</h1>

                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input name="email" type="email" v-model="data.email" class="form-control">
                            <div v-if="errors && errors.email">
                                <div v-for="error in errors.email">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="password" class="form-label">Heslo</label>
                            <input name="password" type="password" v-model="data.password" class="form-control">
                            <div v-if="errors && errors.password">
                                <div v-for="error in errors.password">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <button @click="auth.login(data)" class="btn btn-primary">
                            Prihlásiť sa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>