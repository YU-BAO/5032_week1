<script setup>
// App.vue now uses Vue Router for navigation
</script>

<template>
  <div id="app">
    <!-- Bootstrap Navigation Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          Week 5. Library Registration Form
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" :class="{ active: $route.name === 'Home' }">
                Home (Week 5)
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" :class="{ active: $route.name === 'About' }">
                About
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent>Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router View for Page Content -->
    <router-view />

    <!-- Footer -->
    <footer class="bg-light border-top py-3 mt-5">
      <div class="container text-center">
        <p class="mb-0 text-muted">&copy; 2024 Week 5 Library System. Built with Vue.js & Bootstrap 5.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-brand {
  font-weight: 600;
  color: #333 !important;
}

.nav-link {
  font-weight: 500;
  color: #666 !important;
  transition: color 0.15s ease-in-out;
}

.nav-link.active {
  color: #007bff !important;
  font-weight: 600;
}

.nav-link:hover {
  color: #007bff !important;
}

router-view {
  flex: 1;
}

footer {
  margin-top: auto;
}

.border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}

.border-top {
  border-top: 1px solid #dee2e6 !important;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.1rem;
  }
}
</style>
