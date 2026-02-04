import { useState } from "react";
import { ArrowRight, Link as LinkIcon, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useProcessDownload } from "@/hooks/use-downloads";

export function HeroInput() {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const processDownload = useProcessDownload();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Basic validation
    if (!url.startsWith('http')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    processDownload.mutate({ url }, {
      onSuccess: () => {
        toast({
          title: "Processing Started",
          description: "Your video is being processed. It will appear below shortly.",
        });
        setUrl("");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center p-6 md:p-10 lg:p-14 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3 h-3" />
          <span>Universal Downloader</span>
        </div>

        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          Download videos <br />
          from <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow">Anywhere.</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Paste a link from TikTok, Instagram, YouTube, or Twitter and download in highest quality instantly.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl rounded-full transition-opacity group-hover:opacity-30" />
          <div className="relative flex items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 shadow-2xl">
            <div className="pl-4 text-muted-foreground">
              <LinkIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste video URL here..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-muted-foreground/50 px-4 py-3 font-medium"
            />
            <button
              disabled={processDownload.isPending}
              className="
                bg-white text-black hover:bg-primary hover:text-white
                disabled:opacity-70 disabled:cursor-not-allowed
                rounded-xl px-6 py-3 font-bold transition-all duration-200
                flex items-center gap-2 shadow-lg shadow-white/5
              "
            >
              {processDownload.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Download <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground/60 font-medium">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] text-white">
                U{i}
              </div>
            ))}
          </div>
          <p>Trusted by 10k+ users daily</p>
        </div>
      </motion.div>
    </div>
  );
}
