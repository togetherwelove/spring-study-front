<script setup>
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes();
console.log(routes);
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <nav>
        <div v-for="route in routes" :key="route.path">
          <router-link :to="route.path" class="text-capitalize">{{ route.name }}</router-link>
        </div>
      </nav>
    </div>
    <div class="contents">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: red;
}
</style>
