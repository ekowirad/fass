
<template>
    <div class="root">
        <li><router-link route :to="{name: 'user-home'}">Home</router-link></li>
        <li><router-link route :to="{name: 'user-about'}">About</router-link></li>
        <li><router-link route :to="{name: 'admin-home'}">Admin</router-link></li>
         <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
