import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
// import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth } from './config'
// import { db } from './config'

// Register user with email and password
export const registerUser = async (userData) => {
  try {
    const { email, password, username, role } = userData
    
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Update the user's display name to include role info
    await updateProfile(user, {
      displayName: `${username}|${role}` // Store role in displayName temporarily
    })
    
    // Note: Firestore disabled temporarily - using displayName to store role
    console.log('User registered successfully with Firebase Auth only')
    
    return {
      success: true,
      user: {
        uid: user.uid,
        username: username,
        email: email,
        role: role
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Login user with email and password
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Parse username and role from displayName
    const displayNameParts = user.displayName ? user.displayName.split('|') : ['User', 'student']
    const username = displayNameParts[0] || 'User'
    const role = displayNameParts[1] || 'student'
    
    return {
      success: true,
      user: {
        uid: user.uid,
        username: username,
        email: user.email,
        role: role
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Listen for authentication state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Check if user exists by email (for registration validation)
export const checkUserExists = async (email) => {
  try {
    // This is a simplified check - in a real app you might use Firebase Auth's fetchSignInMethodsForEmail
    // For now, we'll just try to sign in and catch the error
    return false // We'll assume user doesn't exist for simplicity
  } catch (error) {
    return false
  }
} 