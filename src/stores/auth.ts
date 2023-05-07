import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios/api'

export const useAuthStore = defineStore('user', () => {
    const router = useRouter()

    const preloading = ref(false)
    const authenticated = ref(false)

    interface User {
        company_name?: string,
        company_address?: string,
        company_postal_code?: string,
        company_city?: string,
        company_country?: string,
        business_id?: string,
        tax_id?: string,
        vat?: string,
    }
    const user = ref<User>({})

    interface Errors {
        email?: Object,
        password?: Object
    }
    const errors = ref<Errors>({})

    const redirect = ref('/')

    function setRedirect(value: string) {
        redirect.value = value
    }

    function setPreloading(value: boolean) {
        preloading.value = value
    }

    function redirectIfAuthenticated() {
        api.get('/api/user')
            .then(res => {
                user.value = res.data
                if (user.value) {
                    authenticated.value = true
                    router.push(redirect.value)
                }

                preloading.value = false
            })
            .catch(error => void(0))
    }

    function login(data: { email: string, password: string }) {
        api.get('/sanctum/csrf-cookie')
            .then(res => {
                api.post('/login', data)
                    .then(res => {
                        user.value = res.data.user
                        authenticated.value = true

                        router.push(redirect.value)
                        errors.value = {}
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            errors.value = error.response.data.errors
                        }
                    })

            })
    }

    function logout() {
        api.post('/logout')
            .then(res => {
                user.value = {}
                authenticated.value = false
                redirect.value = '/'

                router.push({name: 'login'})
            })
    }

    return {user, authenticated, preloading, errors, login, logout, setRedirect, redirectIfAuthenticated, setPreloading}
})