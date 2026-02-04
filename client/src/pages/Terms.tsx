import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-12 px-4 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-headings:font-display prose-a:text-primary hover:prose-a:text-accent prose-strong:text-white"
        >
          <h1>Terms of Service</h1>
          <p className="lead">Please read these terms carefully before using our service.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using UniLoad.io, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Service Usage</h2>
          <p>
            Our service allows you to download videos from various social media platforms. You agree to use this service only for:
          </p>
          <ul>
            <li>Personal, non-commercial use</li>
            <li>Content that you have the right to download</li>
            <li>Content that is publicly available</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            We do not host any copyrighted content on our servers. All videos are downloaded directly from their respective platforms' 
            CDN servers. You remain solely responsible for any content you download and how you use it. 
            Please respect the intellectual property rights of content creators.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall UniLoad.io, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of 
            or inability to access or use the Service.
          </p>

          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            By continuing to access or use our Service after those revisions become effective, you agree 
            to be bound by the revised terms.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
