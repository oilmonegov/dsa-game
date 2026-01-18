import { useState, useCallback } from 'react';

export function useConfetti() {
  const [active, setActive] = useState(false);

  const trigger = useCallback(() => {
    setActive(true);
  }, []);

  const reset = useCallback(() => {
    setActive(false);
  }, []);

  const handleComplete = useCallback(() => {
    setActive(false);
  }, []);

  return { active, trigger, reset, handleComplete };
}
