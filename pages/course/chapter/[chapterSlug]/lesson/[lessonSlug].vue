<template>
    
    <div class="text-center">
        <h3 class="fw-bold">{{ chapter.title }} - Lesson {{ lesson.number }}</h3>
        <h2 class="fw-bold my-4">{{ lesson.title }}</h2>
    </div>
    
    <VideoPlayer
        v-if="lesson.videoId"
        :video-id="lesson.videoId"
    />
    
    <p class="my-3">{{ lesson.text }}</p>

    <LessonCompleteButton
        :model-value="isLessonComplete"
        @update:model-value="toggleComplete"/>

</template>

<script setup>
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.chapterSlug
    );
});

const lesson = computed(() => {
    return chapter.value.lessons.find(
        (lesson) => lesson.slug === route.params.lessonSlug
    );
});

const title = computed(() => {
    return `${lesson.value.title} - ${course.title}`;
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
</script>