import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Instagram, Youtube, Twitter, Video, Palette, Sparkles, LayoutTemplate } from "lucide-react";

type Project = {
  id: number;
  title: string;
  tab: string;
  tags: string[];
  image: string;
  videoUrl?: string;
  videoAspect?: "9:16" | "16:9";
};

const portfolioTabs = ["ADS", "Podcast", "Reels", "Miniatures"] as const;

const projects: Project[] = [
  { id: 1, title: "Arthaud Immobilier — Accompagnement Formation", tab: "ADS", tags: ["Editing", "Motion Design", "Sound Design"], image: "https://img.youtube.com/vi/gEuay8qXhAU/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/gEuay8qXhAU" },
  { id: 2, title: "JC Conticello — Vidéo Promotionnelle 16:9", tab: "ADS", tags: ["Editing", "Étalonnage", "Brand Creation"], image: "https://img.youtube.com/vi/_hG2OLc6F_Y/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/_hG2OLc6F_Y", videoAspect: "16:9" },
  { id: 16, title: "JC Conticello — Vidéo Promotionnelle 9:16", tab: "ADS", tags: ["Editing", "Étalonnage", "Brand Creation"], image: "https://img.youtube.com/vi/UOaFdANIvdU/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/UOaFdANIvdU", videoAspect: "9:16" },
  { id: 3, title: "Papa In Shape — Short Publicitaire", tab: "ADS", tags: ["Editing", "Motion Design", "Sound Design"], image: "https://img.youtube.com/vi/q1MWD2geLJw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/q1MWD2geLJw" },
  { id: 17, title: "Théo Rossi — Short Publicitaire", tab: "ADS", tags: ["Editing", "Étalonnage", "Sound Design"], image: "https://img.youtube.com/vi/nymo_88u6Lw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/nymo_88u6Lw" },
  { id: 4, title: "IA, Argent, Jalousie — Ça change la vie ?", tab: "Podcast", tags: ["Editing", "Sound Design", "Motion Design"], image: "/images/minia-lmor.jpg" },
  { id: 5, title: "Interview — Entrepreneur Series", tab: "Podcast", tags: ["Editing", "Étalonnage", "Sound Design"], image: "/images/short.png" },
  { id: 6, title: "Reel Lifestyle — Marque Mode", tab: "Reels", tags: ["Reels", "Motion Design", "Étalonnage"], image: "/images/social.png" },
  { id: 7, title: "Reel Corporate — Présentation", tab: "Reels", tags: ["Editing", "Brand Creation", "Sound Design"], image: "/images/corp.png" },
  { id: 8, title: "Accompagnement 20H de Formation LIVE", tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"], image: "/images/minia-arthaud-immo.jpg" },
  { id: 9, title: "Développeur ! Pourquoi t'es au Chômage ?", tab: "Reels", tags: ["Editing", "Motion Design", "Sound Design"], image: "https://img.youtube.com/vi/RsuuzGuP53o/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/RsuuzGuP53o" },
  { id: 14, title: "Agence Personnelle — Bali", tab: "Reels", tags: ["Editing", "Étalonnage", "Sound Design"], image: "https://img.youtube.com/vi/5_d8d5K4Kt0/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/5_d8d5K4Kt0" },
  { id: 15, title: "Agence Personnelle — Pop Culture", tab: "Reels", tags: ["Editing", "Motion Design", "Sound Design"], image: "https://img.youtube.com/vi/rjAvPKrcRN4/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/rjAvPKrcRN4" },
  { id: 10, title: "De 0 à 16 Biens — Cyrille & Lionel", tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"], image: "/images/minia-learn-immo.jpg" },
  { id: 11, title: "De 10 à 100K€ — Comment Scaler son Entreprise", tab: "Miniatures", tags: ["Création Graphique", "Motion Design"], image: "/images/minia-alec-henry.jpg" },
  { id: 12, title: "Spécial Mercato — Liverpool FC", tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"], image: "/images/minia-reds-mercato.png" },
  { id: 13, title: "Slot Out, Enfin ! — Liverpool FC", tab: "Miniatures", tags: ["Création Graphique", "Motion Design"], image: "/images/minia-reds-slot.png" },
  { id: 18, title: "Développeur ! Pourquoi t'es au Chômage ?", tab: "Miniatures", tags: ["Création Graphique", "Motion Design"], image: "/images/minia-harry-jmg.jpg" },
  { id: 19, title: "IA, Argent, Jalousie — Ça change la vie ?", tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"], image: "/images/minia-lmor.jpg" },
];

const RED = "#db142b";

export default function Home() {
  const [tallyOpen, setTallyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<typeof portfolioTabs[number]>("ADS");
  const [videoModal, setVideoModal] = useState<{ open: boolean; url: string; title: string; aspect: "9:16" | "16:9" }>({ open: false, url: "", title: "", aspect: "9:16" });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;0,900;1,300&display=swap" rel="stylesheet" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-white font-bold text-xl tracking-tight">
            Carlos <span className="font-black">Magusteiro</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button onClick={() => scrollTo("portfolio")} className="text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold">Portfolio</button>
            <button onClick={() => scrollTo("services")} className="text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold">Services</button>
            <button onClick={() => scrollTo("about")} className="text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold">À Propos</button>
            <button
              onClick={() => setTallyOpen(true)}
              className="text-white uppercase tracking-widest text-xs font-bold px-5 py-2.5 transition-colors"
              style={{ backgroundColor: RED }}
            >
              Parlons de votre projet
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.5) 100%)" }} />
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center right" }} />
        </div>
        <motion.div className="container relative z-30 mx-auto px-6 md:px-12" style={{ y: y1, opacity }}>
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center space-x-4 mb-6">
              <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
              <span className="uppercase tracking-widest text-xs font-bold" style={{ color: RED }}>Monteur Vidéo Freelance</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="leading-none mb-4">
              <span className="block text-7xl md:text-8xl lg:text-9xl" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}>DES VIDÉOS</span>
              <span className="block text-7xl md:text-8xl lg:text-9xl" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>QUI <span style={{ fontWeight: 700 }}>MARQUENT.</span></span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-2xl md:text-3xl text-white/80 mb-6" style={{ fontFamily: "Cambria, Georgia, serif", fontStyle: "italic" }}>
              Une histoire. Une émotion. Un impact.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed" style={{ fontWeight: 400 }}>
              Je transforme <strong className="text-white font-bold">vos idées en histoires</strong> visuelles captivantes. Chaque projet est une occasion de créer quelque chose de <strong className="text-white font-bold">mémorable et authentique</strong>.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex items-center space-x-4">
              <button onClick={() => setTallyOpen(true)} className="text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-90" style={{ backgroundColor: RED }}>
                Parlons de votre projet
              </button>
              <button onClick={() => scrollTo("portfolio")} className="border border-white/40 hover:border-white text-white font-semibold uppercase tracking-widest text-sm transition-all flex items-center px-8 py-4">
                Voir le Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full h-1/2" style={{ backgroundColor: RED }} animate={{ top: ["-50%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          </div>
        </motion.div>
      </section>

      {/* À propos */}
      <section id="about" className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image avec coins décoratifs */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="relative">
                {/* Coin haut gauche */}
                <div className="absolute -top-3 -left-3 w-8 h-8 z-10">
                  <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: RED }} />
                  <div className="absolute top-0 left-0 h-full w-[3px]" style={{ backgroundColor: RED }} />
                </div>
                {/* Coin bas droite */}
                <div className="absolute -bottom-3 -right-3 w-8 h-8 z-10">
                  <div className="absolute bottom-0 right-0 w-full h-[3px]" style={{ backgroundColor: RED }} />
                  <div className="absolute bottom-0 right-0 h-full w-[3px]" style={{ backgroundColor: RED }} />
                </div>
                <img src="/about-photo.png" alt="Carlos Magusteiro" className="w-full object-cover filter grayscale contrast-110" />
                <div className="absolute inset-0 opacity-10 mix-blend-color" style={{ backgroundColor: RED }} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic" }}>
                Pourquoi moi ?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Contrairement à un simple monteur vidéo, j'apporte <strong className="text-white">plus de 20 ans d'expérience en communication visuelle</strong>. Chaque vidéo est pensée non seulement pour être esthétique, mais aussi pour <strong className="text-white">transmettre efficacement votre message</strong>.
              </p>
              <div className="mb-10">
                <p className="text-white font-bold mb-4">Comment se déroule un projet ?</p>
                <ol className="space-y-2 text-white/70">
                  {["Brief & objectifs", "Montage & validation", "Ajustements", "Livraison"].map((step, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="font-bold" style={{ color: RED }}>{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                {[{ value: "20+", label: "Ans d'expérience" }, { value: "50+", label: "Projets" }, { value: "48h", label: "Délai de réponse" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-black mb-1" style={{ color: RED, fontFamily: "'Poppins', sans-serif" }}>{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <div className="flex items-center space-x-3 mb-5">
              <span className="uppercase tracking-widest text-sm font-bold" style={{ color: RED }}>Portfolio</span>
              <div className="h-[2px] w-16" style={{ backgroundColor: RED }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Sélection de projets</h2>
          </motion.div>
          <div className="flex flex-wrap gap-2 mb-12">
            {portfolioTabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-200 border ${activeTab === tab ? "text-white border-transparent" : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"}`}
                style={activeTab === tab ? { backgroundColor: RED, borderColor: RED } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter((p) => p.tab === activeTab).map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => project.videoUrl && setVideoModal({ open: true, url: project.videoUrl, title: project.title, aspect: project.videoAspect ?? "9:16" })}
                  className={`group relative ${project.videoUrl ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-white/5 mb-4">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-90" />
                    {project.videoUrl && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300" style={{ backgroundColor: RED }}>
                          <Play className="h-5 w-5 text-white ml-1 fill-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-1">
                    <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: RED }}>{project.tab}</p>
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:opacity-80 transition-opacity">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 border border-white/15 text-white/50 text-[10px] font-semibold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.95))" }} />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
              <span className="uppercase tracking-widest text-sm font-bold" style={{ color: RED }}>Services</span>
              <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontStyle: "italic" }}>
              De l'idée au <span className="text-white/40 font-light not-italic" style={{ fontFamily: "Cambria, Georgia, serif" }}>rendu final</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Je maîtrise l'art de <strong className="text-white">raconter des histoires</strong> à travers l'image en mouvement.<br />
              Chaque service est pensé pour donner vie à votre vision avec <strong className="text-white">précision et créativité</strong>.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Video, title: "Montage vidéo", desc: "Transformez vos rushs en vidéos dynamiques qui captivent votre audience et renforcent votre message." },
              { icon: Palette, title: "Correction colorimétrique", desc: "Des couleurs harmonisées et un rendu professionnel pour sublimer chaque image." },
              { icon: Sparkles, title: "Motion Design & Effets", desc: "Animations, titrages et effets visuels pour dynamiser vos contenus et retenir l'attention." },
              { icon: LayoutTemplate, title: "Création graphique", desc: "Miniatures YouTube, visuels réseaux sociaux et éléments graphiques conçus pour maximiser l'impact visuel." },
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 border border-white/5"
              >
                {/* Coin haut gauche */}
                <div className="absolute top-0 left-0 w-6 h-6">
                  <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: RED }} />
                  <div className="absolute top-0 left-0 h-full w-[2px]" style={{ backgroundColor: RED }} />
                </div>
                {/* Coin bas droite */}
                <div className="absolute bottom-0 right-0 w-6 h-6">
                  <div className="absolute bottom-0 right-0 w-full h-[2px]" style={{ backgroundColor: RED }} />
                  <div className="absolute bottom-0 right-0 h-full w-[2px]" style={{ backgroundColor: RED }} />
                </div>
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-6">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-base font-bold text-white mb-3 text-center">{service.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed text-center">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projet */}
      <section id="projet" className="py-32 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.85), rgba(5,5,5,0.95))" }} />
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
              <span className="uppercase tracking-widest text-sm font-bold" style={{ color: RED }}>Projet</span>
              <div className="h-[2px] w-10" style={{ backgroundColor: RED }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontStyle: "italic" }}>
              Prêt à donner vie<br />
              <span className="font-light not-italic" style={{ fontFamily: "Cambria, Georgia, serif" }}>à votre projet ?</span>
            </h2>
            <p className="text-lg text-white/60 mb-4 leading-relaxed">
              Parlons de <strong className="text-white">vos besoins</strong> et trouvons ensemble la meilleure approche pour <strong className="text-white">créer une vidéo qui atteint vos objectifs</strong>.
            </p>
            <p className="text-white font-bold mb-8">
              Cliquer sur le bouton ci-dessous,<br />remplissez le formulaire et vous obtenez :
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10 max-w-lg mx-auto text-sm text-white/70">
              {["Réponse sous 24h", "Devis gratuit et sans engagement", "Accompagnement personnalisé", "Collaboration à distance partout en France"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="font-bold text-base" style={{ color: RED }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <button onClick={() => setTallyOpen(true)}
              className="inline-block text-white px-10 py-4 text-sm font-black uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ backgroundColor: RED }}
            >
              Parlons de votre projet
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#020202] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          <div className="font-black text-white text-lg mb-4 md:mb-0">
            Carlos <span className="font-black">Magusteiro</span>
          </div>
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#db142b] hover:text-[#db142b] transition-all">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#db142b] hover:text-[#db142b] transition-all">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#db142b] hover:text-[#db142b] transition-all">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/30">
            &copy; {new Date().getFullYear()} Carlos Magusteiro
          </div>
        </div>
      </footer>

      {/* Tally Modal */}
      <AnimatePresence>
        {tallyOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setTallyOpen(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute top-6 right-6 z-10">
              <button onClick={() => setTallyOpen(false)} className="text-white/50 hover:text-white font-bold uppercase text-sm tracking-widest">
                Fermer [X]
              </button>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden" style={{ height: "80vh" }}>
              <iframe
                src="https://tally.so/embed/eqv8yl?alignLeft=1&hideTitle=0&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Parlons de votre projet"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal.open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setVideoModal({ open: false, url: "", title: "", aspect: "9:16" })}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute top-6 right-6 z-10">
              <button onClick={() => setVideoModal({ open: false, url: "", title: "", aspect: "9:16" })} className="text-white/50 hover:text-white font-bold uppercase text-sm tracking-widest">
                Fermer [X]
              </button>
            </div>
            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col gap-4 ${videoModal.aspect === "16:9" ? "w-full max-w-5xl" : "w-full max-w-sm"}`}>
              <p className="text-white/50 font-semibold text-xs uppercase tracking-widest">{videoModal.title}</p>
              <div className="relative w-full" style={{ paddingTop: videoModal.aspect === "16:9" ? "56.25%" : "177.78%" }}>
                <iframe src={`${videoModal.url}?autoplay=1&rel=0`} title={videoModal.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border border-white/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
