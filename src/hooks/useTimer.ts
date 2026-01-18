import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  initialTime?: number;
  countDown?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (time: number) => void;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: (newTime?: number) => void;
  stop: () => void;
  formatted: string;
  formattedDetailed: string;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeDetailed(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function useTimer({
  initialTime = 0,
  countDown = false,
  autoStart = false,
  onComplete,
  onTick,
}: UseTimerOptions = {}): UseTimerReturn {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  // Keep refs up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    setIsPaused(false);
    setIsRunning(true);
  }, []);

  const reset = useCallback((newTime?: number) => {
    clearTimer();
    setTime(newTime ?? initialTime);
    setIsRunning(false);
    setIsPaused(false);
  }, [clearTimer, initialTime]);

  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
  }, [clearTimer]);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = countDown ? prevTime - 1 : prevTime + 1;

        onTickRef.current?.(newTime);

        if (countDown && newTime <= 0) {
          clearTimer();
          setIsRunning(false);
          onCompleteRef.current?.();
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, countDown, clearTimer]);

  return {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    stop,
    formatted: formatTime(time),
    formattedDetailed: formatTimeDetailed(time),
  };
}

export default useTimer;
