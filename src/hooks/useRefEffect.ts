import { RefObject, useEffect } from 'react';

function useRefEffect<T = unknown>({
  effect,
  ref,
}: {
  effect: (val: T | null) => void;
  ref: RefObject<T>;
}) {
  useEffect(() => {
    effect(ref.current);
  }, [effect, ref]);
}

export default useRefEffect;
