<template>
  <div class="yuxuan-component">
    <div class="welcome-card">
      <h2 class="name-title">👋 Hello, I'm Yuxuan!</h2>
      <div class="info-section">
        <p class="intro">Welcome to my Vue.js project!</p>
        <div class="details">
          <div class="detail-item">
            <span class="label">Name:</span>
            <span class="value">Yuxuan</span>
          </div>
          <div class="detail-item">
            <span class="label">Project:</span>
            <span class="value">5032 Week 1 Assignment</span>
          </div>
          <div class="detail-item">
            <span class="label">Tech Stack:</span>
            <span class="value">Vue.js 3 + Vite</span>
          </div>
          <div class="detail-item">
            <span class="label">Status:</span>
            <span class="value">🚀 Learning...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// This is Yuxuan's personal component
import { ref, onMounted } from 'vue'

const currentTime = ref('')

onMounted(() => {
  const updateTime = () => {
    currentTime.value = new Date().toLocaleString()
  }
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
.yuxuan-component {
  margin: 2rem 0;
  padding: 1rem;
}

.welcome-card {
  background: white;
  color: #333;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
}

.name-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #2c3e50;
}

.intro {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
}

.details {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.label {
  font-weight: bold;
  color: #495057;
}

.value {
  font-weight: 500;
  text-align: right;
  color: #343a40;
}

@media (max-width: 768px) {
  .welcome-card {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .name-title {
    font-size: 1.5rem;
  }
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  
  .value {
    text-align: left;
  }
}
</style> 