<template>
  <div class="form-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <!-- Form Header -->
          <div class="text-center mb-5">
            <h1 class="form-title mb-3">
              <i class="fas fa-file-alt me-3"></i>W5. Library Registration Form
            </h1>
            <p class="form-subtitle">Let's build some more advanced features into our form.</p>
          </div>

          <!-- Registration Form -->
          <div class="form-wrapper">
            <form @submit.prevent="submitForm">
              <!-- Username and Gender Row -->
              <div class="row mb-4">
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                  <label for="username" class="form-label">Username</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    @blur="() => validateName(true)"
                    @input="() => validateName(false)"
                    v-model="formData.username">
                  <div v-if="errors.username" class="error-message">
                    {{ errors.username }}
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="gender" class="form-label">Gender</label>
                  <select 
                    class="form-select" 
                    id="gender" 
                    @blur="() => validateGender(true)"
                    @change="() => validateGender(false)"
                    v-model="formData.gender">
                    <option value="">Please select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div v-if="errors.gender" class="error-message">
                    {{ errors.gender }}
                  </div>
                </div>
              </div>

              <!-- Password and Confirm Password Row -->
              <div class="row mb-4">
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password"
                    @blur="() => validatePassword(true)"
                    @input="() => validatePassword(false)"
                    v-model="formData.password">
                  <div v-if="errors.password" class="error-message">
                    {{ errors.password }}
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="confirmPassword" class="form-label">Confirm password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword"
                    @blur="() => validateConfirmPassword(true)"
                    @input="() => validateConfirmPassword(false)"
                    v-model="formData.confirmPassword">
                  <div v-if="errors.confirmPassword" class="error-message">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
              </div>

              <!-- Australian Resident Checkbox -->
              <div class="row mb-4">
                <div class="col-12">
                  <div class="form-check">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      id="isAustralian" 
                      v-model="formData.isAustralian">
                    <label class="form-check-label" for="isAustralian">
                      Australian Resident?
                    </label>
                  </div>
                </div>
              </div>

              <!-- Reason for Joining -->
              <div class="mb-4">
                <label for="reason" class="form-label">Reason for joining</label>
                <textarea 
                  class="form-control" 
                  id="reason" 
                  rows="4"
                  @blur="() => validateReason(true)"
                  @input="() => validateReason(false)"
                  v-model="formData.reason"></textarea>
                <div v-if="errors.reason" class="error-message">
                  {{ errors.reason }}
                </div>
              </div>

              <!-- Suburb Field -->
              <div class="mb-4">
                <label for="suburb" class="form-label">Suburb</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="suburb" 
                  v-model="formData.suburb"
                  placeholder="Clayton">
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-3 justify-content-center">
                <button type="submit" class="btn btn-primary px-4">Submit</button>
                <button type="button" class="btn btn-secondary px-4" @click="clearForm">Clear</button>
              </div>
            </form>
          </div>

          <!-- Data Table Section -->
          <div v-if="submittedCards.length" class="mt-5">
            <h3 class="mb-3">This is a PrimeVue DataTable.</h3>
            <DataTable 
              :value="submittedCards" 
              tableStyle="min-width: 50rem"
              :paginator="true"
              :rows="5"
              stripedRows
              responsiveLayout="scroll">
              <Column field="username" header="Username" :sortable="true"></Column>
              <Column field="password" header="Password" :sortable="true">
                <template #body="slotProps">
                  <span>••••••••</span>
                </template>
              </Column>
              <Column field="isAustralian" header="Australian Resident" :sortable="true">
                <template #body="slotProps">
                  {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
                </template>
              </Column>
              <Column field="gender" header="Gender" :sortable="true"></Column>
              <Column field="reason" header="Reason" :sortable="true"></Column>
              <Column field="suburb" header="Suburb" :sortable="true"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Form data reactive object
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: '',
  suburb: ''
})

// Array to store submitted cards
const submittedCards = ref([])

// Errors object to store validation errors
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
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
  
  // Also validate confirm password when password changes
  if (formData.value.confirmPassword) {
    validateConfirmPassword(false)
  }
}

// Validate confirm password function
const validateConfirmPassword = (blur) => {
  const password = formData.value.password
  const confirmPassword = formData.value.confirmPassword
  
  if (confirmPassword && password !== confirmPassword) {
    if (blur) errors.value.confirmPassword = "Passwords do not match."
  } else {
    errors.value.confirmPassword = null
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
  validateConfirmPassword(true)
  validateGender(true)
  validateReason(true)
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.gender && !errors.value.reason) {
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
    confirmPassword: '',
    isAustralian: false,
    gender: '',
    reason: '',
    suburb: ''
  }
  // Clear all errors
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
  }
}
</script>

<style scoped>
.form-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 0;
}

.form-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 0;
  box-shadow: none;
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

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

/* Table styling */
:deep(.p-datatable) {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-header) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  border-bottom: 1px solid #e9ecef;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #f8f9fa;
}

/* Responsive */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 2rem 1.5rem;
  }
  
  .form-title {
    font-size: 1.75rem;
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