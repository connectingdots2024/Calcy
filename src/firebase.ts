import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, onSnapshot, query, where, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Check if we are using placeholder config
const isPlaceholder = firebaseConfig.apiKey === 'PLACEHOLDER_API_KEY';

let db: any;
let auth: any;

if (isPlaceholder) {
  console.warn("Using Mock Firebase because real configuration is missing or invalid.");
  
  // Mock Auth
  const mockUser: any = {
    uid: 'mock-user-123',
    email: 'demo@calcy.app',
    displayName: 'Demo User',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
  };

  let authChangeListeners: ((user: User | null) => void)[] = [];
  let currentUser: User | null = JSON.parse(localStorage.getItem('mock_user') || 'null');

  auth = {
    currentUser,
    onAuthStateChanged: (callback: (user: User | null) => void) => {
      authChangeListeners.push(callback);
      callback(currentUser);
      return () => {
        authChangeListeners = authChangeListeners.filter(l => l !== callback);
      };
    },
    signOut: async () => {
      currentUser = null;
      localStorage.removeItem('mock_user');
      authChangeListeners.forEach(l => l(null));
    }
  };

  // Mock Firestore
  db = {}; // Placeholder for mock db logic if needed, but we'll handle it in hooks/services
} else {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);

  async function testConnection() {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration. The client appears to be offline.");
      }
    }
  }
  testConnection();
}

export { db, auth, isPlaceholder };
