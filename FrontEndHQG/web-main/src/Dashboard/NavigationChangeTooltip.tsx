import React, { useState, useEffect, RefObject, useRef } from 'react';

// Define custom types
type PositionType = 'nav-adjacent' | 'bottom-right' | Record<string, string>;

interface NavigationChangeTooltipProps {
  position?: PositionType;
  message?: string;
  title?: string;
  navRef?: RefObject<HTMLElement> | null;
}

const NavigationChangeTooltip: React.FC<NavigationChangeTooltipProps> = ({ 
  position = 'nav-adjacent',
  message = "We've moved some navigation items to improve your experience. Check out the new menu layout!",
  title = "Navigation Update",
  navRef = null
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState<Record<string, string>>({});
  const maxDisplays = 5;
  const hasViewBeenTracked = useRef(false);
  
  useEffect(() => {
    // Check localStorage for user preference
    const dontShowAgain = localStorage.getItem('navChangeTooltipDismissed') === 'true';
    const viewCount = parseInt(localStorage.getItem('navChangeTooltipViews') || '0', 10);
    
    // Show tooltip if user hasn't dismissed it and hasn't seen it 5 times
    if (!dontShowAgain && viewCount < maxDisplays) {
      setShowTooltip(true);
      setDisplayCount(viewCount);
      
      // Use a ref to track if we've already incremented to prevent double counting
      if (!hasViewBeenTracked.current) {
        // Increment and save view count
        const newViewCount = viewCount + 1;
        localStorage.setItem('navChangeTooltipViews', newViewCount.toString());
        
        // Set flag to prevent double counting
        hasViewBeenTracked.current = true;
      }
    }
    
    // Set position based on props
    if (position && typeof position === 'object') {
      setTooltipPosition(position as Record<string, string>);
    } else if (position === 'nav-adjacent') {
      setTooltipPosition({ top: '4rem', right: '1rem' });
    } else if (position === 'bottom-right') {
      setTooltipPosition({ bottom: '1rem', right: '1rem' });
    }
    
    // If navRef is provided, position relative to navigation element
    if (navRef && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: `${navRect.bottom + 8}px`,
        left: `${navRect.right - 256}px` // Tooltip width is 256px (w-64)
      });
    }
  }, [position, navRef]);
  
  const handleDismiss = () => {
    setShowTooltip(false);
  };
  
  const handleDontShowAgain = () => {
    localStorage.setItem('navChangeTooltipDismissed', 'true');
    setShowTooltip(false);
  };
  
  if (!showTooltip) return null;
  
  return (
    <div 
      className="w-64 bg-white shadow-lg rounded-lg p-4 border border-blue-200 animate-fade-in fixed z-50"
      style={tooltipPosition}
    >
      <div className="absolute top-2 right-2">
        <button 
          onClick={handleDismiss} 
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      
      <div className="mb-3">
        <h3 className="font-bold text-lg text-blue-600">{title}</h3>
        <p className="text-sm text-gray-700 mt-1">
          {message}
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handleDontShowAgain}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Don't show again
        </button>
        <button
          onClick={handleDismiss}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default NavigationChangeTooltip;