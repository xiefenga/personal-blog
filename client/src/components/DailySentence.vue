<template>
  <div>
    <span class="sentence">{{ show }}</span>
    <span class="cursor">|</span>
  </div>
</template>

<script setup>
import { ref, computed, toRefs, onMounted, onBeforeUnmount } from "vue";
import {
  TYPE_WORD_INTERVAL,
  DELETE_WORD_INTRVAL,
  TYPE_DELETE_INTERVAL,
} from "@/utils/constants";

const props = defineProps({
  sentences: {
    type: Array,
    required: true,
  },
});

const { sentences } = toRefs(props);

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
