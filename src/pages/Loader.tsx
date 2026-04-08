import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center max-w-md mx-auto shadow-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12L10 6V18L4 12Z" fill="black"/>
          <path d="M20 12L14 6V18L20 12Z" fill="black"/>
        </svg>
        <span className="text-xl font-semibold tracking-wide">GPP CRM</span>
      </motion.div>
    </div>
  );
}
