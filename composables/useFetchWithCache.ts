import { StorageSerializers } from "@vueuse/core";

export default async <T>(url: string) => {
  // Use SessionStorage to cache the lesson data
  const cached = useSessionStorage<T>(url, null, {
    //By passing null as default it can't automatically determine which serializer to use
    serializer: StorageSerializers.object,
  });
  //<T> -> generic type

  /* OPTIONS: */
  /*  const { data, error } = await useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  ); */
  /* const { data, error } = await useAsyncData(() =>
    $fetch(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
  ); */

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, {
      // pick: ["title", "number"],
      //   lazy: true,
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }

    cached.value = data.value as T;
  } else {
    console.log(`Getting value from cached ${url}`);
  }

  return cached;
};
