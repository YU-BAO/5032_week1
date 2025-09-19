import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from './config'

// User data operations
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateUserData = async (uid, userData) => {
  try {
    await updateDoc(doc(db, 'users', uid), userData)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Library registration data operations
export const saveLibraryRegistration = async (userId, registrationData) => {
  try {
    const registrationRef = await addDoc(collection(db, 'libraryRegistrations'), {
      userId: userId,
      ...registrationData,
      submittedAt: new Date().toISOString()
    })
    return { success: true, id: registrationRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getLibraryRegistrations = async (userId = null) => {
  try {
    let q = collection(db, 'libraryRegistrations')
    
    if (userId) {
      q = query(collection(db, 'libraryRegistrations'), where('userId', '==', userId))
    } else {
      q = query(collection(db, 'libraryRegistrations'), orderBy('submittedAt', 'desc'))
    }
    
    const querySnapshot = await getDocs(q)
    const registrations = []
    querySnapshot.forEach((doc) => {
      registrations.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, data: registrations }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get all users (admin function)
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const users = []
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, data: users }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete user data (admin function)
export const deleteUser = async (uid) => {
  try {
    await deleteDoc(doc(db, 'users', uid))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
} 