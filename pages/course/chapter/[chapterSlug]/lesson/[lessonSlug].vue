<template>
    <div class="text-center">
        <h3 class="fw-bold">{{ chapter.title }} - Lesson {{ lesson.number }}</h3>
        <h2 class="fw-bold my-4">{{ lesson.title }}</h2>
    </div>

    <VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />

    <p class="my-3">{{ lesson.text }}</p>

    <div class="d-flex justify-content-around">
        <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="toggleComplete" />
        <button class="btn btn-danger" @click="sendToError()">
            Error button
        </button>
    </div>
</template>

<script setup>
import useLesson from '~/composables/useLesson';

const course = await useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug, lessonSlug);

definePageMeta({
    middleware: [
        async function ({ params }, from) {
            const course = await useCourse();

            const chapter = course.value.chapters.find(
                (chapter) => chapter.slug === params.chapterSlug
            );

            if (!chapter) {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Chapter not found',
                    })
                );
            }

            const lesson = chapter.lessons.find(
                (lesson) => lesson.slug === params.lessonSlug
            );

            if (!lesson) {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Lesson not found',
                    })
                );
            }
        },

        'auth',
    ],
});

const chapter = computed(() => {
    return course.value.chapters.find(
        (chapter) => chapter.slug === route.params.chapterSlug
    );
});

const title = computed(() => {
    return `${lesson.value.title} - ${course.value.title}`;
})
useHead({
    title,
});

const progress = useLocalStorage('progress', []);

const isLessonComplete = computed(() => {
    if (!progress.value[chapter.value.number - 1]) {
        return false;
    }

    if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
        return false;
    }

    return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});

const toggleComplete = () => {
    if (!progress.value[chapter.value.number - 1]) {
        progress.value[chapter.value.number - 1] = [];
    }
    progress.value[chapter.value.number - 1][lesson.value.number - 1] = !isLessonComplete.value;
}

const sendToError = () => {
    throw createError('Scemo chi legge!')
}
</script>