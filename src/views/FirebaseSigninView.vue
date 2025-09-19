<template>
  <div class="firebase-signin-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-5">
          <!-- Page Header -->
          <div class="text-center mb-5">
            <h1 class="page-title mb-3">Firebase Login</h1>
            <p class="page-subtitle">Sign in with Firebase Authentication</p>
          </div>

          <!-- Login Form -->
          <div class="form-wrapper">
            <form @submit.prevent="loginUser">
              <!-- Email Field -->
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  placeholder="Enter your email"
                  @blur="() => validateEmail(true)"
                  @input="() => validateEmail(false)"
                  v-model="loginForm.email">
                <div v-if="errors.email" class="error-message">
                  {{ errors.email }}
                </div>
              </div>

              <!-- Password Field -->
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password"
                  placeholder="Enter your password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  v-model="loginForm.password">
                <div v-if="errors.password" class="error-message">
                  {{ errors.password }}
                </div>
              </div>

              <!-- Remember Me -->
              <div class="mb-4">
                <div class="form-check">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="rememberMe" 
                    v-model="loginForm.rememberMe">
                  <label class="form-check-label" for="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
              </div>

              <!-- Error Message -->
              <div v-if="generalError" class="alert alert-danger">
                {{ generalError }}
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-3 justify-content-center mb-4">
                <button type="submit" class="btn btn-primary px-4" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
                </button>
                <button type="button" class="btn btn-secondary px-4" @click="clearForm">Clear</button>
              </div>

              <!-- Register Link -->
              <div class="text-center">
                <p class="mb-0">Don't have an account? 
                  <router-link to="/register" class="text-primary">Register here</router-link>
                </p>
              </div>
            </form>
          </div>

          <!-- Current User Display (for testing) -->
          <div v-if="currentUser" class="mt-4">
            <div class="alert alert-info">
              <h6 class="mb-2">Current User (Console Panel):</h6>
              <p class="mb-1"><strong>Email:</strong> {{ currentUser.email }}</p>
              <p class="mb-1"><strong>Username:</strong> {{ currentUser.username }}</p>
              <p class="mb-1"><strong>Role:</strong> {{ currentUser.role }}</p>
              <p class="mb-0"><strong>Login Time:</strong> {{ currentUser.loginTime }}</p>
            </div>
            <div class="text-center">
              <button class="btn btn-outline-danger" @click="logoutUser">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data reactive object
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

// Errors object to store validation errors
const errors = ref({
  email: null,
  password: null
})

// State management
const isSubmitting = ref(false)
const successMessage = ref('')
const generalError = ref('')
const currentUser = ref(null)

// Validation functions
const validateEmail = (blur) => {
  const email = loginForm.value.email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    if (blur) errors.value.email = "Email is required"
  } else if (!emailRegex.test(email)) {
    if (blur) errors.value.email = "Please enter a valid email address"
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = loginForm.value.password
  if (!password) {
    if (blur) errors.value.password = "Password is required"
  } else if (password.length < 6) {
    if (blur) errors.value.password = "Password must be at least 6 characters"
  } else {
    errors.value.password = null
  }
}

// Login user function
const loginUser = () => {
  // Clear previous messages
  successMessage.value = ''
  generalError.value = ''
  
  // Validate all fields
  validateEmail(true)
  validatePassword(true)
  
  // Check if there are any errors
  const hasErrors = Object.values(errors.value).some(error => error !== null)
  
  if (!hasErrors) {
    isSubmitting.value = true
    
    // Use Firebase Auth for login
    import('../firebase/auth').then(({ loginUser: firebaseLogin }) => {
      firebaseLogin(loginForm.value.email.trim(), loginForm.value.password)
        .then(result => {
          if (result.success) {
            // Create session data
            const sessionData = {
              uid: result.user.uid,
              username: result.user.username,
              email: result.user.email,
              role: result.user.role,
              loginTime: new Date().toLocaleString(),
              rememberMe: loginForm.value.rememberMe
            }
            
            // Store session
            if (loginForm.value.rememberMe) {
              localStorage.setItem('currentUser', JSON.stringify(sessionData))
            } else {
              sessionStorage.setItem('currentUser', JSON.stringify(sessionData))
            }
            
            // Set current user for display
            currentUser.value = sessionData
            
            // Show success message
            successMessage.value = `Welcome back, ${result.user.username}! Login successful.`
            
            // Trigger event for App.vue to update navigation
            window.dispatchEvent(new CustomEvent('userLogin'))
            
            // Clear form
            clearForm()
            
          } else {
            // Handle Firebase errors
            if (result.error.includes('user-not-found')) {
              generalError.value = 'No account found with this email. Please register first.'
            } else if (result.error.includes('wrong-password')) {
              generalError.value = 'Incorrect password. Please try again.'
            } else if (result.error.includes('invalid-email')) {
              generalError.value = 'Please enter a valid email address.'
            } else if (result.error.includes('too-many-requests')) {
              generalError.value = 'Too many failed login attempts. Please try again later.'
            } else {
              generalError.value = result.error || 'Login failed. Please try again.'
            }
          }
          isSubmitting.value = false
        })
        .catch(error => {
          generalError.value = 'Login failed. Please try again.'
          isSubmitting.value = false
        })
    }).catch(error => {
      generalError.value = 'Failed to load authentication service. Please check your Firebase configuration.'
      isSubmitting.value = false
    })
  }
}

// Logout user function
const logoutUser = () => {
  // Use Firebase Auth logout
  import('../firebase/auth').then(({ logoutUser: firebaseLogout }) => {
    firebaseLogout().then(result => {
      if (result.success) {
        // Clear session storage
        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('currentUser')
        
        // Clear current user
        currentUser.value = null
        
        // Show message
        successMessage.value = 'Logged out successfully'
        
        // Clear message after 3 seconds
        setTimeout(() => {
          successMessage.value = ''
        }, 3000)
      } else {
        generalError.value = 'Logout failed. Please try again.'
      }
    }).catch(error => {
      generalError.value = 'Logout failed. Please try again.'
    })
  })
}

// Clear form function
const clearForm = () => {
  loginForm.value = {
    email: '',
    password: '',
    rememberMe: false
  }
  // Clear all errors
  errors.value = {
    email: null,
    password: null
  }
  generalError.value = ''
}

// Check for existing session on component mount
onMounted(() => {
  const savedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }
})
</script>

<style scoped>
.firebase-signin-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0;
}

.form-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 0;
  border: 1px solid #e9ecef;
}

.form-label {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-control {
  border: 2px solid #dee2e6;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out;
  background-color: #fff;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: none;
}

.form-check {
  margin: 1rem 0;
}

.form-check-input {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
}

.form-check-label {
  font-size: 1rem;
  color: #333;
  margin-left: 0.5rem;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn {
  border-radius: 6px;
  font-weight: 500;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-outline-danger {
  border: 2px solid #dc3545;
  color: #dc3545;
  background: transparent;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

.alert {
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.alert-info {
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
}

/* Responsive */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 2rem 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .d-flex.gap-3 {
    flex-direction: column;
    gap: 0 !important;
  }
}
</style> 