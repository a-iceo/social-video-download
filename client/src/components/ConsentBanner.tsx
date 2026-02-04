import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
    window.dispatchEvent(new Event("storage")); // Notify AdContainer
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[100]"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg mb-1">Cookies & Privacy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  We use cookies to improve your experience and show personalized ads. By using our site, you agree to our use of cookies.
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={accept}
                    className="flex-1 bg-primary text-black font-bold hover:bg-primary/90 transition-all rounded-xl"
                  >
                    Accept All
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShow(false)}
                    className="border-white/10 hover:bg-white/5 rounded-xl"
                  >
                    Decline
                  </Button>
                </div>
              </div>
              <button 
                onClick={() => setShow(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
