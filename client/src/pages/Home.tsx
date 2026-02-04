import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroInput } from "@/components/HeroInput";
import { DownloadCard } from "@/components/DownloadCard";
import { AdContainer } from "@/components/AdContainer";
import { useDownloads } from "@/hooks/use-downloads";
import { SiTiktok, SiInstagram, SiYoutube, SiX } from "react-icons/si";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
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

      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {/* Hero Section - Spans 2x2 on large screens */}
          <motion.div 
            variants={item}
            className="col-span-1 md:col-span-3 lg:col-span-3 row-span-2 relative overflow-hidden rounded-3xl bg-card border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <HeroInput />
          </motion.div>

          {/* Platform Support Box */}
          <motion.div variants={item} className="col-span-1 md:col-span-1 lg:col-span-1 bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:bg-card/80 transition-colors">
            <h3 className="font-display font-bold text-lg">Supported<br/>Platforms</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {platforms.map((p) => (
                <div key={p.name} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default group ${p.color}`}>
                  <p.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ad Space 1 */}
          <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-1">
            <AdContainer className="h-full rounded-3xl" size="small" />
          </motion.div>

          {/* Recent Downloads Section Title */}
          <motion.div variants={item} className="col-span-full mt-8 mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <span className="w-2 h-8 rounded-full bg-accent inline-block" />
              Recent Downloads
            </h2>
            <div className="text-sm text-muted-foreground">
              {isLoading ? "Loading..." : `${downloads?.length || 0} processed`}
            </div>
          </motion.div>

          {/* Downloads Grid */}
          {isLoading ? (
            // Skeleton Loading State
            [...Array(4)].map((_, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className="h-[280px] rounded-2xl bg-white/5 animate-pulse"
              />
            ))
          ) : downloads?.length === 0 ? (
            // Empty State
            <motion.div variants={item} className="col-span-full h-64 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-white/10 rounded-3xl bg-white/5">
              <p className="mb-2 text-lg font-medium">No downloads yet</p>
              <p className="text-sm opacity-50">Paste a link above to get started</p>
            </motion.div>
          ) : (
            // Download Cards
            <>
              {downloads?.map((download, index) => (
                <motion.div key={download.id} variants={item} className="col-span-1">
                  <DownloadCard download={download} index={index} />
                </motion.div>
              ))}
              
              {/* Interspersed Ad */}
              <motion.div variants={item} className="col-span-1">
                <AdContainer className="h-full rounded-2xl border-dashed border-2 border-white/10 bg-transparent" />
              </motion.div>
            </>
          )}

        </motion.div>
      </main>
    </div>
  );
}
