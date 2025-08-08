<template>
  <div class="json-activity">
    <h2 class="activity-title">Activity 1: Import JSON files</h2>
    
    <!-- Authors Section -->
    <section class="data-section">
      <h3 class="section-title">📚 Authors</h3>
      <div class="data-grid">
        <div 
          v-for="author in authors" 
          :key="author.id" 
          class="data-card author-card"
        >
          <h4 class="card-title">{{ author.name }}</h4>
          <div class="card-info">
            <p><span class="label">Nationality:</span> {{ author.nationality }}</p>
            <p><span class="label">Birth Year:</span> {{ author.birthYear }}</p>
            <p><span class="label">Genre:</span> {{ author.genre }}</p>
            <div class="works">
              <span class="label">Famous Works:</span>
              <ul>
                <li v-for="work in author.famousWorks" :key="work">{{ work }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bookstores Section -->
    <section class="data-section">
      <h3 class="section-title">🏪 Bookstores</h3>
      <div class="data-grid">
        <div 
          v-for="store in bookstores" 
          :key="store.id" 
          class="data-card store-card"
        >
          <h4 class="card-title">{{ store.name }}</h4>
          <div class="card-info">
            <p><span class="label">Location:</span> {{ store.location }}</p>
            <p><span class="label">Established:</span> {{ store.established }}</p>
            <p><span class="label">Type:</span> {{ store.type }}</p>
            <div class="specialties">
              <span class="label">Specialties:</span>
              <ul>
                <li v-for="specialty in store.specialties" :key="specialty">{{ specialty }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activity 2: Computed Properties -->
    <section class="data-section">
      <h3 class="section-title">🧮 Activity 2: Computed Properties</h3>
      
      <!-- Activity 2.1: Modern Authors (Born After 1850) -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 2.1: Authors Born After 1850</h4>
        <div class="computed-result">
          <p class="result-count">Found {{ modernAuthors.length }} modern authors:</p>
          <div class="author-list">
            <div 
              v-for="author in modernAuthors" 
              :key="author.id"
              class="mini-card modern-author"
            >
              <span class="author-name">{{ author.name }}</span>
              <span class="author-year">({{ author.birthYear }})</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity 2.2: All Famous Works -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 2.2: All Famous Works</h4>
        <div class="computed-result">
          <p class="result-count">Total {{ allFamousWorks.length }} famous works:</p>
          <div class="works-grid">
            <div 
              v-for="(work, index) in allFamousWorks" 
              :key="index"
              class="work-tag"
            >
              {{ work }}
            </div>
          </div>
        </div>
      </div>

      <!-- Activity 3: Search Specific Author -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 3: Search for "George Orwell"</h4>
        <div class="computed-result">
          <div v-if="searchedAuthor" class="author-detail">
            <h5>{{ searchedAuthor.name }}</h5>
            <p><strong>Nationality:</strong> {{ searchedAuthor.nationality }}</p>
            <p><strong>Birth Year:</strong> {{ searchedAuthor.birthYear }}</p>
            <p><strong>Genre:</strong> {{ searchedAuthor.genre }}</p>
            <p><strong>Famous Works:</strong></p>
            <ul>
              <li v-for="work in searchedAuthor.famousWorks" :key="work">{{ work }}</li>
            </ul>
          </div>
          <p v-else class="not-found">Author not found</p>
        </div>
      </div>

      <!-- Activity 4: Find Author by ID -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 4: Find Author by ID (ID: 1)</h4>
        <div class="computed-result">
          <div v-if="authorById" class="author-detail">
            <h5>{{ authorById.name }}</h5>
            <p><strong>ID:</strong> {{ authorById.id }}</p>
            <p><strong>Nationality:</strong> {{ authorById.nationality }}</p>
            <p><strong>Birth Year:</strong> {{ authorById.birthYear }}</p>
            <p><strong>Genre:</strong> {{ authorById.genre }}</p>
            <p><strong>Famous Works:</strong></p>
            <ul>
              <li v-for="work in authorById.famousWorks" :key="work">{{ work }}</li>
            </ul>
          </div>
          <p v-else class="not-found">Author with this ID not found</p>
        </div>
      </div>
    </section>

    <!-- Activity 3: v-for Directive -->
    <section class="data-section">
      <h3 class="section-title">🔄 Activity 3: v-for Directive</h3>
      
      <!-- Activity 3.1: Render all author names and birth years -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 3.1: All Authors with Birth Years</h4>
        <div class="computed-result">
          <h5>Iterating through Arrays</h5>
          <ul class="author-birth-list">
            <li v-for="author in authors" :key="author.id" class="author-birth-item">
              {{ author.name }} ({{ author.birthYear }})
            </li>
          </ul>
        </div>
      </div>

      <!-- Activity 3.2: Render modern authors (born after 1850) -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 3.2: Modern Authors (Born After 1850)</h4>
        <div class="computed-result">
          <h5>Filtering Arrays</h5>
          <p class="result-description">Authors born after 1850:</p>
          <ul class="modern-authors-list">
            <li v-for="author in modernAuthors" :key="author.id" class="modern-author-item">
              {{ author.name }} ({{ author.birthYear }})
            </li>
          </ul>
        </div>
      </div>

      <!-- Activity 3.3: Render all famous works -->
      <div class="computed-section">
        <h4 class="computed-title">Activity 3.3: All Famous Works</h4>
        <div class="computed-result">
          <h5>Mapping Arrays</h5>
          <p class="result-description">Famous works:</p>
          <ul class="famous-works-list">
            <li v-for="work in allFamousWorks" :key="work" class="work-item">
              {{ work }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Activity 1: Import JSON files (authors.json and bookstores.json)
import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

// Activity 2.1: Get Authors Born After 1850
const modernAuthors = computed(() =>
  authors.filter(author => author.birthYear > 1850)
);

// Activity 2.2: Get All Famous Works
const allFamousWorks = computed(() =>
  authors.flatMap(author => author.famousWorks)
);

// Activity 3: Search for specific author (example: George Orwell)
const searchedAuthor = computed(() =>
  authors.find(author => author.name === "George Orwell")
);

// Activity 4: Find author by specific ID (example: ID 1)
const authorById = computed(() =>
  authors.find(author => author.id === 1)
);
</script>

<style scoped>
.json-activity {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.activity-title {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 3px solid #3498db;
  padding-bottom: 1rem;
}

.data-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 4px solid #3498db;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.data-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.author-card {
  border-left: 4px solid #e74c3c;
}

.store-card {
  border-left: 4px solid #27ae60;
}

.card-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.card-info p {
  margin: 0.5rem 0;
  line-height: 1.4;
}

.label {
  font-weight: 600;
  color: #555;
}

.works, .specialties {
  margin-top: 1rem;
}

.works ul, .specialties ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}

.works li, .specialties li {
  margin: 0.3rem 0;
  color: #666;
  font-size: 0.9rem;
}

/* Computed Properties Styles */
.computed-section {
  background: #f8f9fa;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.computed-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.computed-result {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.result-count {
  font-weight: 600;
  color: #3498db;
  margin-bottom: 1rem;
}

.author-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.mini-card {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #e3f2fd;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #2196f3;
}

.modern-author .author-name {
  font-weight: 600;
  color: #1976d2;
}

.modern-author .author-year {
  font-size: 0.9rem;
  color: #666;
}

.works-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.work-tag {
  background: #e8f5e8;
  color: #2e7d32;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid #4caf50;
}

.author-detail {
  background: #fff3e0;
  padding: 1rem;
  border-radius: 6px;
  border-left: 3px solid #ff9800;
}

.author-detail h5 {
  color: #e65100;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.author-detail p {
  margin: 0.3rem 0;
  color: #5d4037;
}

.author-detail ul {
  margin: 0.5rem 0 0 1rem;
  color: #5d4037;
}

.not-found {
  color: #d32f2f;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

/* Activity 3: v-for Directive Styles */
.result-description {
  font-weight: 600;
  color: #3498db;
  margin-bottom: 1rem;
}

.author-birth-list,
.modern-authors-list,
.famous-works-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.author-birth-item,
.modern-author-item,
.work-item {
  background: #f8f9fa;
  margin: 0.5rem 0;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  transition: all 0.2s ease;
}

.author-birth-item:hover,
.modern-author-item:hover,
.work-item:hover {
  background: #e3f2fd;
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
}

.modern-author-item {
  border-left-color: #e74c3c;
  background: #fdf2f2;
}

.modern-author-item:hover {
  background: #fce4ec;
}

.work-item {
  border-left-color: #27ae60;
  background: #f1f8e9;
}

.work-item:hover {
  background: #e8f5e8;
}

.computed-result h5 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .json-activity {
    padding: 1rem;
  }
  
  .activity-title {
    font-size: 2rem;
  }
  
  .data-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .data-card {
    padding: 1rem;
  }
  
  .computed-section {
    padding: 1rem;
  }
  
  .author-list {
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .works-grid {
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .author-birth-item,
  .modern-author-item,
  .work-item {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .author-birth-item:hover,
  .modern-author-item:hover,
  .work-item:hover {
    transform: translateX(2px);
  }
}
</style> 