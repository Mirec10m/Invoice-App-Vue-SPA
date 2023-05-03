<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
    <button @click="auth.logout" class="dropdown-item">
        <font-awesome-icon icon="right-from-bracket" class="mr-5" />
        Odhlásiť sa
    </button>
</template>