
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyAGE8g_1UHI0jWzl2AFOuoi5qhtINCGfiI",
  authDomain: "net-run-rate.firebaseapp.com",
  databaseURL: "https://net-run-rate-default-rtdb.firebaseio.com",
  projectId: "net-run-rate",
  storageBucket: "net-run-rate.firebasestorage.app",
  messagingSenderId: "649575411251",
  appId: "1:649575411251:web:13db62c61b00338ed17d46",
  measurementId: "G-GN6MRFJ8HD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { app, analytics ,db };
