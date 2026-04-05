import { db, isPlaceholder } from '../firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, getDocFromServer, runTransaction, increment } from 'firebase/firestore';

export const addTransaction = async (userId: string, transaction: any) => {
  if (isPlaceholder) return { id: 'mock-id' };
  return await addDoc(collection(db as any, `users/${userId}/transactions`), transaction);
};

export const getTransactions = async (userId: string) => {
  if (isPlaceholder) return [];
  const q = query(collection(db as any, `users/${userId}/transactions`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getNextInvoiceNumber = async (userId: string) => {
  if (isPlaceholder) return 1;
  const settingsRef = doc(db as any, `users/${userId}/settings`, 'company');
  return await runTransaction(db as any, async (transaction) => {
    const settingsDoc = await transaction.get(settingsRef);
    const lastInvoiceNumber = settingsDoc.exists() ? (settingsDoc.data().lastInvoiceNumber || 0) : 0;
    const nextInvoiceNumber = lastInvoiceNumber + 1;
    transaction.update(settingsRef, { lastInvoiceNumber: nextInvoiceNumber });
    return nextInvoiceNumber;
  });
};

export const addInvoice = async (userId: string, invoice: any) => {
  if (isPlaceholder) return { id: 'mock-id' };
  const nextInvoiceNumber = await getNextInvoiceNumber(userId);
  const invoiceNumber = `INV-${String(nextInvoiceNumber).padStart(3, '0')}`;
  return await addDoc(collection(db as any, `users/${userId}/invoices`), { ...invoice, id: invoiceNumber });
};

export const getInvoices = async (userId: string) => {
  if (isPlaceholder) return [];
  const q = query(collection(db as any, `users/${userId}/invoices`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addClient = async (userId: string, client: any) => {
  if (isPlaceholder) return { id: 'mock-id' };
  return await addDoc(collection(db as any, `users/${userId}/clients`), client);
};

export const getClients = async (userId: string) => {
  if (isPlaceholder) return [];
  const q = query(collection(db as any, `users/${userId}/clients`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateClient = async (userId: string, clientId: string, client: any) => {
  if (isPlaceholder) return;
  return await updateDoc(doc(db as any, `users/${userId}/clients`, clientId), client);
};

export const deleteClient = async (userId: string, clientId: string) => {
  if (isPlaceholder) return;
  return await deleteDoc(doc(db as any, `users/${userId}/clients`, clientId));
};

export const addTemplate = async (userId: string, template: any) => {
  if (isPlaceholder) return { id: 'mock-id' };
  return await addDoc(collection(db as any, `users/${userId}/templates`), template);
};

export const getTemplates = async (userId: string) => {
  if (isPlaceholder) return [];
  const q = query(collection(db as any, `users/${userId}/templates`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCompanySettings = async (userId: string, settings: any) => {
  if (isPlaceholder) return;
  return await updateDoc(doc(db as any, `users/${userId}/settings`, 'company'), settings);
};

export const getCompanySettings = async (userId: string) => {
  if (isPlaceholder) return null;
  const docRef = doc(db as any, `users/${userId}/settings`, 'company');
  const docSnap = await getDocFromServer(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const addEmployee = async (userId: string, employee: any) => {
  if (isPlaceholder) return { id: 'mock-id' };
  return await addDoc(collection(db as any, `users/${userId}/employees`), employee);
};

export const getEmployees = async (userId: string) => {
  if (isPlaceholder) return [];
  const q = query(collection(db as any, `users/${userId}/employees`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTaxJurisdictions = async () => {
  if (isPlaceholder) return [];
  const q = query(collection(db as any, 'taxJurisdictions'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
