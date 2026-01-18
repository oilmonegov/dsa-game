import { useState, useCallback, useRef, useEffect } from 'react';

type AnimationType = 'bounce' | 'shake' | 'pulse' | 'pop' | 'fade' | 'slide' | 'wiggle' | 'confetti';

interface UseAnimationOptions {
  duration?: number;
  onComplete?: () => void;
}

interface UseAnimationReturn {
  isAnimating: boolean;
  animationClass: string;
  trigger: () => void;
  reset: () => void;
}

const animationClasses: Record<AnimationType, string> = {
  bounce: 'animate-bounce-in',
  shake: 'animate-shake',
  pulse: 'animate-pulse-success',
  pop: 'animate-pop',
  fade: 'animate-fade-in',
  slide: 'animate-slide-up',
  wiggle: 'animate-wiggle',
  confetti: '',
};

const animationDurations: Record<AnimationType, number> = {
  bounce: 500,
  shake: 500,
  pulse: 500,
  pop: 300,
  fade: 300,
  slide: 300,
  wiggle: 500,
  confetti: 3000,
};

export function useAnimation(
  type: AnimationType,
  { duration, onComplete }: UseAnimationOptions = {}
): UseAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const finalDuration = duration ?? animationDurations[type];

  const trigger = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsAnimating(true);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      onComplete?.();
    }, finalDuration);
  }, [finalDuration, onComplete]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsAnimating(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isAnimating,
    animationClass: isAnimating ? animationClasses[type] : '',
    trigger,
    reset,
  };
}

interface UseMultiAnimationReturn {
  activeAnimation: AnimationType | null;
  getAnimationClass: (type: AnimationType) => string;
  triggerAnimation: (type: AnimationType, duration?: number) => void;
  triggerSequence: (sequence: AnimationType[], delay?: number) => void;
  reset: () => void;
}

export function useMultiAnimation(): UseMultiAnimationReturn {
  const [activeAnimation, setActiveAnimation] = useState<AnimationType | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const sequenceRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    sequenceRef.current.forEach(clearTimeout);
    sequenceRef.current = [];
  }, []);

  const triggerAnimation = useCallback((type: AnimationType, duration?: number) => {
    clearAllTimeouts();
    setActiveAnimation(type);

    const finalDuration = duration ?? animationDurations[type];
    timeoutRef.current = setTimeout(() => {
      setActiveAnimation(null);
    }, finalDuration);
  }, [clearAllTimeouts]);

  const triggerSequence = useCallback((sequence: AnimationType[], delay = 500) => {
    clearAllTimeouts();

    sequence.forEach((type, index) => {
      const timeout = setTimeout(() => {
        setActiveAnimation(type);

        const endTimeout = setTimeout(() => {
          if (index === sequence.length - 1) {
            setActiveAnimation(null);
          }
        }, animationDurations[type]);

        sequenceRef.current.push(endTimeout);
      }, index * delay);

      sequenceRef.current.push(timeout);
    });
  }, [clearAllTimeouts]);

  const getAnimationClass = useCallback((type: AnimationType) => {
    return activeAnimation === type ? animationClasses[type] : '';
  }, [activeAnimation]);

  const reset = useCallback(() => {
    clearAllTimeouts();
    setActiveAnimation(null);
  }, [clearAllTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return clearAllTimeouts;
  }, [clearAllTimeouts]);

  return {
    activeAnimation,
    getAnimationClass,
    triggerAnimation,
    triggerSequence,
    reset,
  };
}

export function useCelebration() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationText, setCelebrationText] = useState<string | null>(null);

  const celebrate = useCallback((text?: string, duration = 3000) => {
    setShowConfetti(true);
    if (text) {
      setCelebrationText(text);
    }

    setTimeout(() => {
      setShowConfetti(false);
      setCelebrationText(null);
    }, duration);
  }, []);

  const reset = useCallback(() => {
    setShowConfetti(false);
    setCelebrationText(null);
  }, []);

  return {
    showConfetti,
    celebrationText,
    celebrate,
    reset,
  };
}

export default useAnimation;
