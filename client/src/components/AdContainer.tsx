import { motion } from "framer-motion";

interface AdContainerProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function AdContainer({ className = "", size = "medium" }: AdContainerProps) {
  // This is a placeholder for Adsterra or other ad networks
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
      <p className="text-muted-foreground/30 text-sm max-w-[200px]">
        Support us by disabling adblock
      </p>

      {/* Ad Script Injection Point */}
      <div id={`ad-slot-${size}`} className="absolute inset-0 z-10" />
    </motion.div>
  );
}
