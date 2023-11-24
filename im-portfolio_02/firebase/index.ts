import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  getDocs,
  collection,
  Firestore,
  QuerySnapshot,
  doc,
  addDoc,
  DocumentReference,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db: Firestore = getFirestore(app);
const storage = getStorage();

const handleError = (error: unknown) => {
  console.log(error);
  alert("권한이 없습니다.");
};

const fetchCollectionData = async (collectionName: string): Promise<any[]> => {
  try {
    const querySnapshot: QuerySnapshot = await getDocs(
      collection(db, collectionName)
    );
    const collectionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Record<string, any>),
    }));

    return collectionData;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const addFirestore = async (
  collectionName: string,
  documentData: Record<string, any>
): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, collectionName),
      documentData
    );
    return docRef.id;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const updateFirestore = async (
  collectionName: string,
  documentId: string,
  updatedData: Record<string, any>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const deleteFirestore = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const uploadImage = async (imageFile: File): Promise<string> => {
  try {
    const storageRef: StorageReference = ref(
      storage,
      "images/" + imageFile.name
    );
    const snapshot = await uploadBytes(storageRef, imageFile);

    const downloadURL: string = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const saveDownloadURLToFirestore = async (
  collectionName: string,
  downloadURL: string
): Promise<void> => {
  try {
    const dataToSave = {
      imageUrl: downloadURL,
    };

    await addFirestore(collectionName, dataToSave);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export {
  fetchCollectionData,
  addFirestore,
  updateFirestore,
  deleteFirestore,
  uploadImage,
  saveDownloadURLToFirestore,
};
