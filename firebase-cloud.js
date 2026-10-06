import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getFirestore, doc, setDoc, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const configured = Object.values(firebaseConfig).every(v =>
  typeof v === "string" && v && !v.startsWith("PASTE_")
);

let db = null;
let unsubscribe = null;

if (configured) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

function key(unit, year) {
  return `${unit}_${year}`;
}

export async function saveCloud(unit, year, rows, userLabel="User") {
  if (!db) throw new Error("Firebase config is not filled.");
  await setDoc(doc(db, "misData", key(unit, year)), {
    unit, year, rows,
    updatedAt: serverTimestamp(),
    updatedBy: userLabel
  }, { merge: true });
}

export function listenCloud(unit, year, callback, errorCallback) {
  if (!db) return () => {};
  if (unsubscribe) unsubscribe();
  unsubscribe = onSnapshot(
    doc(db, "misData", key(unit, year)),
    snap => callback(snap.exists() ? snap.data() : null),
    err => errorCallback && errorCallback(err)
  );
  return unsubscribe;
}

export function isConfigured() { return configured; }
