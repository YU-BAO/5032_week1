import { db } from './config'
import { doc, setDoc, getDoc } from 'firebase/firestore'

// Test Firestore connection
export const testFirestoreConnection = async () => {
  try {
    // Try to write a test document
    const testRef = doc(db, 'test', 'connection')
    await setDoc(testRef, {
      message: 'Firestore connection successful!',
      timestamp: new Date().toISOString()
    })
    
    // Try to read the test document
    const testDoc = await getDoc(testRef)
    if (testDoc.exists()) {
      console.log('✅ Firestore connection successful!')
      console.log('Test data:', testDoc.data())
      return { success: true, message: 'Firestore is working correctly!' }
    } else {
      return { success: false, message: 'Could not read test document' }
    }
  } catch (error) {
    console.error('❌ Firestore connection failed:', error)
    return { success: false, message: error.message }
  }
}

// Call this function to test
// testFirestoreConnection() 