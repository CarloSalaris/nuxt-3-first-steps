<template>
    <div>
        <div class="text-center mb-2">
            <div class="d-flex justify-content-around">
                <h1 class="text-center mb-5"><strong>{{ course.title }}</strong></h1>
                <UserCard />
            </div>
            <NuxtLink class="btn btn-primary" to="/">
                Torna alla home
            </NuxtLink>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-xl-3 p-2">
                <div class="bg-light h-100 border rounded-4 px-1 py-5">
                    <h3 class="text-center fw-bold">Chapters</h3>
                    <div class="p-2 my-4" v-for="chapter in course.chapters" :key="chapter.slug">
                        <h4>{{ chapter.title }}</h4>
                        <NuxtLink class="d-flex text-decoration-none mb-1 px-2 py-1"
                            v-for="(lesson, index) in chapter.lessons" :key="lesson.slug" :to="lesson.path"
                            :class="(lesson.path === $route.fullPath) ? 'text-secondary border rounded' : 'text-dark'">
                            <span>{{ index + 1 }}.</span>
                            <span>{{ lesson.title }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8 col-xl-9 p-2">
                <div class="bg-light h-100 border rounded-4 px-3 py-5">
                    <NuxtErrorBoundary>
                        <NuxtPage />
                        <template #error="{ error }">
                            <div class="h-100 d-flex align-items-center justify-content-center">
                                <div class="text-center">
                                    <p>
                                        Oh no, something went wrong with the lesson! <br>
                                        <code>{{ error }}</code>
                                    </p>
                                    <button class="btn btn-primary" @click="resetError(error)">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </template>
                    </NuxtErrorBoundary>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const course = await useCourse();
const firstLesson = await useFirstLesson();

const resetError = async (error) => {
    await navigateTo(firstLesson.path);
    error.value = null;
};
/* definePageMeta({
    layout: false,
    or
    layout: nomeLayout,
}); */
</script>

<style lang="scss" scoped></style>