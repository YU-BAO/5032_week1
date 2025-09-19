<template>
  <div class="register-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
          <!-- Page Header -->
          <div class="text-center mb-5">
            <h1 class="page-title mb-3">User Registration</h1>
            <p class="page-subtitle">Create your account to access the library system</p>
          </div>

          <!-- Registration Form -->
          <div class="form-wrapper">
            <form @submit.prevent="registerUser">
              <!-- Username Field -->
              <div class="mb-4">
                <label for="username" class="form-label">Username</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="username" 
                  @blur="() => validateUsername(true)"
                  @input="() => validateUsername(false)"
                  v-model="registerForm.username">
                <div v-if="errors.username" class="error-message">
                  {{ errors.username }}
                </div>
              </div>

              <!-- Email Field -->
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  @blur="() => validateEmail(true)"
                  @input="() => validateEmail(false)"
                  v-model="registerForm.email">
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
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  v-model="registerForm.password">
                <div v-if="errors.password" class="error-message">
                  {{ errors.password }}
                </div>
              </div>

              <!-- Confirm Password Field -->
              <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword"
                  @blur="() => validateConfirmPassword(true)"
                  @input="() => validateConfirmPassword(false)"
                  v-model="registerForm.confirmPassword">
                <div v-if="errors.confirmPassword" class="error-message">
                  {{ errors.confirmPassword }}
                </div>
              </div>

              <!-- Role Selection -->
              <div class="mb-4">
                <label for="role" class="form-label">Select Role</label>
                <select 
                  class="form-select" 
                  id="role" 
                  @blur="() => validateRole(true)"
                  @change="() => validateRole(false)"
                  v-model="registerForm.role">
                  <option value="">Please select a role...</option>
                  <option value="student">Student</option>
                  <option value="librarian">Librarian</option>
                  <option value="admin">Administrator</option>
                </select>
                <div v-if="errors.role" class="error-message">
                  {{ errors.role }}
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
              <div class="d-flex gap-3 justify-content-center">
                <button type="submit" class="btn btn-primary px-4" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Registering...' : 'Register' }}
                </button>
                <button type="button" class="btn btn-secondary px-4" @click="clearForm">Clear</button>
              </div>

              <!-- Login Link -->
              <div class="text-center mt-4">
                <p class="mb-0">Already have an account? 
                  <router-link to="/login" class="text-primary">Login here</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data reactive object
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
})

// Errors object to store validation errors
const errors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  role: null
})

// State management
const isSubmitting = ref(false)
const successMessage = ref('')
const generalError = ref('')

// Validation functions
const validateUsername = (blur) => {
  const username = registerForm.value.username
  if (username.length < 3) {
    if (blur) errors.value.username = "Username must be at least 3 characters"
  } else if (username.length > 20) {
    if (blur) errors.value.username = "Username must be less than 20 characters"
  } else {
    errors.value.username = null
  }
}

const validateEmail = (blur) => {
  const email = registerForm.value.email
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
  const password = registerForm.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter"
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter"
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number"
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character"
  } else {
    errors.value.password = null
  }
  
  // Also validate confirm password when password changes
  if (registerForm.value.confirmPassword) {
    validateConfirmPassword(false)
  }
}

const validateConfirmPassword = (blur) => {
  const password = registerForm.value.password
  const confirmPassword = registerForm.value.confirmPassword
  
  if (confirmPassword && password !== confirmPassword) {
    if (blur) errors.value.confirmPassword = "Passwords do not match"
  } else {
    errors.value.confirmPassword = null
  }
}

const validateRole = (blur) => {
  if (!registerForm.value.role) {
    if (blur) errors.value.role = "Please select a role"
  } else {
    errors.value.role = null
  }
}

// Register user function
const registerUser = () => {
  // Clear previous messages
  successMessage.value = ''
  generalError.value = ''
  
  // Validate all fields
  validateUsername(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateRole(true)
  
  // Check if there are any errors
  const hasErrors = Object.values(errors.value).some(error => error !== null)
  
  if (!hasErrors) {
    isSubmitting.value = true
    
    // Use Firebase Auth for registration
    import('../firebase/auth').then(({ registerUser: firebaseRegister }) => {
      firebaseRegister({
        email: registerForm.value.email,
        password: registerForm.value.password,
        username: registerForm.value.username,
        role: registerForm.value.role
      }).then(result => {
        if (result.success) {
          // Show success message
          successMessage.value = 'Registration successful! You can now login with your credentials.'
          
          // Clear form
          clearForm()
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          // Handle Firebase errors
          if (result.error.includes('email-already-in-use')) {
            generalError.value = 'This email is already registered. Please use a different email or try logging in.'
          } else if (result.error.includes('weak-password')) {
            generalError.value = 'Password should be at least 6 characters.'
          } else if (result.error.includes('invalid-email')) {
            generalError.value = 'Please enter a valid email address.'
          } else {
            generalError.value = result.error || 'Registration failed. Please try again.'
          }
        }
        isSubmitting.value = false
      }).catch(error => {
        generalError.value = 'Registration failed. Please try again.'
        isSubmitting.value = false
      })
    }).catch(error => {
      generalError.value = 'Failed to load authentication service. Please check your Firebase configuration.'
      isSubmitting.value = false
    })
  }
}

// Clear form function
const clearForm = () => {
  registerForm.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  }
  // Clear all errors
  errors.value = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: null
  }
  successMessage.value = ''
  generalError.value = ''
}
</script>

<style scoped>
.register-container {
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

.form-control, .form-select {
  border: 2px solid #dee2e6;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out;
  background-color: #fff;
}

.form-control:focus, .form-select:focus {
  border-color: #007bff;
  box-shadow: none;
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