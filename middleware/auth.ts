export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  if (user.value || to.params.chapterSlug === "1-chapter-1") {
    return;
  }
  console.log("to path: ", to.path);

  return navigateTo(`/login?redirectTo=${to.path}`);
});
