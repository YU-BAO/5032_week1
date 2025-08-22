<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form / Credentials</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" 
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username">
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password">
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" 
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
                v-model="formData.gender">
                <option value="">Please select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea class="form-control" id="reason" rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              v-model="formData.reason"></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Display submitted cards -->
    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-12">
        <div class="d-flex flex-wrap justify-content-start">
          <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem; min-width: 280px;">
          <div class="card-header">
            User Information
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Form data reactive object
const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

// Array to store submitted cards
const submittedCards = ref([])

// Errors object to store validation errors
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

// Validate username function
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = "Name must be at least 3 characters"
  } else {
    errors.value.username = null
  }
}

// Validate password function
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter."
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter."
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number."
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character."
  } else {
    errors.value.password = null
  }
}

// Validate gender function
const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Please select your gender"
  } else {
    errors.value.gender = null
  }
}

// Validate reason function
const validateReason = (blur) => {
  const reason = formData.value.reason
  if (reason.length < 10) {
    if (blur) errors.value.reason = "Reason must be at least 10 characters"
  } else if (reason.length > 200) {
    if (blur) errors.value.reason = "Reason must not exceed 200 characters"
  } else {
    errors.value.reason = null
  }
}

// Submit form function
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateReason(true)
  if (!errors.value.username && !errors.value.password && !errors.value.gender && !errors.value.reason) {
    submittedCards.value.push({
      ...formData.value
    })
    console.log('Form submitted:', formData.value)
    // Clear form after submission
    clearForm()
  }
}

// Clear form function
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: ''
  }
  // Clear all errors
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275FDA;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .card {
    width: 100% !important;
    min-width: unset !important;
    margin: 0.5rem 0 !important;
  }
  
  .d-flex {
    flex-direction: column;
  }
}
</style> 