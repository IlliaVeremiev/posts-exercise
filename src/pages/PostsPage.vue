<template>
  <q-page padding>
    <div class="tw-flex tw-justify-between tw-flex-nowrap tw-mb-1 tw-max-w-[800px] tw-mx-auto">
      <span class="tw-font-bold tw-text-xl tw-break-all">{{ $t('posts.pageTitle') }}</span>
      <q-btn
        :label="$t('posts.addPostButton')"
        no-caps
        flat
        text-color="primary"
        :ripple="false"
        padding="0"
        class="no-hover"
        @click="openCreatePostDialog"
      />

      <!--  TODO: QInput with search icon and "Search" button  -->
      <!--  TODO: Filters select  -->
      <!--  TODO: Would be nice if API provides total count of elements in search result to display it  -->

    </div>
    <q-infinite-scroll
      ref="infinite-scroll"
      @load="onLoad"
      :offset="250"
      class="tw-flex tw-flex-col tw-gap-2.5 tw-max-w-[800px] tw-mx-auto"
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
      <template v-else>
        <post-card
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @edit="openEditPostDialog"
        />
      </template>

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
import { onMounted, ref, useTemplateRef } from 'vue';
import type { Post } from 'src/models/post';
import PostCard from 'components/posts/PostCard.vue';
import { POSTS_CHUNK_SIZE } from 'src/utils/constants';
import { type QInfiniteScroll, useQuasar } from 'quasar';
import CreatePostDialog from 'components/posts/CreatePostDialog.vue';
import { apiErrorNotification, errorNotification } from 'src/utils/notify-utils';
import EditPostDialog from 'components/posts/EditPostDialog.vue';

const q = useQuasar();

const infiniteScroll = useTemplateRef<QInfiniteScroll>('infinite-scroll');

const posts = ref<Post[] | null>(null);

onMounted(() => {
  infiniteScroll.value?.trigger();
});

async function onLoad(index: number, done: (stop?: boolean) => void) {
  try {
    // For search functionality, we should use the /posts/search endpoint and add a query method parameter
    // I think it makes sense to save the search query in the actual page URL so users can share links to the search results
    // I would update the route query parameter and local variable, reset the infinite scroll index, and trigger it to reload
    // When the page is initially loaded - check if there is a search query in the URL
    // Similar approach with sort order and pagination
    const response = await api.getPosts(POSTS_CHUNK_SIZE, (index - 1) * POSTS_CHUNK_SIZE);
    posts.value = [...posts.value ?? [], ...response.posts];

    done(posts.value.length >= response.total);
  } catch (error) {
    q.notify(apiErrorNotification(error));
    infiniteScroll.value?.setIndex(index - 1);
    done(false);
  }
}

function openCreatePostDialog() {
  q.dialog({
    component: CreatePostDialog
  }).onOk((post: Post) => {
    posts.value = [post, ...posts.value ?? []];
  });
}

function openEditPostDialog(post: Post) {
  q.dialog({
    component: EditPostDialog,
    componentProps: {
      post
    }
  }).onOk((post: Post) => {
    const index = posts.value?.findIndex(p => p.id === post.id) ?? -1;
    if (index === -1) {
      q.notify(errorNotification('Can not load updated post'));
      return;
    }
    posts.value![index] = post;
  });
}

</script>
