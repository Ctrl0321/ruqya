import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0C8281]"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl text-primary-200 font-semibold animate-pulse mt-4">
          Loading
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="inline-block mx-1"
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="inline-block mx-1"
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="inline-block mx-1"
          >
            .
          </motion.span>
        </h3>
      </div>
    </div>
  );
}

export default LoadingSpinner;
