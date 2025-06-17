<template>
  <q-card v-ripple class="post-card" @click="emit('edit', post)">
    <div class="tw-flex tw-justify-between tw-mb-1">
      <span class="tw-font-bold tw-text-base">{{ post.title }}</span>
      <q-icon name="svguse:icons/edit.svg|0 0 15 15" />
    </div>
    <div class="tw-font-normal tw-text-sm tw-line-clamp-3 post-card-body">
      {{ post.body }}
    </div>

    <!--  TODO add router links for each tag in post.tags  -->
    <!--  TODO add icons with counter for views/likes/dislikes  -->
  </q-card>
</template>

<script setup lang="ts">
import type { Post } from 'src/models/post';

defineProps<{
  post: Post
}>();

const emit = defineEmits<{
  (e: 'edit', value: Post): void
}>();

</script>
