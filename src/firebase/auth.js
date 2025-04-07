// src/firebase/auth.js
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged as firebaseOnAuthStateChanged, // Alias to avoid naming conflicts
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut // Alias to avoid naming conflicts
} from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig'; // Import your config

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Create a Google Auth provider instance

// --- Export the functions needed by the rest of your app ---

/**
 * Listens for changes in the user's authentication state.
 * @param {function} callback - Function to call with the user object (or null) when state changes.
 * @returns {function} - Unsubscribe function.
 */
export const onAuthStateChanged = (callback) => {
    // Pass the auth instance and the callback to the original onAuthStateChanged
    return firebaseOnAuthStateChanged(auth, callback);
};

/**
 * Initiates the Google Sign-In popup flow.
 * @returns {Promise<UserCredential>} - Promise resolving with user credential on success.
 */
export const signInWithGoogle = () => {
    // Use the auth instance and the specific provider
    return signInWithPopup(auth, googleProvider);
};

/**
 * Signs the current user out.
 * @returns {Promise<void>} - Promise resolving when sign out is complete.
 */
export const signOut = () => {
    // Use the auth instance
    return firebaseSignOut(auth);
};

// Optional: export auth instance if needed directly elsewhere, though usually wrappers are better.
// export { auth };