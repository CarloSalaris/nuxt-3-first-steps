<template>
    <div class="text-center mb-2">
        <h1 class="my-5">Course: <strong>Mastering Nuxt 3</strong></h1>
        <NuxtLink class="btn btn-primary" to="/">
            Torna alla home
        </NuxtLink>
    </div>

    <div class="row">
        <div class="col-12 col-md-4 col-xl-3 p-2">
            <div class="bg-light h-100 border rounded-4 px-1 py-3">
                <h3 class="text-center fw-bold">Chapters</h3>
                <div class="p-2 my-4" v-for="chapter in chapters" :key="chapter.slug">

                    <h4>{{ chapter.title }}</h4>
                    <NuxtLink class="d-flex text-decoration-none mb-1 px-2 py-1" v-for="(lesson, index) in chapter.lessons"
                        :key="lesson.slug" :to="lesson.path"
                        :class="(lesson.path === $route.fullPath) ? 'text-secondary border rounded' : 'text-dark'">
                        <span>{{ index + 1 }}.</span>
                        <span>{{ lesson.title }}</span>
                    </NuxtLink>

                </div>
            </div>
        </div>
        <div class="col-12 col-md-8 col-xl-9 p-2">
            <div class="bg-light border rounded-4 p-3">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup>
const { chapters } = useCourse();
/* definePageMeta({
    layout: false,
    or
    layout: nomeLayout,
}); */
</script>

<style lang="scss" scoped></style>