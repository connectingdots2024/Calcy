import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { auth } from '../firebase';
import { getClients, addClient, updateClient, deleteClient } from '../services/firebaseService';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      getClients(auth.currentUser.uid).then(setClients);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    if (editingClient) {
      await updateClient(auth.currentUser.uid, editingClient.id, { name, email });
    } else {
      await addClient(auth.currentUser.uid, { name, email, userId: auth.currentUser.uid });
    }
    
    setName('');
    setEmail('');
    setEditingClient(null);
    setIsModalOpen(false);
    getClients(auth.currentUser.uid).then(setClients);
  };

  const handleDelete = async (clientId: string) => {
    if (!auth.currentUser) return;
    await deleteClient(auth.currentUser.uid, clientId);
    getClients(auth.currentUser.uid).then(setClients);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
        <button 
          onClick={() => { setEditingClient(null); setName(''); setEmail(''); setIsModalOpen(true); }}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
        >
          <Plus size={18} className="mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                <td className="px-6 py-4 text-slate-500">{client.email}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => { setEditingClient(client); setName(client.name); setEmail(client.email); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-primary-600">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(client.id)} className="p-2 text-slate-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{editingClient ? 'Edit Client' : 'Add Client'}</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" required />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Clients;
