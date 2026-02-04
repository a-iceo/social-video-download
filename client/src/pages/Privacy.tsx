import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-12 px-4 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-headings:font-display prose-a:text-primary hover:prose-a:text-accent prose-strong:text-white"
        >
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to UniLoad.io. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>

          <h2>2. Data We Collect</h2>
          <p>
            We do not require user accounts to use our service. The only data we process includes:
          </p>
          <ul>
            <li>URLs of videos you submit for downloading</li>
            <li>Technical data (IP address, browser type) for security and analytics</li>
            <li>Cookies for essential site functionality and advertising</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>
            We use the data strictly to:
          </p>
          <ul>
            <li>Process your video download requests</li>
            <li>Maintain and improve our service</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>

          <h2>4. Advertising</h2>
          <p>
            We use third-party advertising companies (like Adsterra) to serve ads when you visit our website. 
            These companies may use information about your visits to this and other websites in order to provide 
            advertisements about goods and services of interest to you.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            Our website may include links to third-party websites, plug-ins, and applications. 
            Clicking on those links or enabling those connections may allow third parties to collect or share data about you. 
            We do not control these third-party websites and are not responsible for their privacy statements.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
