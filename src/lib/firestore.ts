import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getDocument<T>(path: string): Promise<T | null> {
  const snap = await getDoc(doc(db, path));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function setDocument<T extends DocumentData>(
  path: string,
  data: WithFieldValue<T>
): Promise<void> {
  await setDoc(doc(db, path), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function updateDocument<T extends DocumentData>(
  path: string,
  data: Partial<T>
): Promise<void> {
  await updateDoc(doc(db, path), { ...data, updatedAt: serverTimestamp() } as DocumentData);
}

export async function deleteDocument(path: string): Promise<void> {
  await deleteDoc(doc(db, path));
}

export async function getCollection<T>(
  collectionPath: string,
  orderByField?: string
): Promise<T[]> {
  const ref = collection(db, collectionPath);
  const q = orderByField
    ? query(ref, orderBy(orderByField, "desc"))
    : query(ref);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

export async function addToCollection<T extends DocumentData>(
  collectionPath: string,
  data: WithFieldValue<T>
): Promise<string> {
  const ref = doc(collection(db, collectionPath));
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() });
  return ref.id;
}
