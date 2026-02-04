import { Download as DownloadIcon, Play, Music, Film, CheckCircle } from "lucide-react";
import { type Download } from "@shared/schema";
import { motion } from "framer-motion";

interface DownloadCardProps {
  download: Download;
  index: number;
}

export function DownloadCard({ download, index }: DownloadCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05 
      }}
      className="group relative bg-card/60 backdrop-blur-md border border-white/5 hover:border-primary/50 rounded-3xl overflow-hidden hover:shadow-[0_0_40px_rgba(var(--primary),0.1)] transition-all duration-500 h-full flex flex-col shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-black/50 overflow-hidden">
        {download.thumbnailUrl ? (
          <img 
            src={download.thumbnailUrl} 
            alt={download.title || "Video thumbnail"} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Film className="w-12 h-12 opacity-20" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        
        {/* Platform Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium uppercase tracking-wider text-white">
          {download.platform}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg leading-tight mb-2 line-clamp-2" title={download.title || "Untitled"}>
          {download.title || "Processed Video"}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {download.format === 'mp3' ? <Music className="w-3 h-3" /> : <Film className="w-3 h-3" />}
            <span className="uppercase">{download.format || 'MP4'}</span>
          </div>

          {download.status === 'completed' && download.videoUrl ? (
            <a 
              href={download.videoUrl} 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 bg-white text-black hover:bg-primary hover:text-white
                font-bold text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2
                transition-all duration-300 transform group-hover:translate-y-0
              "
            >
              <DownloadIcon className="w-4 h-4" />
              Download
            </a>
          ) : (
            <div className="text-sm font-medium text-yellow-500 flex items-center gap-2">
              Processing...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
