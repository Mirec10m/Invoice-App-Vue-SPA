<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const {preloading} = storeToRefs(auth)
</script>

<template>
    <div v-if="preloading" class="page-loader"></div>
    <RouterView v-else />
</template>