import { Link, useLocation } from "wouter";
import { Download, Shield, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Downloader", icon: Download },
    { href: "/privacy", label: "Privacy", icon: Shield },
    { href: "/terms", label: "Terms", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-black font-bold text-xl font-display group-hover:scale-110 transition-transform">
              U
            </div>
            <span className="font-display font-bold text-lg hidden sm:block tracking-wide">
              UniLoad<span className="text-primary">.io</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2 bg-black/20 p-1 rounded-xl">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2
                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                  `}>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-lg shadow-inner"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4" />
                    <span className="relative z-10 hidden sm:block">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
