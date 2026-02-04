import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AdContainerProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function AdContainer({ className = "", size = "medium" }: AdContainerProps) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      setConsent(localStorage.getItem("cookie-consent") === "true");
    };
    checkConsent();
    window.addEventListener("storage", checkConsent);
    return () => window.removeEventListener("storage", checkConsent);
  }, []);

  useEffect(() => {
    if (consent) {
      // Inject Adsterra Script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//www.highperformanceformat.com/8c4e7f9a1b2c3d4e5f6g7h8i9j0k1l2m/invoke.js"; // Replace with real ID
      script.async = true;
      script.dataset.strategy = "lazyOnload";
      
      const container = document.getElementById(`ad-slot-${size}`);
      if (container) {
        container.appendChild(script);
      }
    }
  }, [consent, size]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        bg-black/20 border border-white/5 rounded-2xl overflow-hidden
        flex flex-col items-center justify-center text-center p-4
        min-h-[200px] relative group cursor-default
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20" />
      
      <span className="text-xs uppercase tracking-widest text-muted-foreground/50 font-bold mb-2 border border-white/10 px-2 py-0.5 rounded">
        Advertisement
      </span>
      {!consent && (
        <p className="text-muted-foreground/30 text-sm max-w-[200px] relative z-20">
          Please accept cookies to see personalized offers
        </p>
      )}

      {/* Ad Script Injection Point */}
      <div id={`ad-slot-${size}`} className="absolute inset-0 z-10 flex items-center justify-center" />
    </motion.div>
  );
}
