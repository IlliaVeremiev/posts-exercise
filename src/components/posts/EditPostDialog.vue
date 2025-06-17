<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">

      <q-card-section class="tw-flex tw-justify-between tw-flex-nowrap">
        <div class="tw-font-bold tw-text-lg tw-break-all">{{ $t('posts.editPostDialog.title') }}</div>
        <div>
          <q-btn
            flat
            round
            icon="close"
            :aria-label="$t('posts.editPostDialog.cancelButton')"
            @click="onDialogCancel"
            :disable="loading"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="form" @submit="onOKClick" greedy class="tw-flex tw-flex-col tw-gap-1">
          <q-input
            v-model="title"
            :label="$t('posts.editPostDialog.titleLabel')"
            outlined
            dense
            lazy-rules
            :rules="titleRules"
            :disable="loading"
          />

          <q-input
            v-model="body"
            :label="$t('posts.editPostDialog.bodyLabel')"
            type="textarea"
            rows="4"
            outlined
            lazy-rules
            :rules="bodyRules"
            :disable="loading"
          />

          <q-select
            v-model="tags"
            :label="$t('posts.editPostDialog.tagsLabel')"
            outlined
            dense
            multiple
            use-chips
            use-input
            new-value-mode="add-unique"
            :options="[]"
            input-debounce="0"
            :hint="$t('posts.editPostDialog.tagsHint')"
            :disable="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :label="$t('posts.editPostDialog.saveButton')"
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
import { apiErrorNotification } from 'src/utils/notify-utils';
import type { Post } from 'src/models/post';

defineEmits([
  ...useDialogPluginComponent.emits
]);

const props = defineProps<{
  post: Post
}>();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const { t } = useI18n();
const q = useQuasar();

const titleRules = [
  (val: string) => !!val || t('posts.editPostDialog.validation.titleRequired'),
  (val: string) => val.length >= 3 || t('posts.editPostDialog.validation.titleMinLength')
];

const bodyRules = [
  (val: string) => !!val || t('posts.editPostDialog.validation.bodyRequired'),
  (val: string) => val.length >= 3 || t('posts.editPostDialog.validation.bodyMinLength')
];

const title = ref<string>(props.post.title);
const body = ref<string>(props.post.body);
const tags = ref<string[]>([...props.post.tags]);
const loading = ref<boolean>(false);

const form = useTemplateRef<QForm>('form');

async function onOKClick() {
  if (!await form.value?.validate()) {
    return;
  }
  try {
    loading.value = true;
    // const post = await api.editPost(...); // No actual call as no such api method exists. Wait 1 second instead
    await new Promise(r => setTimeout(r, 1000));
    const post: Post = {
      id: props.post.id,
      title: title.value,
      body: body.value,
      tags: tags.value,
      reactions: props.post.reactions,
      views: props.post.views,
      userId: props.post.userId
    };
    onDialogOK(post);
  } catch (error) {
    q.notify(apiErrorNotification(error));
  } finally {
    loading.value = false;
  }
}

</script>
