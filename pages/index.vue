<template>
    <div class="my-5 d-flex text-center justify-content-center">
        <div class="mt-5 p-5">
            <h1 class="mb-4">Hello, World!</h1>
            <NuxtLink class="btn btn-primary" :to="firstLesson.path">
                Go to the lessons page
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>