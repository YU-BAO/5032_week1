<template>
  <div class="book-list-advanced">
    <h2>Advanced Book Queries</h2>
    
    <!-- Query Controls -->
    <div class="query-controls mb-4">
      <div class="row">
        <div class="col-md-4">
          <label class="form-label">Minimum ISBN:</label>
          <input 
            type="number" 
            class="form-control" 
            v-model.number="minIsbn" 
            @change="fetchBooks"
            placeholder="e.g., 1000">
        </div>
        <div class="col-md-4">
          <label class="form-label">Order by:</label>
          <select class="form-select" v-model="orderBy" @change="fetchBooks">
            <option value="isbn">ISBN</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Limit:</label>
          <input 
            type="number" 
            class="form-control" 
            v-model.number="limitCount" 
            @change="fetchBooks"
            min="1" 
            max="50"
            placeholder="e.g., 10">
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div class="results-section">
      <h3>Query Results ({{ books.length }} books found)</h3>
      <div class="query-info mb-3">
        <small class="text-muted">
          Query: WHERE isbn > {{ minIsbn }}, ORDER BY {{ orderBy }}, LIMIT {{ limitCount }}
        </small>
      </div>
      
      <div class="books-grid" v-if="books.length > 0">
        <div v-for="book in books" :key="book.id" class="book-card">
          <div class="book-info">
            <h5>{{ book.name }}</h5>
            <p class="isbn">ISBN: {{ book.isbn }}</p>
            <small class="book-id">ID: {{ book.id }}</small>
          </div>
          <div class="book-actions">
            <button class="btn btn-sm btn-outline-primary me-1" @click="editBook(book)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteBook(book.id)">Delete</button>
          </div>
        </div>
      </div>
      
      <div v-else class="no-results">
        <p class="text-muted">No books found matching the criteria.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const minIsbn = ref(1000);
    const orderBy = ref('isbn');
    const limitCount = ref(10);

    const fetchBooks = async () => {
      try {
        let q = query(
          collection(db, 'books'),
          where('isbn', '>', minIsbn.value)
        );

        // Add ordering
        if (orderBy.value) {
          q = query(q, orderBy(orderBy.value));
        }

        // Add limit
        if (limitCount.value) {
          q = query(q, limit(limitCount.value));
        }

        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((docSnap) => {
          booksArray.push({ id: docSnap.id, ...docSnap.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
        alert('Error fetching books: ' + error.message);
      }
    };

    const editBook = async (book) => {
      const newName = prompt('Enter new book name:', book.name);
      const newIsbn = prompt('Enter new ISBN:', book.isbn);
      
      if (newName && newIsbn) {
        try {
          const bookRef = doc(db, 'books', book.id);
          await updateDoc(bookRef, {
            name: newName,
            isbn: Number(newIsbn)
          });
          alert('Book updated successfully!');
          fetchBooks(); // Refresh the list
        } catch (error) {
          console.error('Error updating book: ', error);
          alert('Error updating book: ' + error.message);
        }
      }
    };

    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteDoc(doc(db, 'books', bookId));
          alert('Book deleted successfully!');
          fetchBooks(); // Refresh the list
        } catch (error) {
          console.error('Error deleting book: ', error);
          alert('Error deleting book: ' + error.message);
        }
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      minIsbn,
      orderBy,
      limitCount,
      fetchBooks,
      editBook,
      deleteBook
    };
  }
};
</script>

<style scoped>
.book-list-advanced {
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

h3 {
  color: #333;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.query-controls {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.form-label {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-control, .form-select {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
}

.query-info {
  background: #e7f3ff;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border-left: 3px solid #007bff;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.book-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.book-info h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.book-info .isbn {
  margin: 0 0 0.25rem 0;
  color: #007bff;
  font-weight: 500;
  font-size: 0.9rem;
}

.book-info .book-id {
  color: #6c757d;
  font-size: 0.8rem;
}

.book-actions {
  display: flex;
  gap: 0.25rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 6px;
}

/* Responsive */
@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
  
  .book-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .book-actions {
    width: 100%;
    justify-content: center;
  }
}
</style> 