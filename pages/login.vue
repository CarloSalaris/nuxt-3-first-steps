<template>
    <div class="bg-light h-100 border rounded-4 px-1 py-5 text-center">
        <h1>Log in to {{ course.title }}</h1>
        <NuxtLink class="btn btn-primary my-3" :to="firstLesson.path">
            Go to the lessons page
        </NuxtLink>

        <button class="btn btn-success mx-3" @click="login">
            Login with Github
        </button>
    </div>
</template>

<script setup lang="ts">
const course = await useCourse();
const { query } = useRoute();
const firstLesson = await useFirstLesson();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
    if (user.value) {
        await navigateTo(query.redirectTo as string, {
            replace: true,
        });
    }
});

const login = async () => {
    const redirectTo = `${window.location.origin}${query.redirectTo}`;
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo },
    });

    if (error) {
        console.error(error);
    }
};
</script> 