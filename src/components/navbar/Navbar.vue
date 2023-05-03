<script setup>
import LogoutButton from '@/components/navbar/LogoutButton.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const {user} = storeToRefs(auth)
</script>

<template>
    <nav class="navbar navbar-expand-lg border-bottom">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <img src="/img/sign.svg" alt="logo" class="img-fluid logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'invoices.index' }" class="nav-link">Faktúry</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'customers.index' }" class="nav-link">Partneri</router-link>
                    </li>
                </ul>

                <div class="d-flex">
                    <div class="dropdown">
                        <div class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ user.company_name }}
                        </div>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="#">
                                    <font-awesome-icon icon="gear" class="mr-5" />
                                    Nastavenia
                                </a>
                            </li>
                            <li><LogoutButton/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>