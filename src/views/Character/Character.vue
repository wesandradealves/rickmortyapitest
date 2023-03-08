<!-- eslint-disable no-unused-vars -->
<template>
  <q-layout view="lHh Lpr lFf">
      <div class="container d-flex justify-content-center flex-column align-items-center">
        <Profile v-if="object" :object="object" />
      </div>
  </q-layout>
</template>

<script>
import { useRoute } from "vue-router"
import { ref } from 'vue'
import { useStore } from 'vuex'
import Profile from '@/components/Profile/Profile.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Character',
  components: {
    Profile,
  },    
  setup () {
      const store = useStore()
      const route = useRoute()
      const object = ref(0)
      object.value = null

      // eslint-disable-next-line no-unused-vars
      async function getCharacterById (pid = route.params.id) {  
        store.commit('setLoading')

        try {
            const response = await fetch(process.env.VUE_APP_BASE_GRAPHQL_API, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: `
                  query Character {
                    character(id: ${route.params.id}) {
                      created
                        gender
                        id
                        image
                        location {
                          created
                          dimension
                          id
                          name
                          type
                        }
                        name
                        origin {
                          created
                          dimension
                          id
                          name
                          type
                        }
                        species
                        status
                        type
                      }
                  }`,
                }),
            }).then((res) => res.json())
            
            if(response.data) {
              delete response.data.character.location.id;
              let date = new Date(response.data.character.location.created);
              response.data.character.location.created = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
              object.value = response.data.character
              document.title = `${document.title} - ${object.value.name}`;
            }
        } catch (error) {
            console.log(error);
        } finally {
          store.commit('setLoading');       
        }      
      }

      getCharacterById()
      return { object };
  }
}
</script>
<style src="./style.scss" lang="scss"></style>