import React, { useEffect } from 'react';

type Config = {
  interval?: number;
}

/**
 * React polling hook to poll any function
 * 
 * @param {function} func - the callback function to poll
 * @param {any[]} deps - the dependencies of the polling
 * @param {Object} config - polling configuration
 * @param {number} [config.interval=5000] - the time (in ms) between polls
 */
export default function usePoll(func: React.EffectCallback, deps: React.DependencyList | undefined = undefined, config: Config = {}): void {
  if (typeof func !== 'function') throw new TypeError('Can\'t poll without a callback function');

  const {
    interval = 5000,
  } = config;

  return useEffect(() => {
    let killed = false;

    async function poll() {
      if (killed) return;
      await func();
      setTimeout(poll, interval);
    }

    poll();

    return () => {
      killed = true;
    }
  }, deps);
}
