import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight,
  Heart,
  ChevronRight,
  ClipboardList,
  Send
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Vestido de Seda 'Aura'",
    price: "249.00€",
    category: "Mujer",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Chaqueta de Lino Estructurada",
    price: "189.00€",
    category: "Mujer",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Bolso 'Luna' en Piel",
    price: "320.00€",
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Sombrero de Ala Ancha",
    price: "85.00€",
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800",
  },
];

const CATEGORIES = [
  { name: "Mujer", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" },
  { name: "Hombre", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800" },
  { name: "Accesorios", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    product: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsQuoteModalOpen(false);
      setQuoteForm({ name: "", email: "", product: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-brand-paper/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-medium">
              <a href="#" className="hover:text-brand-gold transition-colors">Colecciones</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Editorial</a>
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="hover:text-brand-gold transition-colors uppercase"
              >
                Cotización
              </button>
            </div>
          </div>

          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl md:text-3xl font-serif tracking-tighter font-bold">
              LA MODA <span className="italic font-light text-brand-gold">es</span> VIDA
            </h1>
          </a>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-ink flex"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full md:w-[400px] bg-brand-paper h-full p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-xl font-serif font-bold">Menú</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-brand-ink/5 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8 text-4xl font-serif">
                {["Novedades", "Mujer", "Hombre", "Accesorios", "Rebajas"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:text-brand-gold transition-colors flex items-center justify-between group"
                  >
                    {item}
                    <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => { setIsMenuOpen(false); setIsQuoteModalOpen(true); }}
                  className="text-left hover:text-brand-gold transition-colors flex items-center justify-between group"
                >
                  Cotización
                  <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </motion.button>
              </div>

              <div className="mt-auto pt-12 border-t border-brand-ink/10">
                <div className="flex gap-6 mb-8">
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-brand-gold" />
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-brand-gold" />
                  <Twitter className="w-5 h-5 cursor-pointer hover:text-brand-gold" />
                </div>
                <p className="text-xs text-brand-ink/50 uppercase tracking-widest">
                  © 2026 La Moda es Vida
                </p>
              </div>
            </motion.div>
            <div 
              className="flex-1 hidden md:block cursor-pointer" 
              onClick={() => setIsMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-brand-ink/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-paper w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-brand-ink/5 rounded-full z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                <div className="md:col-span-2 bg-brand-ink p-12 text-brand-paper flex flex-col justify-center">
                  <ClipboardList className="w-12 h-12 text-brand-gold mb-6" />
                  <h2 className="text-3xl font-serif mb-4">Solicita tu Cotización</h2>
                  <p className="text-sm text-brand-paper/60 leading-relaxed">
                    Piezas personalizadas, pedidos especiales o asesoría de imagen exclusiva.
                  </p>
                </div>
                
                <div className="md:col-span-3 p-12">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <Send className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif mb-2">¡Solicitud Enviada!</h3>
                      <p className="text-brand-ink/60">Nos pondremos en contacto contigo en menos de 24 horas.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleQuoteSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Nombre Completo</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Tu nombre"
                          className="w-full bg-transparent border-b border-brand-ink/20 py-2 focus:outline-none focus:border-brand-gold transition-colors"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Correo Electrónico</label>
                        <input 
                          required
                          type="email" 
                          placeholder="email@ejemplo.com"
                          className="w-full bg-transparent border-b border-brand-ink/20 py-2 focus:outline-none focus:border-brand-gold transition-colors"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Interés</label>
                        <select 
                          className="w-full bg-transparent border-b border-brand-ink/20 py-2 focus:outline-none focus:border-brand-gold transition-colors appearance-none"
                          value={quoteForm.product}
                          onChange={(e) => setQuoteForm({...quoteForm, product: e.target.value})}
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="custom">Diseño Personalizado</option>
                          <option value="bulk">Pedido al por Mayor</option>
                          <option value="styling">Asesoría de Imagen</option>
                          <option value="other">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Detalles</label>
                        <textarea 
                          rows={3}
                          placeholder="Cuéntanos más sobre lo que buscas..."
                          className="w-full bg-transparent border-b border-brand-ink/20 py-2 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                          value={quoteForm.message}
                          onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-brand-ink text-brand-paper py-4 rounded-full uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-all"
                      >
                        Enviar Solicitud
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
              alt="Hero Fashion"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-paper/40 to-transparent"></div>
          </div>
          
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-semibold mb-6 block text-brand-ink/70">
                Nueva Colección Primavera 2026
              </span>
              <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 tracking-tighter">
                Elegancia <br /> 
                <span className="italic font-light text-brand-gold">en cada</span> <br />
                Detalle
              </h2>
              <p className="text-lg text-brand-ink/80 mb-10 max-w-md leading-relaxed">
                Descubre una selección curada de piezas que trascienden el tiempo. Moda que cuenta tu historia.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center gap-4 bg-brand-ink text-brand-paper px-8 py-4 rounded-full hover:bg-brand-gold transition-all duration-300">
                  <span className="uppercase text-xs tracking-widest font-bold">Explorar Ahora</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="group flex items-center gap-4 border border-brand-ink text-brand-ink px-8 py-4 rounded-full hover:bg-brand-ink hover:text-brand-paper transition-all duration-300"
                >
                  <span className="uppercase text-xs tracking-widest font-bold">Solicitar Cotización</span>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-12 right-12 hidden lg:block">
            <div className="vertical-text flex items-center gap-4 text-xs uppercase tracking-[0.5em] font-medium opacity-50">
              <div className="w-px h-24 bg-brand-ink"></div>
              Desliza para descubrir
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Nuestras Categorías</h2>
              <p className="text-brand-ink/60 uppercase text-xs tracking-widest">Explora por estilo</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
              Ver Todo <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-ink/20 group-hover:bg-brand-ink/40 transition-colors"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl text-brand-paper font-serif mb-2">{cat.name}</h3>
                  <div className="w-0 group-hover:w-12 h-px bg-brand-paper transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote CTA Section */}
        <section className="py-24 bg-brand-gold/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">¿Buscas algo exclusivo?</h2>
              <p className="text-lg text-brand-ink/70 mb-8 leading-relaxed">
                Ofrecemos servicios de cotización personalizada para eventos, diseño a medida y pedidos especiales. Nuestro equipo de expertos te ayudará a materializar tu visión.
              </p>
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-brand-ink text-brand-paper px-10 py-4 rounded-full uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-all"
              >
                Obtener Cotización Gratis
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=600" 
                  alt="Custom Design 1" 
                  className="rounded-2xl aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600" 
                  alt="Custom Design 2" 
                  className="rounded-2xl aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600" 
                  alt="Custom Design 3" 
                  className="rounded-2xl aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=600" 
                  alt="Custom Design 4" 
                  className="rounded-2xl aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-white/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Piezas Destacadas</h2>
              <p className="text-brand-ink/60 uppercase text-xs tracking-widest">Lo más deseado de la temporada</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg bg-brand-paper">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-brand-paper/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="absolute bottom-0 left-0 right-0 bg-brand-ink text-brand-paper py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 uppercase text-[10px] tracking-[0.2em] font-bold">
                      Añadir al Carrito
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-ink/50 mb-1">{product.category}</p>
                      <h3 className="font-serif text-lg group-hover:text-brand-gold transition-colors">{product.name}</h3>
                    </div>
                    <p className="font-medium text-sm">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial / Brand Story */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden mask-oval">
                <img 
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200" 
                  alt="Brand Story"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-gold rounded-full flex items-center justify-center p-8 text-center text-brand-paper font-serif italic leading-tight shadow-xl">
                "La moda es la armadura para sobrevivir a la realidad cotidiana."
              </div>
            </div>
            <div className="lg:pl-12">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold mb-6 block text-brand-gold">Nuestra Filosofía</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">Más que ropa, <br /> un Estilo de Vida</h2>
              <p className="text-lg text-brand-ink/70 mb-8 leading-relaxed">
                En La Moda es Vida, creemos que cada prenda es una oportunidad para expresar quién eres. No seguimos tendencias efímeras; buscamos la autenticidad y la calidad que perdura.
              </p>
              <p className="text-lg text-brand-ink/70 mb-12 leading-relaxed">
                Nuestra misión es empoderar a las personas a través del diseño, ofreciendo piezas que combinan la artesanía tradicional con una visión contemporánea.
              </p>
              <button className="border-b-2 border-brand-ink pb-2 uppercase text-xs tracking-[0.2em] font-bold hover:text-brand-gold hover:border-brand-gold transition-all">
                Conoce nuestra historia
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 bg-brand-ink text-brand-paper overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-bold whitespace-nowrap select-none">
              LA MODA ES VIDA
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">Únete al Círculo</h2>
            <p className="text-brand-paper/60 mb-10 tracking-wide">
              Suscríbete para recibir acceso exclusivo a nuevas colecciones, eventos privados y consejos de estilo.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="TU CORREO ELECTRÓNICO" 
                className="flex-grow bg-transparent border-b border-brand-paper/30 py-4 px-2 focus:outline-none focus:border-brand-gold transition-colors uppercase text-xs tracking-widest"
              />
              <button className="bg-brand-paper text-brand-ink px-10 py-4 rounded-full uppercase text-xs tracking-widest font-bold hover:bg-brand-gold hover:text-brand-paper transition-all">
                Suscribirse
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-paper pt-24 pb-12 px-6 border-t border-brand-ink/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <h1 className="text-xl font-serif font-bold mb-8 tracking-tighter">
              LA MODA <span className="italic font-light text-brand-gold">es</span> VIDA
            </h1>
            <p className="text-sm text-brand-ink/60 leading-relaxed mb-8">
              Celebrando la individualidad y el estilo atemporal desde 2026. Tu destino para la moda con alma.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Comprar</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-ink/60">
              <li><a href="#" className="hover:text-brand-ink transition-colors">Novedades</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Mujer</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Hombre</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Accesorios</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Colecciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Ayuda</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-ink/60">
              <li><a href="#" className="hover:text-brand-ink transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Guía de Tallas</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Seguimiento de Pedido</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Legal</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-ink/60">
              <li><a href="#" className="hover:text-brand-ink transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">
            © 2026 La Moda es Vida. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-brand-ink/40">
            <span>España (EUR €)</span>
            <span>Español</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
