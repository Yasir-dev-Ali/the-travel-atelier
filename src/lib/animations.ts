import { useEffect, useRef } from "react";

/**
 * Lazily loads GSAP + ScrollTrigger on the client only (they are never
 * imported during SSR) and runs `setup` inside a gsap.context scoped to the
 * returned ref, so every animation is reverted cleanly on unmount.
 *
 * Wrap animations in `gsap.matchMedia().add("(prefers-reduced-motion:
 * no-preference)", ...)` so content stays fully visible for users who opt
 * out of motion. Hidden states must be set inside that block, never via CSS.
 */
export function useGsapAnimation<T extends HTMLElement>(
  setup: (modules: GsapModules) => void,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    let alive = true;
    let ctx: { revert: () => void } | null = null;

    loadGsap().then((modules) => {
      if (!alive || !ref.current) return;
      ctx = modules.gsap.context(() => setup(modules), ref.current as T);
    });

    return () => {
      alive = false;
      ctx?.revert();
    };
    // Setup is authored inline per section and only ever runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

export type GsapModules = {
  gsap: typeof import("gsap")["default"];
  ScrollTrigger: typeof import("gsap/ScrollTrigger")["ScrollTrigger"];
};

let modulesPromise: Promise<GsapModules> | null = null;

function loadGsap(): Promise<GsapModules> {
  modulesPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]).then(([gsapModule, scrollTriggerModule]) => {
    gsapModule.default.registerPlugin(scrollTriggerModule.ScrollTrigger);
    return {
      gsap: gsapModule.default,
      ScrollTrigger: scrollTriggerModule.ScrollTrigger,
    };
  });
  return modulesPromise;
}
