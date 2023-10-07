<template>
    <NuxtLayout>
        <div class="bg-light h-100 border rounded-4 px-1 py-5 text-center">
            <h1>Ooops...</h1>
            <p>It looks like something went wrong!</p>

            <siv class="d-flex justify-content-center mb-3">
                <div v-if="error.statusCode === 404" class="border rounded rounded-3 p-3">
                    <h1>404</h1>
                    <p>I guess the page does not exist.</p>
                </div>
            </siv>

            <h3 class="mb-5"><strong>{{ error.message }}</strong></h3>

            <a class="btn btn-primary" @click="handleError">
                Go back to the lessons
            </a>
        </div>
    </NuxtLayout>
</template>

<script setup>
const error = useError();
const handleError = () => {
    clearError({
        redirect:
            '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3',
    })
}
</script>
