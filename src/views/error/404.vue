<script setup lang="ts">

</script>

<template>
    <div class="not-found">
        <div class="not-found-heading">
            404
        </div>
        <div class="not-found-subheading">
            Stránka sa nenašla!
        </div>
        <router-link :to="{ name: 'home' }" class="btn btn-primary not-found-link">
            <font-awesome-icon icon="arrow-left" class="mr-5" />
            Späť na úvodnú stránku aplikácie
        </router-link>
    </div>
</template>