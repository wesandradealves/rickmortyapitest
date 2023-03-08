<template>
    <div class="profile-card p-3 d-flex align-items-center flex-column flex-wrap m-auto">
        <q-avatar size="150px" class="m-auto p-0 d-flex align-items-center justify-content-center">
            <img :src=profile.image>
        </q-avatar>        
        <div class="text-h4 mt-4 mb-4">
            {{profile.name}}
            <q-badge outline align="middle" color="teal">
                {{profile.species}} / {{profile.gender}}
            </q-badge>
        </div>
        <q-card class="w-100">
            <q-tabs
                v-model="tab"
                dense
                class="text-grey d-flex flex-wrap w-100 p-0 m-0"
                active-color="primary"
                indicator-color="primary"
                align="justify"
            >
                <q-tab class="col-4 p-0 m-0" name="mails" label="Location" />
                <q-tab class="col-4 p-0 m-0" name="alarms" label="Other" />
                <q-tab class="col-4 p-0 m-0" name="episodes" label="Episodes" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="mails" class="overflow-hidden d-block">
                    <p v-for="(value, label) in profile.location" :key="label" class="p-0 m-0 d-block w-100">
                        <span v-if="value"><b>{{ label }}</b>: {{ value }}</span>
                    </p>
                </q-tab-panel>

                <q-tab-panel name="alarms" class="overflow-hidden d-block">
                    <p v-if="profile.status" class="m-0 p-0">
                        <b>Status:</b> {{ profile.status }}
                    </p>
                    <p v-if="profile.type" class="m-0 p-0">
                        <b>Type:</b> {{ profile.type }}
                    </p>                    
                </q-tab-panel>

                <q-tab-panel name="episodes" class="overflow-hidden d-block">
                    <q-timeline color="secondary">
                        <q-timeline-entry v-for="episode in profile.episode" :key="episode.id">
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
                </q-tab-panel>                
            </q-tab-panels>
        </q-card>    
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import { ref } from "vue"

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Profile',
        props: {
            object: Object
        },
        // eslint-disable-next-line no-unused-vars
        setup (props) {
            const profile = ref(0);

            onMounted(() => {
                profile.value = props.object 
            })  

            return {
                tab: ref('mails'),
                profile
            }
        }        
    }
</script>
<style src="./style.scss" lang="scss"></style>