<template>
    <div v-if="user" class="rounded p-2 bg-white d-flex justify-content-center">
        <div class="d-flex align-items-center">
            <img class="rounded-circle border border-primary border-2 me-3" style="width: 60px; height: 60px;"
                :src="profile" alt="profile picture">
        </div>

        <div class="d-flex flex-column justify-content-between text-right">
            <div> {{ name }}</div>
            <button class="btn btn-warning py-0" @click="logout">
                Log out
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const logout = async () => {
    const { error } = await auth.signOut();

    if (error) {
        console.error(error);
        return;
    }

    try {
        await $fetch('/api/_supabase/session', {
            method: 'POST',
            body: { event: 'SIGNED_OUT', session: null },
        });
        user.value = null;
    } catch (e) {
        console.error(error);
    }

    await navigateTo('/login');
}

const name = computed(
    () => user.value?.user_metadata.full_name
);
const profile = computed(
    () => user.value?.user_metadata.avatar_url
);
</script>