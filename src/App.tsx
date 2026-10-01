/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Menu, 
  X, 
  MapPin,
  Clock,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// Kontaktuppgifterna står på flera ställen: sidfoten, adresskortet och
// kontaktbannern. De ligger här så att en ändring slår igenom överallt och
// inget ställe kan bli kvar med det gamla (Oliver på Qopla 1/10 2026).
const MEJL = 'info@alpinaurban.se';
const TELEFON = '054-8206020';
const TELEFON_LANK = 'tel:+46548206020';

// ... (TikTokIcon remains the same)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const orderUrl = "https://qopla.com/restaurant/alpina-urban/qgdpg7rV0K/order";

const socialLinks = [
  { 
    name: 'Instagram', 
    icon: <Instagram size={20} />, 
    href: 'https://www.instagram.com/alpinaurban/' 
  },
  { 
    name: 'TikTok', 
    icon: <TikTokIcon className="w-5 h-5" />, 
    href: 'https://www.tiktok.com/@alpinaurban' 
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Hem', to: '/' },
    { name: 'Meny', to: '/meny' },
    { name: 'Hitta oss', to: '/#locations' },
    { name: 'Öppettider', to: '/#hours' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen || location.pathname !== '/' ? 'bg-white/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={scrolled || isMenuOpen || location.pathname !== '/' 
                ? "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a365b2b617a76e561afb6f.png" 
                : "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a4b4c1b617a74f914a98aa.png"
              }
              alt="Alpina Urban Logo" 
              className="h-12 md:h-16 w-auto"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.to.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.to} 
                  className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                    scrolled || location.pathname !== '/' ? 'text-black hover:text-brand-teal' : 'text-white hover:text-brand-teal'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.to} 
                  className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                    scrolled || location.pathname !== '/' ? 'text-black hover:text-brand-teal' : 'text-white hover:text-brand-teal'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-brand-teal text-white px-6 h-[44px] flex items-center justify-center rounded-full text-sm font-bold uppercase tracking-tighter transition-all transform hover:scale-105 active:scale-95"
            >
              Beställ
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red text-white px-4 h-[38px] flex items-center justify-center rounded-full text-xs font-bold uppercase tracking-tighter"
            >
              Beställ
            </a>
            <button 
              className={`p-1 transition-colors ${scrolled || isMenuOpen || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              link.to.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter text-black hover:text-brand-teal transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter text-black hover:text-brand-teal transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red text-white w-[200px] h-[50px] flex items-center justify-center rounded-full text-xl font-bold uppercase tracking-tighter"
            >
              Beställ
            </a>
            
            <div className="flex gap-6 mt-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/5 rounded-full text-black hover:bg-brand-teal hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-black/5 bg-white text-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center mb-8">
            <img 
              src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a365b2b617a76e561afb6f.png" 
              alt="Alpina Urban Logo" 
              className="h-16 w-auto"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-gray-600 max-w-md leading-relaxed">
            Välkommen till Alpina Urban i Karlstad. Vi serverar stans bästa pizzor, burgare och kebabrätter med fokus på kvalitet och färska råvaror.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal mb-6">Kontakt</h4>
          <ul className="space-y-4">
            <li>
              <a href={`mailto:${MEJL}`} className="text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <Mail size={16} /> {MEJL}
              </a>
            </li>
            <li>
              <a href={TELEFON_LANK} className="text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                <Phone size={16} /> {TELEFON}
              </a>
            </li>
            <li className="text-gray-600 flex items-start gap-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>Östra torggatan 15, <br /> 652 24 Karlstad</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Alpina Urban</p>
        <p>
          Powered by{' '}
          <a 
            href="https://synsnumedia.se/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-black transition-colors"
          >
            SynsNu
          </a>
        </p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-50"
            poster="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68e932c14c24cd5fa35ad1dd.jpeg"
          >
            <source src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68e4018e4cd4d5265e52af96.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-teal font-bold uppercase tracking-[0.3em] mb-4 text-xs sm:text-sm"
          >
            Välkommen till Alpina Urban i Karlstad
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8"
          >
            SMAKEN AV <br />
            <span className="text-transparent border-text" style={{ WebkitTextStroke: '1px var(--color-brand-teal)' }}>ALPINA</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4"
          >
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-brand-red hover:bg-brand-teal text-white px-4 sm:px-10 h-[44px] sm:h-[54px] rounded-full text-xs sm:text-lg font-black uppercase tracking-tighter flex items-center justify-center gap-1 sm:gap-2 transition-all active:scale-95"
            >
              Beställ <ChevronRight className="w-3 h-3 sm:w-5 sm:h-5" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Infinite Loop Section */}
      <section className="bg-brand-red py-6 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-scroll w-max">
          {[...Array(30)].map((_, i) => {
            const marqueeColors = ['text-brand-cyan', 'text-brand-purple', 'text-brand-teal'];
            const marqueeColor = marqueeColors[i % marqueeColors.length];
            return (
              <div key={i} className="flex items-center gap-16 px-8 flex-shrink-0">
                <span className={`${marqueeColor} text-2xl md:text-4xl font-black tracking-tighter italic flex-shrink-0`}>
                  ALPINA URBAN
                </span>
                <span className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter italic flex-shrink-0">
                  #AlpinaFlavor
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-6 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 md:mb-8 uppercase">
              VI GÖR MAT <br />
              <span className="bg-black text-white px-2">SOM DEN SKA</span> <br />
              SMAKA.
            </h2>
            <div className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 space-y-4">
              <p>
                I hjärtat av Karlstad serverar vi mat inspirerad av passion för kvalitet och färska råvaror.
              </p>
              <p>
                Våra pizzor bakas med omsorg, våra burgare görs på 100% högrev och våra kebabrätter är legendariska. Varje ingrediens väljs med omsorg för att säkerställa högsta kvalitet.
              </p>
              <p>
                Det handlar inte bara om snabbmat.<br />
                Det handlar om hantverk, tradition och respekt för smaken.
              </p>
              <p className="font-bold text-black">
                Alpina Urban är platsen där god mat möter Karlstad – och skapar en smakupplevelse.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-xl">
                <p className="text-3xl md:text-4xl font-black tracking-tighter">100%</p>
                <p className="text-xs md:text-sm uppercase font-bold text-gray-500">Högrev</p>
              </div>
              <div className="bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-xl">
                <p className="text-3xl md:text-4xl font-black tracking-tighter">FÄRSKT</p>
                <p className="text-xs md:text-sm uppercase font-bold text-gray-500">Varje Dag</p>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/5] md:aspect-auto overflow-hidden rounded-2xl">
              <img 
                src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68ef4ae3fdc756d5056eee39.jpeg" 
                alt="Alpina Urban Food" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-left-8 bg-brand-teal text-white p-4 md:p-8 rounded-xl md:rounded-2xl">
              <p className="text-lg md:text-2xl font-black tracking-tighter">#AlpinaFlavor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations & Hours */}
      <section id="locations" className="py-20 md:py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Hitta Oss</h2>
            <div className="h-1 w-20 bg-brand-red mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Address Card */}
            <div className="group relative overflow-hidden bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl hover:border-brand-teal/50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-6 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin size={80} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 md:mb-6 text-brand-teal">Karlstad</h3>
              <p className="text-xl md:text-2xl font-black mb-1 md:mb-2">Östra torggatan 15</p>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">652 24 Karlstad, Sverige</p>
              <a
                href={TELEFON_LANK}
                className="flex w-fit items-center gap-2 text-base md:text-lg font-black mb-6 md:mb-8 hover:text-brand-teal transition-colors"
              >
                <Phone size={16} /> {TELEFON}
              </a>
              <a
                href="https://maps.app.goo.gl/zTV7gZ7KT6SPsqqr7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs md:text-sm tracking-widest hover:bg-brand-teal hover:text-white transition-all"
              >
                Hitta hit <ExternalLink size={14} />
              </a>
            </div>

            {/* Hours Card */}
            <div id="hours" className="group relative overflow-hidden bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl hover:border-brand-purple/50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-6 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock size={80} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 md:mb-6 text-brand-purple">Öppettider</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-gray-400 uppercase text-xs tracking-widest">Måndag - Torsdag</span>
                  <span className="text-base md:text-lg font-black">11:00 – 21:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-gray-400 uppercase text-xs tracking-widest">Fredag</span>
                  <span className="text-base md:text-lg font-black">11:00 – 23:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-gray-400 uppercase text-xs tracking-widest">Lördag</span>
                  <span className="text-base md:text-lg font-black">12:00 – 23:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-gray-400 uppercase text-xs tracking-widest">Söndag</span>
                  <span className="text-base md:text-lg font-black">12:00 – 21:00</span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 italic mt-4">
                  * Vi har öppet alla dagar i veckan för att servera dig Karlstads godaste mat.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Banner */}
          <div className="mt-8 md:mt-12 p-6 md:p-8 bg-brand-red rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="p-3 bg-white/20 rounded-full hidden sm:block">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase font-bold opacity-80">Frågor eller funderingar?</p>
                <p className="text-lg md:text-xl font-black tracking-tight">{MEJL}</p>
                <a href={TELEFON_LANK} className="text-lg md:text-xl font-black tracking-tight hover:underline">{TELEFON}</a>
              </div>
            </div>
            <a 
              href={`mailto:${MEJL}`}
              className="w-full md:w-auto bg-white text-brand-red px-8 py-3 rounded-full font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform text-center"
            >
              Kontakta Oss
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function MenuPage() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  // Menyn enligt kundens egen PDF "Men med priser till kassan", via Oliver på
  // Qopla 1/10 2026. Rätter, priser och beskrivningar är tagna rakt ur den.
  // Rättade stavfel i beskrivningarna: champoinjoner, jalapños och
  // hackadfefferoni, alla tre stavade rätt på andra ställen i samma PDF.
  //
  // note      står under kategorirubriken, gäller hela kategorin
  // tillagg   prisrutan längst ned i kategorin, motsvarar PDF:ens ramade rutor
  const menuCategories: {
    title: string;
    note?: string;
    tillagg?: string;
    items: { name: string; description: string; price: string }[];
  }[] = [
    {
      title: "Pizza",
      tillagg: "Bearnaisesås, chillimajo, chipotlesås, kebabsås, stark sås och vitlökssås 15 kr. Extra topping, kött, fågel och skaldjur 25 kr. Glutenfri botten 30 kr. Pommes på pizza 30 kr. Alla pizzor går att få i barnstorlek, då avdrages 20 kr från ordinarie pris.",
      items: [
        { name: "Margarita", description: "Tomatsås, ost", price: "125 kr" },
        { name: "Pepperoni", description: "Tomatsås, ost, pepperonikorv", price: "125 kr" },
        { name: "Levent", description: "Tomatsås, ost, salami", price: "130 kr" },
        { name: "Bolognese", description: "Tomatsås, ost, köttfärssås, lök", price: "135 kr" },
        { name: "Kycklingpizza", description: "Tomatsås, ost, kyckling", price: "135 kr" },
        { name: "Diavola", description: "Tomatsås, ost, salami, lök", price: "135 kr" },
        { name: "Vesuvio", description: "Tomatsås, ost, skinka", price: "135 kr" },
        { name: "Calzone (inbakad)", description: "Tomatsås, ost, skinka", price: "135 kr" },
        { name: "Al Tonno", description: "Tomatsås, ost, tonfisk", price: "135 kr" },
        { name: "Capricciosa", description: "Tomatsås, ost, skinka, färska champinjoner", price: "140 kr" },
        { name: "Hawaii", description: "Tomatsås, ost, skinka, ananas", price: "140 kr" },
        { name: "Bussola", description: "Tomatsås, ost, skinka, räkor", price: "140 kr" },
        { name: "Al Fungi", description: "Tomatsås, ost, färska champinjoner", price: "140 kr" },
        { name: "Quattro Stagioni", description: "Tomatsås, ost, räkor, musslor, färska champinjoner, skinka, kronärtskocka, kalamataoliver", price: "145 kr" },
        { name: "Siciliana", description: "Tomatsås, ost, sardeller, kapris, salami, kalamataoliver, vitlök", price: "145 kr" },
        { name: "Värmland", description: "Tomatsås, ost, kyckling, banan, curry, jordnötter", price: "145 kr" },
        { name: "Leilo", description: "Tomatsås, ost, räkor, färska champinjoner", price: "145 kr" },
        { name: "Bembay", description: "Tomatsås, ost, skinka, räkor, ananas", price: "145 kr" },
        { name: "Ayasofya", description: "Tomatsås, ost, köttfärs, lök, salami, stark krydda", price: "145 kr" },
        { name: "Contadina", description: "Tomatsås, ost, bacon, lök, salami, vitlök", price: "145 kr" },
        { name: "Triton", description: "Tomatsås, ost, skinka, räkor, färska champinjoner", price: "145 kr" },
        { name: "Tropicana", description: "Tomatsås, ost, skinka, ananas, banan, curry", price: "145 kr" },
      ]
    },
    {
      title: "Kebabpizza",
      note: "Välj mellan nöt, fläsk och kyckling.",
      items: [
        { name: "Kebabpizza", description: "Tomatsås, ost, kebab, lök, hackad fefferoni, valfri sås", price: "155 kr" },
        { name: "Ares", description: "Tomatsås, ost, kebab, lök, isbergssallad, gurka, tomat, valfri sås", price: "160 kr" },
        { name: "Loki (halvinbakad)", description: "Tomatsås, ost, kebab, lök, grillad paprika, färska champinjoner, valfri sås", price: "160 kr" },
        { name: "Bakis", description: "Tomatsås, ost, kebab, lök, skinka, pommes, valfri sås", price: "165 kr" },
      ]
    },
    {
      title: "Alpinapizza",
      items: [
        { name: "Alicante", description: "Tomatsås, ost, pepperonikorv, jalapeños, färska champinjoner, lök, körsbärstomater", price: "165 kr" },
        { name: "Paris", description: "Tomatsås, ost, biff, kantareller, körsbärstomater, lök, bearnaisesås", price: "165 kr" },
        { name: "Venedig (halvinbakad)", description: "Tomatsås, ost, biff, färska champinjoner, lök, grillad paprika, bearnaisesås", price: "165 kr" },
        { name: "Oktavio", description: "Tomatsås, ost, biff, lök, färska champinjoner, jalapeños", price: "165 kr" },
        { name: "Izmir", description: "Tomatsås, ost, köttfärs, lök, färska champinjoner, grillad paprika", price: "165 kr" },
        { name: "Del Mar", description: "Tomatsås, ost, musslor, räkor, tonfisk, vitlök, persilja, citron", price: "165 kr" },
        { name: "Roma", description: "Tomatsås, ost, italiensk salami, grillad paprika, vitlök, ruccola, grana padano", price: "165 kr" },
        { name: "Kosmopol", description: "Tomatsås, ost, ryggbiff, körsbärstomater, lök, grillad paprika, ruccola och bearnaisesås", price: "165 kr" },
        { name: "Caesarpizza", description: "Tomatsås, ost, kyckling, bacon, caesarsallad, grana padano, basilikapesto", price: "165 kr" },
        { name: "Pavo", description: "Tomatsås, ost, kyckling, grillad paprika, lök, vitost", price: "165 kr" },
        { name: "Azteka", description: "Tomatsås, ost, skinka, jalapeños, lök, tacokrydda, tacosås, crème fraiche", price: "165 kr" },
        { name: "Trufa", description: "Tomatsås, ost, biff, färska champinjoner, tryffelkräm, ruccola", price: "165 kr" },
        { name: "Mexicana", description: "Tomatsås, ost, köttfärssås, lök, hackad fefferoni, grillad paprika, stark krydda", price: "165 kr" },
        { name: "La Paz", description: "Tomatsås, ost, köttfärssås, jalapeños, stark krydda, lök", price: "165 kr" },
        { name: "Machio", description: "Pizza blanco, ost, körsbärstomater, kalamataoliver, fetaost, pistage", price: "165 kr" },
        { name: "Cleopatra", description: "Pizza blanco, ost, färska champinjoner, vitlök, kronärtskocka, ruccola", price: "165 kr" },
        { name: "Vegetariana", description: "Tomatsås, ost, färska champinjoner, grillad paprika, kalamataoliver, kronärtskocka, sparris, lök", price: "165 kr" },
        { name: "Parma", description: "Tomatsås, ost, lufttorkad skinka, grana padano, ruccola", price: "165 kr" },
        { name: "Kejsaren", description: "Tomatsås, ost, biff, soltorkade tomater, ruccola, hyvlad grana padano, bearnaisesås", price: "165 kr" },
      ]
    },
    {
      title: "Burgare",
      note: "Samtliga hamburgare är 100% högrev och serveras med briochebröd och pommes.",
      tillagg: "Extra kött (120 g) 30 kr. Bearnaisesås, chillimajo, chipotlesås, vitlökssås och aioli 15 kr.",
      items: [
        { name: "Cheeseburger", description: "Dubbel cheddarost, sallad, lök, tomat, dressing", price: "150 kr" },
        { name: "Cheese & Bacon", description: "Dubbel cheddarost, bacon, sallad, lök, tomat, dressing", price: "160 kr" },
        { name: "Tryffelburgare", description: "Dubbel peppar jack ost, tryffelkräm, sallad, lök, tomat", price: "160 kr" },
        { name: "Crispy Chicken", description: "Sallad, lök, tomat, dressing", price: "125 kr" },
        { name: "Halloumiburgare", description: "Dubbel cheddarost, sallad, lök, tomat, dressing", price: "160 kr" },
      ]
    },
    {
      title: "Kebab & Sallad",
      note: "Välj mellan nöt, fläsk och kyckling.",
      items: [
        { name: "Kebabtallrik", description: "Kebabkött, pommes, sallad, fefferoni, lök, tomat, valfri sås", price: "155 kr" },
        { name: "Kebabrulle", description: "Kebabkött, hembakt tunnbröd, sallad, fefferoni, lök, tomat, valfri sås", price: "155 kr" },
        { name: "Kebab i pita", description: "Kebabkött, hembakt pitabröd, sallad, fefferoni, lök, tomat, valfri sås", price: "145 kr" },
        { name: "Caesarsallad", description: "Kycklingfilé, romansallad, bacon, krutonger, grana padano", price: "155 kr" },
        { name: "Kycklingsallad", description: "Kycklingfilé, sallad, tomat, gurka, lök", price: "155 kr" },
        { name: "Kebabsallad", description: "Kebabkött, sallad, tomat, gurka, lök", price: "155 kr" },
        { name: "Falafelsallad", description: "Kebabkött, sallad, tomat, gurka, lök", price: "155 kr" },
      ]
    },
    {
      title: "Fingerfood & Dipp",
      tillagg: "Bearnaisesås, chillimajo, chipotlesås, vitlökssås och aioli 15 kr.",
      items: [
        { name: "Lökringar", description: "5 st", price: "40 kr" },
        { name: "Chilli Cheese", description: "5 st", price: "45 kr" },
        { name: "Mozzarellastick", description: "3 st", price: "50 kr" },
        { name: "Crispy Chicken", description: "Dipp", price: "60 kr" },
        { name: "Alpinafries", description: "Pommes, cheddar, jalapeños, lök", price: "60 kr" },
      ]
    },
    {
      title: "Från Köket",
      items: [
        { name: "Fish & Chips", description: "Panerad fisk, pommes, remouladsås", price: "170 kr" },
        { name: "Nachotallrik", description: "Köttfärs, sallad, tomat, tacosås, crème fraiche", price: "150 kr" },
        { name: "Schnitzel", description: "Pommes, bea, citron", price: "150 kr" },
        { name: "Pasta Bolognese", description: "Köttfärssås, grana padano", price: "170 kr" },
        { name: "Pasta Carbonara", description: "Bacon, lök, grädde, parmesan", price: "175 kr" },
        { name: "Kyckling Pesto", description: "Kyckling, pesto, grädde, grana padano", price: "175 kr" },
        { name: "Tryffelpasta", description: "Biff, tryffel, grädde, grana padano", price: "180 kr" },
      ]
    },
    {
      title: "Kids",
      items: [
        { name: "Barnburgare", description: "Pommes", price: "85 kr" },
        { name: "Crispy Chicken", description: "Pommes", price: "85 kr" },
        { name: "Pasta Bolognese", description: "Pasta, köttfärssås", price: "85 kr" },
        { name: "Pannkakor", description: "Sylt, grädde", price: "85 kr" },
        { name: "Kebabtallrik", description: "Välj mellan nöt, fläsk, kyckling, pommes, valfri sås", price: "85 kr" },
        { name: "Valfri pizza", description: "Margarita, vesuvio, capricciosa, hawaii", price: "85 kr" },
      ]
    },
    {
      title: "Dessert",
      items: [
        { name: "Churros", description: "Noisette", price: "60 kr" },
        { name: "Vaniljglas", description: "Chokladsås", price: "60 kr" },
        { name: "Banana Split", description: "Glass, banan, kex, chokladsås", price: "70 kr" },
      ]
    },
    {
      title: "Dryck",
      items: [
        { name: "Mineralvatten", description: "", price: "25 kr" },
        { name: "Läsk", description: "", price: "25 kr" },
        { name: "Mer", description: "", price: "15 kr" },
        { name: "Kaffe", description: "", price: "25 kr" },
        { name: "Espresso", description: "", price: "30 kr" },
        { name: "Espresso dubbel", description: "", price: "40 kr" },
      ]
    },
    {
      title: "Öl & Cider",
      items: [
        { name: "Pripps", description: "Fatöl, 40 cl", price: "70 kr" },
        { name: "Eriksberg", description: "Fatöl, 40 cl", price: "75 kr" },
        { name: "Mariestads", description: "Flaska, 50 cl", price: "85 kr" },
        { name: "1664 Blanc", description: "Flaska, 33 cl", price: "70 kr" },
        { name: "HOF (eco)", description: "Flaska, 33 cl", price: "70 kr" },
        { name: "IPA", description: "Flaska, 33 cl", price: "100 kr" },
        { name: "Somersby Päron", description: "Flaska, 33 cl", price: "75 kr" },
      ]
    },
    {
      title: "Vin",
      items: [
        { name: "Husets vitt/rött", description: "Glas", price: "80 kr" },
        { name: "Husets rosé", description: "Glas", price: "80 kr" },
        { name: "Husets cava", description: "Glas", price: "80 kr" },
        { name: "Husets vitt/rött", description: "Flaska", price: "330 kr" },
        { name: "Husets rosé", description: "Flaska", price: "330 kr" },
        { name: "Husets cava", description: "Flaska", price: "330 kr" },
      ]
    }
  ];

  return (
    <section className="pt-32 pb-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-4">VÅR MENY</h1>
            <div className="h-2 w-24 bg-brand-red"></div>
          </div>
          <p className="text-gray-400 max-w-md text-lg">
            Välkommen till Alpina Urban i Karlstad. Vi serverar stans godaste pizzor, burgare och kebab.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {menuCategories.map((category, idx) => {
            const isOpen = openCategories.includes(category.title);
            const accentColors = ['text-brand-red', 'text-brand-teal', 'text-brand-green', 'text-brand-purple', 'text-brand-pink'];
            const accentColor = accentColors[idx % accentColors.length];
            
            return (
              <div key={category.title} className="border-b border-white/10 pb-6 md:pb-8">
                <button 
                  onClick={() => toggleCategory(category.title)}
                  className="w-full text-left flex items-center justify-between group"
                >
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase flex items-center gap-4">
                    <span className={accentColor}>/</span> {category.title}
                  </h2>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:${accentColor} transition-colors`} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {category.note && (
                        <p className="pt-6 text-gray-400 text-sm md:text-base">{category.note}</p>
                      )}
                      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 ${category.note ? 'pt-6' : 'pt-8'}`}>
                        {category.items.map((item) => (
                          <div key={item.name} className="group bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 hover:border-brand-teal/50 transition-all duration-300 flex flex-col relative">
                            <div className="flex-grow flex flex-col">
                              <div className="flex justify-between items-start gap-4 mb-2">
                                <h3 className="text-lg md:text-xl font-bold tracking-tight group-hover:text-brand-teal transition-colors">{item.name}</h3>
                                <p className="text-sm md:text-base font-black text-white whitespace-nowrap">{item.price}</p>
                              </div>
                              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {category.tillagg && (
                        <p className="mt-4 border border-white/10 rounded-xl p-4 md:p-5 text-gray-400 text-xs md:text-sm leading-relaxed">
                          {category.tillagg}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Står på kundens egen meny och hör hemma här av samma skäl. */}
        <p className="mt-16 text-center text-gray-400 uppercase text-sm tracking-widest">
          Allergier? Fråga personalen.
        </p>

        <div className="mt-12 text-center">
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-brand-red hover:bg-brand-pink text-white px-12 py-5 rounded-full text-xl font-black uppercase tracking-tighter transition-all transform hover:scale-105 active:scale-95"
          >
            Beställ Online Nu
          </a>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const galleryImages = [
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68f24300d8036b45a2bc23ce.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68e932c115bf071c41a86693.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68ef459dfdc75676176e3bb3.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68f29e4c6752d4369227fdc8.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68e932c15db7d672c3652612.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68ef4ae352bcc60d3b9c3c56.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68f242e922a3839f46bdb404.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68e932c115bf076c8ea86694.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68ef459d52bcc627329b9f6d.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68f24300a1e01a8311f75b1b.jpeg",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/68e932c2476e1f110b114564.jpeg"
  ];

  // Duplicate the array for infinite scroll
  const displayImages = [...galleryImages, ...galleryImages];

  return (
    <section className="py-20 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Galleri</h2>
        <div className="h-1 w-20 bg-brand-red"></div>
      </div>
      
      <div className="flex whitespace-nowrap animate-scroll w-max">
        {displayImages.map((src, i) => (
          <div key={i} className="px-2 flex-shrink-0">
            <div className="w-[280px] md:w-[400px] aspect-[4/5] overflow-hidden rounded-2xl group relative">
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-brand-red selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meny" element={<MenuPage />} />
        </Routes>
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
