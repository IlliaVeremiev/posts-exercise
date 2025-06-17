<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">

      <q-card-section class="tw-flex tw-justify-between tw-flex-nowrap">
        <div class="tw-font-bold tw-text-lg tw-break-all">{{ $t('posts.createPostDialog.title') }}</div>
        <div>
          <q-btn
            flat
            round
            icon="close"
            :aria-label="$t('posts.createPostDialog.cancelButton')"
            @click="onDialogCancel"
            :disable="loading"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="form" @submit="onOKClick" greedy class="tw-flex tw-flex-col tw-gap-1">
          <q-input
            v-model="title"
            :label="$t('posts.createPostDialog.titleLabel')"
            outlined
            dense
            lazy-rules
            :rules="titleRules"
            :disable="loading"
          />

          <q-input
            v-model="body"
            :label="$t('posts.createPostDialog.bodyLabel')"
            type="textarea"
            rows="4"
            outlined
            lazy-rules
            :rules="bodyRules"
            :disable="loading"
          />

          <q-select
            v-model="tags"
            :label="$t('posts.createPostDialog.tagsLabel')"
            outlined
            dense
            multiple
            use-chips
            use-input
            new-value-mode="add-unique"
            :options="[]"
            input-debounce="0"
            :hint="$t('posts.createPostDialog.tagsHint')"
            :disable="loading"
          />

          <q-select
            v-model="userId"
            :label="$t('posts.createPostDialog.userIdLabel')"
            outlined
            dense
            :options="userOptions"
            map-options
            emit-value
            class="tw-text-sm"
            :rules="userIdRules"
            :disable="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :label="$t('posts.createPostDialog.createButton')"
          no-caps
          flat
          text-color="primary"
          :ripple="false"
          class="no-hover"
          @click="onOKClick"
          :disable="loading"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { type QForm, useDialogPluginComponent, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import api from 'src/api';
import { apiErrorNotification } from 'src/utils/notify-utils';
import type { Post } from 'src/models/post';

defineEmits([
  ...useDialogPluginComponent.emits
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const { t } = useI18n();
const q = useQuasar();

const titleRules = [
  (val: string) => !!val || t('posts.createPostDialog.validation.titleRequired'),
  (val: string) => val.length >= 3 || t('posts.createPostDialog.validation.titleMinLength')
];

const bodyRules = [
  (val: string) => !!val || t('posts.createPostDialog.validation.bodyRequired'),
  (val: string) => val.length >= 3 || t('posts.createPostDialog.validation.bodyMinLength')
];

const userIdRules = [
  (val: number | null) => !!val || t('posts.createPostDialog.validation.userIdRequired')
];

const userOptions = Array.from({ length: 100 }, (_, i) => ({
  label: t('posts.createPostDialog.userOption', { id: i + 1 }),
  value: i + 1
}));

const title = ref<string>('');
const body = ref<string>('');
const tags = ref<string[]>([]);
const userId = ref<number | null>(null);
const loading = ref<boolean>(false);

const form = useTemplateRef<QForm>('form');

async function onOKClick() {
  if (!await form.value?.validate()) {
    return;
  }
  try {
    loading.value = true;
    const response = await api.createPost({
      title: title.value,
      body: body.value,
      tags: tags.value,
      userId: userId.value!
    });
    const post: Post = {
      ...response,
      reactions: {
        likes: 0,
        dislikes: 0
      },
      views: 0
    };
    onDialogOK(post);
  } catch (error) {
    q.notify(apiErrorNotification(error));
  } finally {
    loading.value = false;
  }
}
</script>
