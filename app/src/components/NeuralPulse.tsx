import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NeuralPulse: React.FC = () => {
  // Generate a set of pseudo-random network paths
  const paths = useMemo(() => [
    "M0,50 Q25,0 50,50 T100,50",
    "M0,20 Q50,80 100,20",
    "M0,80 Q50,20 100,80",
    "M10,0 Q90,50 10,100",
    "M90,0 Q10,50 90,100"
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.5, 0.5, 0],
              pathOffset: [0, 0, 1, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default NeuralPulse;
