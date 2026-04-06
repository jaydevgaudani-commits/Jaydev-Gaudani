import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'glass' | 'surface' | 'lowest';
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  className, 
  children,
  variant = 'glass',
  onClick
}) => {
  const baseStyles = "rounded-lg p-6 flex flex-col transition-all duration-500 group border cursor-crosshair";
  
  const variantStyles = {
    glass: "liquid-glass bg-white/[0.03] border-white/10 hover:border-primary/40 hover:bg-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]",
    surface: "bg-surface text-white border-white/5 hover:border-primary/20",
    lowest: "bg-background border-white/5 hover:border-primary/20"
  };

  return (
    <div 
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      <div className="flex flex-col gap-1 mb-4">
        {subtitle && (
          <span className="mono-data text-[10px] uppercase tracking-[0.3em] text-primary font-bold group-hover:tracking-[0.4em] transition-all duration-500">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors duration-500">
          {title}
        </h3>
      </div>
      
      {description && (
        <p className="text-sm text-gray-400 font-medium mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      )}
      
      <div className="flex-1">
        {children}
      </div>
      
      <div className="mt-4 flex items-center justify-end opacity-20 group-hover:opacity-100 transition-all duration-500">
        <button 
          aria-label={`Access module for ${title}`}
          className="text-[9px] mono-data text-primary underline-offset-8 underline decoration-primary/30 group-hover:decoration-primary group-hover:tracking-widest transition-all"
        >
          ACCESS_MODULE_01 // RUN_INIT
        </button>
      </div>
    </div>
  );
};

export const BentoGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "grid gap-4 max-w-7xl mx-auto w-full",
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      className
    )}>
      {children}
    </div>
  );
};
