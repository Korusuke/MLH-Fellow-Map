import { RefObject, useEffect } from 'react';

function useRefEffect<T = never>({
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
