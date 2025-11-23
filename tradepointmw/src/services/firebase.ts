import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Load firebase config from project root if present, otherwise fallback to env.
let firebaseConfig: any;
try {
  // try to load a firebaseConfig file at project root (optional)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  firebaseConfig = require('../../firebaseConfig').default;
} catch (e) {
  // fall back to process.env (expo supports process.env via app.config)
  firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
}

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// Auth
export async function signUpWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Users collection
const USERS = 'users';
export async function createUserProfile(uid: string, data: any) {
  const ref = doc(db, USERS, uid);
  await setDoc(ref, { ...data, createdAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(uid: string) {
  const ref = doc(db, USERS, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateUserProfile(uid: string, data: any) {
  const ref = doc(db, USERS, uid);
  await updateDoc(ref, data);
}

// Listings
const LISTINGS = 'listings';
export async function createListing(data: any) {
  const col = collection(db, LISTINGS);
  const docRef = await addDoc(col, { ...data, createdAt: serverTimestamp() });
  return docRef.id;
}

export async function updateListing(listingId: string, data: any) {
  const ref = doc(db, LISTINGS, listingId);
  await updateDoc(ref, data);
}

export async function deleteListing(listingId: string) {
  const ref = doc(db, LISTINGS, listingId);
  await deleteDoc(ref);
}

export async function fetchListings({ search = '', filters = {} as any, limitTo = 50 } = {}) {
  let q = query(collection(db, LISTINGS), orderBy('createdAt', 'desc'));
  // basic text search (naive): filter by title contains (client-side)
  const snaps = await getDocs(q);
  const items: any[] = [];
  snaps.forEach((d) => items.push({ id: d.id, ...d.data() }));
  const lowered = search.toLowerCase();
  let results = items;
  if (search) {
    results = items.filter((it) => (it.title || '').toLowerCase().includes(lowered) || (it.description || '').toLowerCase().includes(lowered));
  }
  // apply simple filters (e.g., category, price range)
  if (filters?.category) results = results.filter((it) => it.category === filters.category);
  if (filters?.minPrice != null) results = results.filter((it) => (it.price || 0) >= filters.minPrice);
  if (filters?.maxPrice != null) results = results.filter((it) => (it.price || 0) <= filters.maxPrice);
  return results.slice(0, limitTo);
}

// Storage helper
export async function uploadImage(fileBlob: Blob, path: string, onProgress?: (percent: number) => void) {
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, fileBlob as any);
  return new Promise<string>((resolve, reject) => {
    task.on('state_changed', (snapshot) => {
      if (onProgress && snapshot.totalBytes) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(percent);
      }
    }, reject, async () => {
      const url = await getDownloadURL(task.snapshot.ref);
      resolve(url);
    });
  });
}

// Chats
const CHATS = 'chats';
export async function createChat(users: string[]) {
  const col = collection(db, CHATS);
  const docRef = await addDoc(col, { participants: users, createdAt: serverTimestamp() });
  return docRef.id;
}

export async function sendMessage(chatId: string, fromUid: string, text: string) {
  const chatDoc = doc(db, CHATS, chatId);
  const messagesCol = collection(chatDoc, 'messages');
  await addDoc(messagesCol, { from: fromUid, text, createdAt: serverTimestamp() });
}

export function subscribeToChatMessages(chatId: string, cb: (messages: any[]) => void) {
  const chatDoc = doc(db, CHATS, chatId);
  const messagesCol = collection(chatDoc, 'messages');
  const q = query(messagesCol, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snap) => {
    const msgs: any[] = [];
    snap.forEach((d) => msgs.push({ id: d.id, ...d.data() }));
    cb(msgs);
  });
}

export { auth, db, storage };
