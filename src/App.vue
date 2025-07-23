<template>
  <div id="app">
    <a-layout style="min-height: 100vh">
      <a-layout-header style="background: #fff; padding: 0 24px; box-shadow: 0 2px 8px rgba(0,0,0,.1)">
        <h1 style="margin: 0; color: #1890ff">User Management System</h1>
      </a-layout-header>
      <a-layout-content style="padding: 24px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
