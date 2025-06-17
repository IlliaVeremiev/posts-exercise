<template>
  <div class="post-card">
    <div class="tw-flex tw-justify-between tw-mb-1">
      <span class="tw-font-bold tw-text-base">{{ post.title }}</span>
      <q-icon name="svguse:icons/edit.svg|0 0 15 15" />
    </div>
    <div class="tw-font-normal tw-text-sm tw-line-clamp-3 post-card-body">
      {{ post.body }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from 'src/models/post';

defineProps<{
  post: Post
}>();

</script>
