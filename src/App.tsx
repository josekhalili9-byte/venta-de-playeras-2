import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, ChevronRight, Globe, Star, PenTool, Clock, X } from 'lucide-react';
import { useJerseys } from './store';
import { Category, Jersey } from './types';
import AdminPanel from './components/AdminPanel';

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'Las 5 Grandes Ligas': <Globe className="w-5 h-5" />,
  'Playeras Firmadas': <PenTool className="w-5 h-5" />,
  'Playeras de Selecciones': <Shield className="w-5 h-5" />,
  'Playeras Más Recientes': <Clock className="w-5 h-5" />
};

export default function App() {
  const { jerseys, isLoaded, addJersey, updateJersey, deleteJersey } = useJerseys();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '8718') {
      setShowAdminPanel(true);
      setShowAdminLogin(false);
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div></div>;

  const categories: Category[] = [
    'Las 5 Grandes Ligas',
    'Playeras Firmadas',
    'Playeras de Selecciones',
    'Playeras Más Recientes'
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-gold selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Shield className="w-8 h-8 text-gold" />
            <span className="font-display font-bold text-2xl tracking-wider uppercase">
              Jersey <span className="text-gold">Legends</span>
            </span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowAdminLogin(true)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5"
          >
            <Lock className="w-4 h-4" />
            Admin
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 stadium-lights"></div>
        <div className="absolute inset-0 pitch-bg opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#050505]"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-semibold tracking-widest uppercase mb-6">
              Colección Premium
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
              Viste la <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">Historia</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              El catálogo definitivo de camisetas de fútbol. Desde leyendas inmortales hasta las nuevas promesas del deporte rey.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Catalog Sections */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-32">
        {categories.map((category, index) => {
          const categoryJerseys = jerseys.filter(j => j.category === category);
          if (categoryJerseys.length === 0) return null;

          return (
            <section key={category} className="relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-4 mb-12"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pitch-light to-pitch flex items-center justify-center border border-white/10 text-gold">
                  {CATEGORY_ICONS[category]}
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide">
                  {category}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryJerseys.map((jersey, i) => (
                  <motion.div
                    key={jersey.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/50 transition-colors duration-300"
                  >
                    <div className="aspect-[4/5] overflow-hidden relative bg-zinc-800">
                      <div className="absolute inset-0 net-pattern opacity-20 mix-blend-overlay z-10"></div>
                      <img 
                        src={jersey.imageUrl} 
                        alt={jersey.team}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-6 z-30">
                        <div className="flex justify-between items-end mb-2">
                          <h3 className="text-xl font-display font-bold uppercase leading-tight">{jersey.team}</h3>
                          <span className="text-gold font-mono text-sm font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{jersey.season}</span>
                        </div>
                        {jersey.description && <p className="text-sm text-zinc-400 line-clamp-2">{jersey.description}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 net-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <Shield className="w-10 h-10 text-zinc-800 mx-auto mb-6" />
          <p className="text-zinc-500 font-display uppercase tracking-widest text-sm">
            Jersey Legends © {new Date().getFullYear()}
          </p>
          <p className="text-zinc-600 text-xs mt-2">Solo catálogo. No se realizan ventas.</p>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-200"></div>
              <button onClick={() => setShowAdminLogin(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                  <Lock className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase">Acceso Admin</h3>
                <p className="text-zinc-400 text-sm mt-1">Ingresa la clave para continuar</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className={`w-full bg-zinc-950 border ${loginError ? 'border-red-500' : 'border-zinc-800'} rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-gold transition-colors`}
                    autoFocus
                  />
                  {loginError && <p className="text-red-500 text-xs text-center mt-2">Clave incorrecta. Acceso denegado.</p>}
                </div>
                <button type="submit" className="w-full bg-white text-black hover:bg-gold font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Ingresar <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Dashboard */}
      <AnimatePresence>
        {showAdminPanel && (
          <AdminPanel 
            jerseys={jerseys}
            onAdd={addJersey}
            onUpdate={updateJersey}
            onDelete={deleteJersey}
            onClose={() => setShowAdminPanel(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
