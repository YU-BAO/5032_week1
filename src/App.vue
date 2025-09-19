<script setup>
import { ref, onMounted } from 'vue'

// User authentication state
const currentUser = ref(null)

// Check for current user session
const checkUserSession = () => {
  const savedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }
}

// Logout function
const logoutUser = () => {
  // Use Firebase Auth logout
  import('./firebase/auth').then(({ logoutUser: firebaseLogout }) => {
    firebaseLogout().then(result => {
      if (result.success) {
        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('currentUser')
        currentUser.value = null
        // Optionally redirect to home
        window.location.href = '/'
      }
    }).catch(error => {
      console.error('Logout failed:', error)
      // Still clear local session even if Firebase logout fails
      localStorage.removeItem('currentUser')
      sessionStorage.removeItem('currentUser')
      currentUser.value = null
      window.location.href = '/'
    })
  })
}

// Check session on mount and listen for storage changes
onMounted(() => {
  checkUserSession()
  
  // Listen for storage changes (for multiple tabs)
  window.addEventListener('storage', checkUserSession)
  
  // Listen for session updates within the same tab
  window.addEventListener('userLogin', checkUserSession)
  window.addEventListener('userLogout', () => {
    currentUser.value = null
  })
})
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
          <ul class="navbar-nav me-auto">
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
              <router-link class="nav-link" to="/addbook" :class="{ active: $route.name === 'AddBook' }">
                Add Book
              </router-link>
            </li>
          </ul>
          
          <!-- User Authentication Navigation -->
          <ul class="navbar-nav ms-auto">
                                    <!-- Show when user is NOT logged in -->
                        <template v-if="!currentUser">
                          <li class="nav-item">
                            <router-link class="nav-link" to="/register" :class="{ active: $route.name === 'Register' }">
                              Register
                            </router-link>
                          </li>
                          <li class="nav-item">
                            <router-link class="nav-link" to="/firelogin" :class="{ active: $route.name === 'FireLogin' }">
                              Login
                            </router-link>
                          </li>
                        </template>
            
            <!-- Show when user IS logged in -->
            <template v-else>
              <li class="nav-item">
                <span class="nav-link user-info">
                  Welcome, {{ currentUser.username }} 
                  <span class="badge bg-primary ms-1">{{ currentUser.role }}</span>
                </span>
              </li>
              <li class="nav-item">
                <button class="nav-link btn btn-link logout-btn" @click="logoutUser">
                  Logout
                </button>
              </li>
            </template>
            
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

.user-info {
  color: #28a745 !important;
  font-weight: 600 !important;
}

.logout-btn {
  background: none !important;
  border: none !important;
  padding: 0.5rem 1rem !important;
  color: #dc3545 !important;
  font-weight: 500 !important;
}

.logout-btn:hover {
  color: #c82333 !important;
  background: none !important;
}

.badge {
  font-size: 0.7em;
  text-transform: uppercase;
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
  
  .user-info {
    font-size: 0.9rem;
  }
}
</style>
