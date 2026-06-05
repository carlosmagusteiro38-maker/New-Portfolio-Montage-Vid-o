export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/50 mb-8">Page introuvable</p>
        <a href="/" className="text-primary hover:underline font-mono uppercase tracking-widest text-sm">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
