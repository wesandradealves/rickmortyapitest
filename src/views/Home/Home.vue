<template>
  <q-layout view="lHh Lpr lFf">
      <div class="container d-flex justify-content-center flex-column align-items-center">
        <ul class="d-flex flex-wrap align-items-stretch m-0 p-0">
          <li class="list-group-item" v-if="$store.state.characters && !$store.state.characters.length">
            <p>Nenhum resultado encontrado</p>
          </li>
          <li v-else class="list-group-item col-md-4 p-2 flex-fill" v-for="character in $store.state.characters" :key="character.id">
            <q-list flat bordered class="rounded-borders my-card h-100 overflow-hidden">
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <router-link :to="'character/' + character.id">
                      <q-avatar class="p-0 m-0">
                          <img class="p-0 m-0" :src=character.image>
                      </q-avatar>                    
                    </router-link>
                  </q-item-section>

                  <q-item-section>
                    <router-link :to="'character/' + character.id">
                      {{character.name}}
                    </router-link>
                  </q-item-section>

                  <q-item-section side>
                    <div class="row items-center">
                      {{ character.id }}
                    </div>
                  </q-item-section>
                </template>

                <q-card>
                  <q-card-section class="p-4" horizontal>
                    <!-- {{ character.episode }} -->
                    <q-timeline color="secondary">
                      <q-timeline-entry v-for="episode in character.episode" :key="episode.id">
                        <template v-slot:title>
                          {{episode.name}}
                        </template>
                        <template v-slot:subtitle>
                          {{episode.air_date}}
                        </template>

                        <div>
                          {{ episode.episode }}
                        </div>
                      </q-timeline-entry>
                    </q-timeline>                  
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>            
          </li>
        </ul>
        <q-pagination
          class="overflow-hidden mb-5 mt-5 w-100"
          v-model="$store.state.info.page"
          @click="Paginate"
          :max=$store.state.info.pages
          direction-links
          icon-next=false
          icon-prev=false
        />       
      </div>
  </q-layout>
</template>

<script>
import { useRoute } from "vue-router"
import { useStore } from 'vuex'
import { onMounted } from 'vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup () {
    const store = useStore()
    const route = useRoute()

    onMounted(() => Paginate(1))
  
    document.title = `Engaged - ${route.name}`;

    function Paginate(e) {
      store.commit('setPage', typeof e == 'number' ? e : e.target.textContent)
      if(store.state.keyword) {
        store.dispatch('CharactersByName', store.state.keyword)
      } else {
        store.dispatch('Characters')
      }
    }      

    return { Paginate };
  }      
}
</script>
<style src="./style.scss" lang="scss"></style>