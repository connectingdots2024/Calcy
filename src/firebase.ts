import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, onSnapshot, query, where, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Check if we are using placeholder config
const isPlaceholder = !firebaseConfig.apiKey || firebaseConfig.apiKey === 'PLACEHOLDER_API_KEY' || firebaseConfig.apiKey.includes('TODO');

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
    },
    _notify: (user: User | null) => {
      currentUser = user;
      auth.currentUser = user;
      authChangeListeners.forEach(l => l(user));
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

// Unified Sign In with Google
const signInWithGoogle = async () => {
  if (isPlaceholder) {
    const mockUser = {
      uid: 'mock-user-123',
      email: 'demo@calcy.app',
      displayName: 'Demo User',
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    } as any;
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    
    if (auth._notify) {
      auth._notify(mockUser);
    }
    return mockUser;
  }

  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const appSignOut = async () => {
  if (isPlaceholder) {
    if (auth.signOut) {
      await auth.signOut();
    }
    return;
  }
  await signOut(auth);
};

// Dedicated Demo Sign In (Always works, even if real Firebase is configured)
const signInDemo = async () => {
  const mockUser = {
    uid: 'mock-user-123',
    email: 'demo@calcy.app',
    displayName: 'Demo User',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
  } as any;
  
  localStorage.setItem('mock_user', JSON.stringify(mockUser));
  
  if (isPlaceholder) {
    if (auth._notify) {
      auth._notify(mockUser);
    }
  } else {
    // If real Firebase is active, we might need a different way to "mock" it
    // or just force a reload so the app can pick up the mock user if we implement it that way.
    // For now, let's just use the same notification if we can, 
    // but we need to make sure the app knows to check for mock user.
    window.location.reload(); 
  }
  return mockUser;
};

export { db, auth, isPlaceholder, signInWithGoogle, signInDemo, appSignOut as signOut };
