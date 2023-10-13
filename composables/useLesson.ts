import { StorageSerializers } from "@vueuse/core";
import { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) => {
  // Use SessionStorage to cache the lesson data
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    //By passing null as default it can't automatically determine which serializer to use
    serializer: StorageSerializers.object,
  });

  /* OPTIONS: */

  /*  const { data, error } = await useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  ); */

  /* const { data, error } = await useAsyncData(() =>
    $fetch(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
  ); */

  if (!lesson.value) {
    const { data, error } = await useFetch<LessonWithPath>(url, {
      // pick: ["title", "number"],
      //   lazy: true,
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
      });
    }

    lesson.value = data.value;
  } else {
    console.log(
      `Getting lesson ${lessonSlug} in chapter ${chapterSlug} from cache`
    );
  }

  return lesson;
};
