<template>
  <div class="daily-sentence">
    <span class="sentence">{{ show }}</span>
    <span class="cursor">|</span>
  </div>
</template>

<script setup>
import { getDailySentence } from "@/api/daily";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  DEFAULT_SENTENCE,
  TYPE_WORD_INTERVAL,
  DELETE_WORD_INTRVAL,
  TYPE_DELETE_INTERVAL,
} from "@/utils/constants";

const sentences = ref([DEFAULT_SENTENCE]);

getDailySentence().then((res) => {
  const {
    data: { content, translation },
  } = res;
  sentences.value = [translation, content];
});

const num = computed(() => sentences.value.length);

const index = ref(0);

const sentence = computed(() => sentences.value[index.value]);

const show = ref("");

let id = null;
let timer = null;

let words = 0;

const typeSentence = () => {
  id = requestAnimationFrame(() => {
    if (words === sentence.value.length) {
      timer = setTimeout(deleteSentence, TYPE_DELETE_INTERVAL);
      return;
    }
    show.value = sentence.value.slice(0, ++words);
    timer = setTimeout(typeSentence, TYPE_WORD_INTERVAL);
  });
};

const deleteSentence = () => {
  id = requestAnimationFrame(() => {
    if (words === 0) {
      timer = setTimeout(typeSentence, TYPE_DELETE_INTERVAL);
      index.value = ++index.value % num.value;
      return;
    }
    show.value = sentence.value.slice(0, --words);
    timer = setTimeout(deleteSentence, DELETE_WORD_INTRVAL);
  });
};

const startAnimation = () => typeSentence();

const cancelAnimation = () => {
  cancelAnimationFrame(id);
  clearTimeout(timer);
};

onMounted(startAnimation);

onBeforeUnmount(cancelAnimation);
</script>

<style lang="postcss" scoped>
.daily-sentence {
  @apply text-xl leading-normal;
}
</style>
