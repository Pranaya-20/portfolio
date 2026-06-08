import React, { useState } from 'react';

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip: React.FC<{ children: React.ReactNode; delayDuration?: number }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass visibility state to tooltip content if needed, or rely on group hover
          return React.cloneElement(child as React.ReactElement<any>, { visible });
        }
        return child;
      })}
    </div>
  );
};

export const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({
  children,
}) => {
  return <>{children}</>;
};

export const TooltipContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  visible?: boolean;
}> = ({ children, className = '', side = 'top', visible }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`absolute z-50 overflow-hidden rounded-md bg-text-primary px-3 py-1.5 text-xs text-bg shadow-md transition-all duration-200 pointer-events-none ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${positionClasses[side]} ${className}`}
      style={{ transformOrigin: side === 'top' ? 'bottom center' : 'top center' }}
    >
      {children}
    </div>
  );
};
