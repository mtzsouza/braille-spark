import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {} // Inject Firestore via constructor

 //   USAGE: 
 //   const data = this.database.fetchDocumentById('users', 'id').then(data => {})

  async addData(collectionName: string, data: any): Promise<void> {
    const ref = collection(this.firestore, collectionName);
    try {
      await addDoc(ref, data);
      console.log('Data added successfully');
    } catch (error) {
      console.error('Error adding data: ', error);
    }
  }

  async addDataWithCustomId(collectionName: string, data: any, customId: string): Promise<void> {
    const ref = doc(this.firestore, collectionName, customId);
    try {
      await setDoc(ref, data);
      console.log('Data added successfully with custom ID');
    } catch (error) {
      console.error('Error adding data with custom ID: ', error);
    }
  }

  async updateField(collectionName: string, docId: string, field: string, value: any): Promise<void> {
    const ref = doc(this.firestore, collectionName, docId);
    try {
      await updateDoc(ref, { [field]: value });
      console.log('Field updated successfully');
    } catch (error) {
      console.error('Error updating field: ', docId, error);
    }
  }

  async fetchCollection(collectionName: string): Promise<any[]> {
    const ref = collection(this.firestore, collectionName);
    try {
      const snapshot = await getDocs(ref);
      if (snapshot.empty) {
        throw new Error(`Collection '${collectionName}' does not exist or is empty`);
      }
      const data = snapshot.docs.map(doc => doc.data());
      console.log('Collection fetched successfully');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async fetchDocumentById(collectionName: string, documentId: string): Promise<any | null> {
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        console.log('Document fetched successfully');
        return docSnapshot.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
      return null;
    }
  }
}
