<template>
    <div class="q-pa-md">
        <q-toolbar class="bg-primary text-white p-0 m-0">
            <q-avatar>
                <router-link title="Home" to="/">
                    <img alt="Home" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                </router-link>
            </q-avatar>

            <q-toolbar-title>Quasar Framework Ricky & Morty API <span v-if="($store.state.characters && $store.state.characters.length && !isCharacter)">(Page {{ $store.state.page }}/{{ $store.state.info.pages }})</span></q-toolbar-title>

            <div class="ms-auto w-auto d-flex row-wrap">
                <q-btn @click="handleChange(s), $store.commit('setPage', 1)" flat round dense icon="search" class="ms-auto" />
                <input
                    class="col-9 input ps-3 pe-3"
                    placeholder="Search"
                    @blur="handleChange(s), $store.commit('setPage', 1)"
                    v-model="s"
                />
            </div>        
        </q-toolbar>
    </div>
</template>

<script>
    import { ref } from "vue";
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Header',
        setup (props, { emit }) {
            const timeout = ref(0);

            function handleChange(e) {
                clearTimeout(timeout.value)

                timeout.value = setTimeout(function () {
                    emit('onChange', e);
                }, 1000)
            }      

            return { handleChange, timeout };
        },
        computed:{
            isCharacter(){
                return this.$route.path.indexOf('character') > 0 
            },
        }  
    }
</script>
<style src="./style.scss" lang="scss"></style>