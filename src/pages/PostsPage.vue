<template>
  <q-page padding>
    <div class="tw-flex tw-justify-between tw-flex-nowrap tw-mb-1">
      <span class="tw-font-bold tw-text-xl tw-break-all">{{ $t('posts.pageTitle')}}</span>
      <q-btn
        :label="$t('posts.addPostButton')"
        no-caps
        flat
        text-color="primary"
        :ripple="false"
        padding="0"
        class="no-hover"
      />

    </div>
    <q-infinite-scroll
      @load="onLoad"
      :offset="250"
      class="tw-flex tw-flex-col tw-gap-2.5"
    >

      <template v-if="posts === null">
        <q-skeleton
          v-for="i in 8"
          :key="i"
          height="100px"
          bordered
          animation="fade"
          class="post-card"
        />
      </template>

      <post-card
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-tail color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>
<script setup lang="ts">
import api from 'src/api';
import { ref } from 'vue';
import type { Post } from 'src/models/post';
import PostCard from 'components/posts/PostCard.vue';
import { POSTS_CHUNK_SIZE } from 'src/utils/constants';

const posts = ref<Post[] | null>(null);

async function onLoad(index: number, done: (stop?: boolean) => void) {
  const response = await api.getPosts(POSTS_CHUNK_SIZE, (index - 1) * POSTS_CHUNK_SIZE);
  if (posts.value === null) {
    posts.value = [];
  }
  posts.value = [...posts.value, ...response.posts];

  done(posts.value.length >= response.total);
}

</script>
<style scoped>
</style>
