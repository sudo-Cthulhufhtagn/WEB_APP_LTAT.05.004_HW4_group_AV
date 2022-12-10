<template>
  <header>
  <div class="navigation_bar">
    <button @click="$router.push('/')">Home</button>
    <button @click="$router.push('/about')">Contacts</button>
  </div>
</header>
  <div style="height: 16vh;"></div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
  background-color: lightgreen;
  padding: 0px;
  margin: 0px;
  min-height: 100vh;
}
</style>
