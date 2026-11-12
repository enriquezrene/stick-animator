<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="app-brand">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>Stick Animator</span>
    </div>

    <nav aria-label="Main navigation">
      <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 28px;
  min-height: 56px;
  padding: 10px 20px;
  background: #f1f1f2;
  border-bottom: 1px solid #e5e5e7;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #303034;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand-mark {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #1485f5, #0058c4);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 10px;
  border-radius: 5px;
  color: #626269;
  font-size: 14px;
  text-decoration: none;
}

.nav-link:hover {
  background: #e6e6e9;
  color: #303034;
}

.nav-link:focus-visible {
  outline: 2px solid #006bdc;
  outline-offset: 2px;
}
</style>
