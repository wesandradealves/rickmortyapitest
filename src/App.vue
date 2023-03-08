<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>  
  <q-layout class="overflow-hidden">
    <Header @onChange="handleChange" class="p-0 mb-5" />
    <q-page-container>   
      <Spinner v-if="$store.state.loading" color="white" size="3em"></Spinner>
      <router-view />
    </q-page-container>
  </q-layout>  
</template>

<script>
import { useStore } from 'vuex'
import Spinner from '@/components/Spinner/Spinner.vue'
import Header from '@/components/Header/Header.vue'
import { ref } from "vue";

export default {
  name: 'LayoutDefault',
    components: {
      Spinner,
      Header
    },     
    setup () {
      const store = useStore()
      const s = ref(0);

      function handleChange(e) {
        if(e) {
          store.dispatch('CharactersByName', e)
          s.value = e
        } else {
          s.value = null
          store.dispatch('Characters')
        }
        store.commit('setKeyword', s.value);
      }      

      store.dispatch('Characters')
      return { handleChange, s };
    } 
  }
</script>
