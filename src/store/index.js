import { createStore } from 'vuex' 

export const store = createStore({
  state () {
    return {
        page: 1,
        keyword: null,
        info: {},
        loading: false,
        characters: null
    }
  },
  mutations: {
    setKeyword (state, payload) {
      state.keyword = payload
    },    
    setPage (state, payload) {
        state.page = payload
    },
    setInfo (state, payload) {
        state.info = payload
    },
    setLoading (state) {
        state.loading = !state.loading
    },
    setCharacters (state, payload) {
        state.characters = payload
    }    
  },
  actions: {
    async CharactersByName (context, payload) {  
      context.commit('setLoading')

      try {
          const response = await fetch(process.env.VUE_APP_BASE_GRAPHQL_API, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: `
                query Characters {
                  characters(page: ${context.state.page}, filter: { name: "${payload}" }) {
                      results {
                        episode {
                          name,
                          id,
                          air_date,
                          episode
                        }
                        id
                        image
                        name
                      }
                      info {
                        count
                        next
                        pages
                        prev
                      }
                    }
                }`,
              }),
          }).then((res) => res.json())
          
          if(response.data) {
            context.commit('setInfo', response.data.characters.info)
            context.commit('setCharacters', response.data.characters.results)
          } else {
            context.dispatch('Characters')
          }
      } catch (error) {
          console.log(error);
      } finally {
          context.commit('setLoading')
      }      
    },
    async Characters (context) {  
        context.commit('setLoading')

        try {
            const response = await fetch(process.env.VUE_APP_BASE_GRAPHQL_API, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: `
                  query Characters {
                    characters(page: ${context.state.page}) {
                        results {
                          episode {
                            name,
                            id,
                            air_date,
                            episode
                          }
                          id
                          image
                          name
                        }
                        info {
                          count
                          next
                          pages
                          prev
                        }
                      }
                  }`,
                }),
            }).then((res) => res.json())
            
            if(response.data) {
              context.commit('setInfo', response.data.characters.info)
              context.commit('setCharacters', response.data.characters.results)
            }
        } catch (error) {
            console.log(error);
        } finally {
            context.commit('setLoading')
        }      
    }, Paginate (context, payload) { 
      context.commit('setPage', payload)
    }
  }
})