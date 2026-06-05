import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, PlayCircle, Film, Scissors, Layers, Volume2, ArrowRight, Instagram, Youtube, Twitter, Mail, Video, Palette, Sparkles, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  { id: 2,  title: "JC Conticello — Vidéo Promotionnelle 16:9", tab: "ADS", tags: ["Editing", "Étalonnage", "Brand Creation"],  image: "https://img.youtube.com/vi/_hG2OLc6F_Y/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/_hG2OLc6F_Y", videoAspect: "16:9" },
  { id: 16, title: "JC Conticello — Vidéo Promotionnelle 9:16", tab: "ADS", tags: ["Editing", "Étalonnage", "Brand Creation"],  image: "https://img.youtube.com/vi/UOaFdANIvdU/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/UOaFdANIvdU", videoAspect: "9:16" },
  { id: 3,  title: "Papa In Shape — Short Publicitaire", tab: "ADS",    tags: ["Editing", "Motion Design", "Sound Design"],    image: "https://img.youtube.com/vi/q1MWD2geLJw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/q1MWD2geLJw" },
  { id: 17, title: "Théo Rossi — Short Publicitaire",   tab: "ADS",    tags: ["Editing", "Étalonnage", "Sound Design"],       image: "https://img.youtube.com/vi/nymo_88u6Lw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/nymo_88u6Lw" },
  { id: 4, title: "IA, Argent, Jalousie — Ça change la vie ?", tab: "Podcast", tags: ["Editing", "Sound Design", "Motion Design"], image: "/images/minia-lmor.jpg" },
  { id: 5, title: "Interview — Entrepreneur Series", tab: "Podcast",    tags: ["Editing", "Étalonnage", "Sound Design"],       image: "/images/short.png" },
  { id: 6, title: "Reel Lifestyle — Marque Mode",    tab: "Reels",      tags: ["Reels", "Motion Design", "Étalonnage"],        image: "/images/social.png" },
  { id: 7, title: "Reel Corporate — Présentation",   tab: "Reels",      tags: ["Editing", "Brand Creation", "Sound Design"],   image: "/images/corp.png" },
  { id: 8,  title: "Accompagnement 20H de Formation LIVE",       tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"],         image: "/images/minia-arthaud-immo.jpg" },
  { id: 9,  title: "Développeur ! Pourquoi t'es au Chômage ?",   tab: "Reels",      tags: ["Editing", "Motion Design", "Sound Design"],    image: "https://img.youtube.com/vi/RsuuzGuP53o/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/RsuuzGuP53o" },
  { id: 14, title: "Agence Personnelle — Bali",                  tab: "Reels",      tags: ["Editing", "Étalonnage", "Sound Design"],       image: "https://img.youtube.com/vi/5_d8d5K4Kt0/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/5_d8d5K4Kt0" },
  { id: 15, title: "Agence Personnelle — Pop Culture",           tab: "Reels",      tags: ["Editing", "Motion Design", "Sound Design"],    image: "https://img.youtube.com/vi/rjAvPKrcRN4/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/rjAvPKrcRN4" },
  { id: 10, title: "De 0 à 16 Biens — Cyrille & Lionel",        tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"],         image: "/images/minia-learn-immo.jpg" },
  { id: 11, title: "De 10 à 100K€ — Comment Scaler son Entreprise", tab: "Miniatures", tags: ["Création Graphique", "Motion Design"],       image: "/images/minia-alec-henry.jpg" },
  { id: 12, title: "Spécial Mercato — Liverpool FC",             tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"],         image: "/images/minia-reds-mercato.png" },
  { id: 13, title: "Slot Out, Enfin ! — Liverpool FC",           tab: "Miniatures", tags: ["Création Graphique", "Motion Design"],          image: "/images/minia-reds-slot.png" },
  { id: 18, title: "Développeur ! Pourquoi t'es au Chômage ?",  tab: "Miniatures", tags: ["Création Graphique", "Motion Design"],          image: "/images/minia-harry-jmg.jpg" },
  { id: 19, title: "IA, Argent, Jalousie — Ça change la vie ?", tab: "Miniatures", tags: ["Création Graphique", "Brand Creation"],         image: "/images/minia-lmor.jpg" },
];

const testimonials = [
  {
    id: 1,
    text: "Il ne monte pas, il sculpte. Le rythme et l'émotion qu'il a apportés à notre campagne ont complètement transcendé le résultat final.",
    author: "Sarah Jenkins",
    company: "Directrice Créative, Vibe Agency",
  },
  {
    id: 2,
    text: "Incroyablement rapide, intensément concentré, et toujours capable de trouver l'histoire invisible dans les rushes bruts. Un véritable maître de son art.",
    author: "David Chen",
    company: "Réalisateur",
  },
  {
    id: 3,
    text: "L'étalonnage et le sound design à eux seuls valaient le détour. Notre clip ressemblait à un long-métrage.",
    author: "Elena Rostova",
    company: "Productrice",
  },
];

const skills = [
  { name: "Premiere Pro", level: 95 },
  { name: "DaVinci Resolve", level: 90 },
  { name: "After Effects", level: 85 },
  { name: "Avid Media Composer", level: 80 },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [activeTab, setActiveTab] = useState<typeof portfolioTabs[number]>("ADS");
  const [videoModal, setVideoModal] = useState<{ open: boolean; url: string; title: string; aspect: "9:16" | "16:9" }>({ open: false, url: "", title: "", aspect: "9:16" });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="Logo" className="h-6 w-auto" />
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <button onClick={() => scrollTo("work")} className="text-white/70 hover:text-white transition-colors uppercase tracking-widest font-mono">
              Portfolio
            </button>
            <button onClick={() => scrollTo("services")} className="text-white/70 hover:text-white transition-colors uppercase tracking-widest font-mono">
              Services
            </button>
            <button onClick={() => scrollTo("about")} className="text-white/70 hover:text-white transition-colors uppercase tracking-widest font-mono">
              À propos
            </button>
            <button onClick={() => scrollTo("contact")} className="border border-primary text-white hover:bg-primary transition-colors uppercase tracking-widest font-mono px-5 py-2">
              Démarrer un projet
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <div className="absolute inset-0 opacity-45" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'auto 85%', backgroundPosition: '30% 55%', backgroundRepeat: 'no-repeat' }} />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </div>

        <motion.div 
          className="container relative z-30 mx-auto px-6 md:px-12"
          style={{ y: y1, opacity }}
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-primary" />
              <span className="font-mono text-primary uppercase tracking-widest text-sm font-bold">Monteur Vidéo Freelance</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-white mb-8"
            >
              VISUEL. PUISSANT. <br />
              <span className="text-white/55 italic font-serif font-light">Inoubliable.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-white/60 max-w-2xl mb-12 font-light leading-relaxed"
            >
              Je transforme <strong className="text-white font-bold">vos idées en histoires</strong> visuelles captivantes. Chaque projet est une occasion de créer quelque chose de <strong className="text-white font-bold">mémorable et authentique</strong>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-6"
            >
              <Button 
                onClick={() => setShowReel(true)}
                className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-4 text-lg font-mono uppercase tracking-wider group"
              >
                Démarrer un projet
              </Button>
              <button 
                onClick={() => scrollTo("work")}
                className="border border-white/40 hover:border-white text-white hover:text-white font-mono uppercase tracking-widest text-sm transition-all flex items-center group px-8 py-4"
              >
                Voir le Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
        >
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
              animate={{ top: ["-50%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative bg-background border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            <div className="lg:col-span-5 relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex-1 min-h-0"
              >
                <img 
                  src="/about-photo.png" 
                  alt="Carlos Magusteiro en studio" 
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-95"
                  style={{ objectPosition: '50% 30%' }}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-color" />
              </motion.div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 blur-3xl rounded-full z-0" />
            </div>
            
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 text-white leading-tight">
                  20 ans d'expérience visuelle<br />
                  <span className="text-white/40 italic font-serif font-light">au service de vos vidéos</span>
                </h2>
                <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed max-w-2xl">
                  <p>
                    Graphiste et communicant depuis plus de 20 ans, je suis passionné par le montage vidéo et le storytelling depuis toujours.
                  </p>
                  <p>
                    J'aide les entreprises, marques et créateurs à transformer leurs idées en vidéos engageantes, modernes et mémorables. Mon approche combine sens du design, maîtrise du rythme et compréhension des objectifs de communication pour créer des contenus qui ont un véritable impact.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
                  <div>
                    <div className="text-4xl font-mono font-bold text-primary mb-2">20+</div>
                    <div className="text-sm uppercase tracking-widest text-white/50">Ans d'expérience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-mono font-bold text-primary mb-2">50+</div>
                    <div className="text-sm uppercase tracking-widest text-white/50">Projets</div>
                  </div>
                  <div>
                    <div className="text-4xl font-mono font-bold text-primary mb-2">4K</div>
                    <div className="text-sm uppercase tracking-widest text-white/50">Maîtrise</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center space-x-3 mb-5">
              <span className="font-mono text-primary uppercase tracking-widest text-sm font-bold">Portfolio</span>
              <div className="h-[2px] flex-1 max-w-[60px] bg-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Sélection de projets</h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {portfolioTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-mono uppercase tracking-widest transition-all duration-200 border ${
                  activeTab === tab
                    ? "bg-primary border-primary text-white"
                    : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects
                .filter((p) => p.tab === activeTab)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onClick={() => project.videoUrl && setVideoModal({ open: true, url: project.videoUrl, title: project.title, aspect: project.videoAspect ?? "9:16" })}
                    className={`group relative ${project.videoUrl ? "cursor-pointer" : "cursor-default"}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-white/5 mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                      />
                      {project.videoUrl && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="h-5 w-5 text-white ml-1 fill-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-1">
                      <p className="text-primary font-mono text-xs uppercase tracking-widest mb-1">{project.tab}</p>
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 border border-white/15 text-white/50 text-[10px] font-mono uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative overflow-hidden bg-background border-t border-white/5">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="h-[2px] w-10 bg-primary" />
              <span className="font-mono text-primary uppercase tracking-widest text-sm font-bold">Services</span>
              <div className="h-[2px] w-10 bg-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8">
              Ce que je propose<br />
              <span className="text-white/40 italic font-serif font-light">pour vos projets</span>
            </h2>
            <p className="text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Je maîtrise l'art de <strong className="text-white font-bold">raconter des histoires</strong> à travers l'image en mouvement.<br />
              Chaque service est pensé pour donner vie à votre vision avec <strong className="text-white font-bold">précision et créativité</strong>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Video,
                title: "Montage vidéo",
                desc: "Assemblage et édition de séquences pour créer des vidéos fluides et engageantes.",
              },
              {
                icon: Palette,
                title: "Correction colorimétrique",
                desc: "Ajustement des couleurs et de la lumière pour une cohérence visuelle parfaite.",
              },
              {
                icon: Sparkles,
                title: "Effets spéciaux",
                desc: "Intégration d'effets visuels pour amplifier l'impact émotionnel de votre contenu.",
              },
              {
                icon: LayoutTemplate,
                title: "Création Graphique",
                desc: "Création de vos miniatures ou autres graphismes désirés.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 border border-white/10 group-hover:border-primary/50 flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-sm text-white/50 font-light leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-32 relative bg-background border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale" />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
              >
                CRÉONS QUELQUE <br/>CHOSE <span className="text-primary italic font-serif">d'essentiel.</span>
              </motion.h2>
              <p className="text-xl text-white/50 font-light">Disponible pour des missions freelance partout dans le monde.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-2">Email</h4>
                  <a href="mailto:hello@carlosmagusteiro.com" className="text-2xl text-white hover:text-primary transition-colors font-light">hello@carlosmagusteiro.com</a>
                </div>
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-4">Réseaux</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-white transition-all">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-white transition-all">
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-white transition-all">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center p-12 border border-primary/20 bg-primary/5 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                        <ArrowRight className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Reçu</h3>
                      <p className="text-white/60 font-light">Je vous répondrai dans les 24 heures.</p>
                      <Button 
                        variant="link" 
                        className="mt-6 text-primary"
                        onClick={() => setFormState("idle")}
                      >
                        Envoyer un autre message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleContactSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-widest text-white/50">Nom</label>
                          <Input required className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-primary focus-visible:border-primary h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-widest text-white/50">Email</label>
                          <Input required type="email" className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-primary focus-visible:border-primary h-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/50">Type de Projet</label>
                        <select className="flex h-12 w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary rounded-none appearance-none">
                          <option value="commercial" className="bg-background">Publicité</option>
                          <option value="music-video" className="bg-background">Clip Musical</option>
                          <option value="documentary" className="bg-background">Documentaire</option>
                          <option value="short-film" className="bg-background">Court-métrage</option>
                          <option value="other" className="bg-background">Autre</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/50">Détails du Projet</label>
                        <Textarea required className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-primary focus-visible:border-primary min-h-[150px] resize-none" />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={formState === "submitting"}
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 text-sm font-mono uppercase tracking-widest"
                      >
                        {formState === "submitting" ? "Envoi en cours..." : "Envoyer ma Demande"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#020202] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          <div className="font-mono text-sm font-bold tracking-tighter text-white mb-4 md:mb-0">
            <img src="/logo.svg" alt="Carlos Magusteiro" className="h-4 w-auto opacity-60" />
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-white/30">
            &copy; {new Date().getFullYear()} Carlos Magusteiro
          </div>
        </div>
      </footer>

      {/* Tally Modal — Démarrer un projet */}
      <AnimatePresence>
        {showReel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReel(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setShowReel(false)}
                className="text-white/50 hover:text-white font-mono uppercase text-sm tracking-widest"
              >
                Fermer [X]
              </button>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-background border border-white/10 overflow-hidden"
              style={{ height: "80vh" }}
            >
              <iframe
                src="https://tally.so/embed/eqv8yl?alignLeft=1&hideTitle=0&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Démarrer un projet"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}

        {/* Video Modal */}
        {videoModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModal({ open: false, url: "", title: "" })}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={() => setVideoModal({ open: false, url: "", title: "" })}
                className="text-white/50 hover:text-white font-mono uppercase text-sm tracking-widest"
              >
                Fermer [X]
              </button>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`flex flex-col gap-4 ${videoModal.aspect === "16:9" ? "w-full max-w-5xl" : "w-full max-w-sm"}`}
            >
              <p className="text-white/50 font-mono text-xs uppercase tracking-widest">{videoModal.title}</p>
              <div
                className="relative w-full"
                style={{ paddingTop: videoModal.aspect === "16:9" ? "56.25%" : "177.78%" }}
              >
                <iframe
                  src={`${videoModal.url}?autoplay=1&rel=0`}
                  title={videoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border border-white/10"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
