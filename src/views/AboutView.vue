<template>
  <div class="about-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <!-- Page Header -->
          <div class="text-center mb-5">
            <h1 class="page-title mb-3">About Our System</h1>
            <p class="page-subtitle">Learn more about our Week 5 Library Registration Platform</p>
          </div>

          <!-- Main Content -->
          <div class="content-wrapper">
            <div class="row">
              <div class="col-12">
                <h3 class="section-title">Library Registration System</h3>
                <p class="lead-text mb-4">
                  Welcome to our Library Registration System! This application was built using Vue.js and Bootstrap 
                  to provide a modern, responsive user experience for library member registration.
                </p>

                <!-- Features Section -->
                <h5 class="section-subtitle">Key Features</h5>
                <div class="row mb-4">
                  <div class="col-md-6">
                    <ul class="feature-list">
                      <li>Form validation with real-time feedback</li>
                      <li>Password strength requirements</li>
                      <li>Password confirmation matching</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <ul class="feature-list">
                      <li>Responsive design for all devices</li>
                      <li>PrimeVue DataTable for displaying user data</li>
                      <li>Vue Router for seamless navigation</li>
                    </ul>
                  </div>
                </div>

                <!-- Technologies Section -->
                <h5 class="section-subtitle">Technologies Used</h5>
                <div class="row mb-4">
                  <div class="col-md-6">
                    <ul class="tech-list">
                      <li>Vue.js 3</li>
                      <li>Vue Router 4</li>
                      <li>Bootstrap 5</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <ul class="tech-list">
                      <li>PrimeVue</li>
                      <li>JavaScript ES6+</li>
                      <li>Responsive CSS</li>
                    </ul>
                  </div>
                </div>

                <!-- Project Info -->
                <div class="project-info text-center">
                  <h6 class="info-title">Project Information</h6>
                  <p class="info-text">
                    <strong>Developed as part of Web Development coursework - Week 5 Assignment</strong>
                  </p>
                  <p class="copyright">© 2024 Week 5 Library System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page logic can go here
</script>

<style scoped>
.about-container {
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

.content-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 0;
  border: 1px solid #e9ecef;
}

.section-title {
  color: #007bff;
  font-weight: 600;
  margin-bottom: 1rem;
}

.lead-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.section-subtitle {
  color: #333;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.feature-list,
.tech-list {
  list-style-type: none;
  padding-left: 0;
}

.feature-list li,
.tech-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  color: #555;
}

.feature-list li:before {
  content: "✓ ";
  color: #28a745;
  font-weight: bold;
  margin-right: 0.5rem;
}

.tech-list li:before {
  content: "• ";
  color: #007bff;
  font-weight: bold;
  margin-right: 0.5rem;
}

.project-info {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.info-title {
  color: #666;
  font-weight: 600;
  margin-bottom: 1rem;
}

.info-text {
  color: #333;
  margin-bottom: 0.5rem;
}

.copyright {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .content-wrapper {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .content-wrapper {
    padding: 1.5rem 1rem;
  }
}
</style> 