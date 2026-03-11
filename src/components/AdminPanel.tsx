import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { Jersey, Category } from '../types';

interface AdminPanelProps {
  jerseys: Jersey[];
  onAdd: (jersey: Omit<Jersey, 'id'>) => void;
  onUpdate: (id: string, data: Partial<Jersey>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const CATEGORIES: Category[] = [
  'Las 5 Grandes Ligas',
  'Playeras Firmadas',
  'Playeras de Selecciones',
  'Playeras Más Recientes'
];

export default function AdminPanel({ jerseys, onAdd, onUpdate, onDelete, onClose }: AdminPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Jersey, 'id'>>({
    team: '',
    season: '',
    imageUrl: '',
    category: 'Las 5 Grandes Ligas'
  });

  const handleEdit = (jersey: Jersey) => {
    setEditingId(jersey.id);
    setFormData({
      team: jersey.team,
      season: jersey.season,
      imageUrl: jersey.imageUrl,
      category: jersey.category
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      team: '',
      season: '',
      imageUrl: '',
      category: 'Las 5 Grandes Ligas'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert("Por favor, sube una imagen de la camiseta.");
      return;
    }
    if (editingId) {
      onUpdate(editingId, formData);
    } else {
      onAdd(formData);
    }
    handleCancel();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-8"
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-gold" />
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Panel de Control</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Form */}
          <div className="md:col-span-1 bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50 h-fit">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {editingId ? <Edit className="w-4 h-4 text-gold" /> : <Plus className="w-4 h-4 text-gold" />}
              {editingId ? 'Editar Camiseta' : 'Nueva Camiseta'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Equipo / Jugador</label>
                <input required type="text" value={formData.team} onChange={e => setFormData({...formData, team: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors" placeholder="Ej. Real Madrid" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Temporada</label>
                <input required type="text" value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors" placeholder="Ej. 2023/24" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Categoría</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Imagen de la Camiseta</label>
                <div className="relative flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800 hover:border-gold transition-colors overflow-hidden">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-3 text-zinc-500" />
                        <p className="mb-2 text-sm text-zinc-400"><span className="font-semibold text-gold">Haz clic para subir</span></p>
                        <p className="text-xs text-zinc-500">PNG, JPG o WEBP</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, imageUrl: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gold hover:bg-gold-light text-black font-semibold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {editingId ? 'Guardar' : 'Agregar'}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancel} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 rounded-lg text-sm transition-colors">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="md:col-span-2 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {jerseys.length === 0 ? (
              <div className="text-center text-zinc-500 py-10">No hay camisetas en el catálogo.</div>
            ) : (
              jerseys.map(jersey => (
                <div key={jersey.id} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-3 rounded-xl hover:border-zinc-700 transition-colors">
                  <img src={jersey.imageUrl} alt={jersey.team} className="w-16 h-16 object-cover rounded-lg bg-zinc-800" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white truncate">{jersey.team} <span className="text-gold text-sm font-normal ml-2">{jersey.season}</span></h4>
                    <p className="text-xs text-zinc-400 truncate">{jersey.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(jersey)} className="p-2 text-zinc-400 hover:text-gold hover:bg-zinc-800 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(jersey.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
