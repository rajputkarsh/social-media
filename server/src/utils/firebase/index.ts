
import dotenv from 'dotenv';
import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage, ref, StorageReference, uploadBytes } from 'firebase/storage';

class FirebaseFunctions {

  #app       : FirebaseApp;
  #storage   : FirebaseStorage;

  constructor(){

    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };

    const app        = initializeApp(firebaseConfig);
    const storage    = getStorage(app);

    console.log(process.env.FIREBASE_STORAGE_BUCKET);

    this.#app = app;
    this.#storage = storage;

  }

  uploadMedia(fileName: string, media: Buffer){
    try{
      const storageRef: StorageReference = ref(this.#storage, fileName);
      return uploadBytes(storageRef, media);
    } catch(error){
      throw error;
    }
  }

}

export default new FirebaseFunctions();