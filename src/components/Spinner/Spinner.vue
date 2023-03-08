<template>
    <div class="q-spinner-wrapper d-flex align-items-center justify-content-center w-100 h-100">
        <q-spinner
        :color=$props.color 
        :size=$props.size    
        />  
    </div>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Spinner',
        props: {
            size: String,
            color: String
        }
    }
</script>
<style src="./style.scss" lang="scss"></style>