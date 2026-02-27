import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import LoaderOverlay, { type LoaderPhase, type LoaderVariant } from "@/components/LoaderOverlay";

type TransitionRequest = {
  variant: LoaderVariant;
  onReady?: () => void;
};

type PageTransitionContextType = {
  startTransition: (request: TransitionRequest) => void;
  isTransitioning: boolean;
  phase: LoaderPhase;
};

const ENTER_MS = 540;
const HOLD_MS = 360;
const EXIT_MS = 700;

const STORAGE_KEY = "artbox-loader-seen-v1";

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

const resolveVariantByPath = (pathname: string): LoaderVariant => {
  if (pathname.startsWith("/host")) return "host";
  if (pathname.startsWith("/agency")) return "agency";
  return "neutral";
};

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [phase, setPhase] = useState<LoaderPhase>("idle");
  const [variant, setVariant] = useState<LoaderVariant>("neutral");
  const phaseRef = useRef<LoaderPhase>("idle");
  const readyCallbackRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTransition = useCallback(({ variant: nextVariant, onReady }: TransitionRequest) => {
    if (phaseRef.current !== "idle") return;

    setVariant(nextVariant);
    readyCallbackRef.current = onReady ?? null;
    setPhase("enter");
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    clearTimer();

    if (phase === "enter") {
      timerRef.current = window.setTimeout(() => setPhase("hold"), ENTER_MS);
      return;
    }

    if (phase === "hold") {
      timerRef.current = window.setTimeout(() => {
        readyCallbackRef.current?.();
        readyCallbackRef.current = null;
        setPhase("exit");
      }, HOLD_MS);
      return;
    }

    if (phase === "exit") {
      timerRef.current = window.setTimeout(() => setPhase("idle"), EXIT_MS);
    }
  }, [clearTimer, phase]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    if (phase === "idle") return;

    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    startTransition({ variant: resolveVariantByPath(location.pathname) });
  }, [location.pathname, startTransition]);

  const value = useMemo<PageTransitionContextType>(
    () => ({
      startTransition,
      isTransitioning: phase !== "idle",
      phase,
    }),
    [phase, startTransition],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <LoaderOverlay phase={phase} variant={variant} />
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used inside PageTransitionProvider");
  }
  return context;
};
