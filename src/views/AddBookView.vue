<template>
  <div class="add-book-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <h1 class="text-center mb-4">Add Book</h1>
          
          <div class="form-wrapper">
            <form @submit.prevent="addBook">
              <div class="mb-3">
                <label for="isbn" class="form-label">ISBN:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="isbn" 
                  v-model="isbn" 
                  required />
              </div>
              
              <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  v-model="name" 
                  required />
              </div>
              
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Add Book</button>
              </div>
            </form>
          </div>

          <!-- Basic BookList Component (as required by tutorial) -->
          <BookList />

          <!-- Advanced BookList Component (for Week 8.2) -->
          <BookListAdvanced />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';
import BookListAdvanced from '../components/BookListAdvanced.vue';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });

        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
        
        // Refresh the book lists
        window.location.reload();
      } catch (error) {
        console.error('Error adding book: ', error);
        alert('Error adding book: ' + error.message);
      }
    };

    return {
      isbn,
      name,
      addBook
    };
  },
  components: {
    BookList,
    BookListAdvanced
  }
};
</script>

<style scoped>
.add-book-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
}

.form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-label {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-control {
  border: 2px solid #dee2e6;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: none;
  outline: none;
}

.btn {
  padding: 0.75rem 2rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.15s ease-in-out;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

h1 {
  color: #333;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
}
</style> 