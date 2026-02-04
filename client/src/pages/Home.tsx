import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroInput } from "@/components/HeroInput";
import { DownloadCard } from "@/components/DownloadCard";
import { AdContainer } from "@/components/AdContainer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { useDownloads } from "@/hooks/use-downloads";
import { SiTiktok, SiInstagram, SiYoutube, SiX } from "react-icons/si";
import { Link } from "wouter";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Home() {
  const { data: downloads, isLoading } = useDownloads();

  const platforms = [
    { name: "TikTok", icon: SiTiktok, color: "hover:text-[#ff0050]" },
    { name: "Instagram", icon: SiInstagram, color: "hover:text-[#E1306C]" },
    { name: "YouTube", icon: SiYoutube, color: "hover:text-[#FF0000]" },
    { name: "Twitter / X", icon: SiX, color: "hover:text-white" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none mix-blend-overlay" />
      {/* Abstract gradients */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
        >
          {/* Hero Section - Spans 2x2 on large screens */}
          <motion.div 
            variants={item}
            className="col-span-1 md:col-span-3 lg:col-span-3 row-span-2 relative overflow-hidden rounded-3xl bg-card border border-white/5 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 group-hover:opacity-100 opacity-50 transition-opacity" />
            <HeroInput />
          </motion.div>

          {/* Platform Support Box */}
          <motion.div variants={item} className="col-span-1 md:col-span-1 lg:col-span-1 bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:bg-card/60 transition-all hover:border-white/10 group shadow-xl">
            <h3 className="font-display font-bold text-xl mb-4">Support for <span className="text-primary">Social</span></h3>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              {platforms.map((p) => (
                <div key={p.name} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-default group/icon ${p.color} border border-transparent hover:border-white/5`}>
                  <p.icon className="w-8 h-8 transition-transform group-hover/icon:scale-125" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ad Space 1 */}
          <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-1">
            <AdContainer className="h-full rounded-3xl border-white/5 bg-card/30" size="small" />
          </motion.div>

          {/* Recent Downloads Section Title */}
          <motion.div variants={item} className="col-span-full mt-12 mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-3xl font-display font-bold flex items-center gap-3">
              <span className="w-2 h-10 rounded-full bg-primary inline-block shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
              Download Feed
            </h2>
            <div className="px-4 py-1 rounded-full bg-white/5 text-xs font-mono text-muted-foreground uppercase tracking-tighter">
              {isLoading ? "Syncing..." : `${downloads?.length || 0} items`}
            </div>
          </motion.div>

          {/* Downloads Grid */}
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Skeleton Loading State
              [...Array(4)].map((_, i) => (
                <motion.div 
                  key={`skeleton-${i}`} 
                  variants={item}
                  className="h-[280px] rounded-3xl bg-white/5 animate-pulse border border-white/5"
                />
              ))
            ) : downloads?.length === 0 ? (
              // Empty State
              <motion.div 
                variants={item} 
                className="col-span-full h-80 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-white/10 rounded-3xl bg-white/[0.02]"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <SiYoutube className="w-8 h-8 opacity-20" />
                </div>
                <p className="mb-2 text-xl font-display font-bold text-white">Your list is empty</p>
                <p className="text-sm opacity-50">Enter a URL above to start downloading</p>
              </motion.div>
            ) : (
              // Download Cards
              <>
                {downloads?.map((download, index) => (
                  <motion.div 
                    key={download.id} 
                    variants={item} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="col-span-1"
                  >
                    <DownloadCard download={download} index={index} />
                  </motion.div>
                ))}
                
                {/* Interspersed Ad */}
                <motion.div variants={item} layout className="col-span-1">
                  <AdContainer className="h-full rounded-3xl border-dashed border-2 border-white/5 bg-transparent opacity-80" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Links */}
        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© 2026 Universal Downloader. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </footer>
      </main>

      <ConsentBanner />
    </div>
  );
}
