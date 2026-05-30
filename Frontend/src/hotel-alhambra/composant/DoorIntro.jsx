import { useState, useEffect, useCallback } from "react";
import "./DoorIntro.css";

const STORAGE_KEY = "alhambra_intro_seen";

export default function DoorIntro({ children }) {
  const [phase, setPhase] = useState("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      setPhase("done");
      return;
    }
    setVisible(true);
    setPhase("present");
  }, []);

  const enter = useCallback(() => {
    if (phase === "opening" || phase === "fadeout" || phase === "done") return;
    setPhase("opening");
    setTimeout(() => setPhase("fadeout"), 2400);
    setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      setPhase("done");
    }, 3300);
  }, [phase]);

  useEffect(() => {
    if (phase !== "present") return;
    const timer = setTimeout(enter, 4200);
    return () => clearTimeout(timer);
  }, [phase, enter]);

  if (!visible && phase === "done") {
    return children;
  }

  return (
    <>
      {(phase === "fadeout" || phase === "done") && children}

      {visible && (
        <div
          className={`door-intro ${phase === "opening" ? "door-intro--opening" : ""} ${phase === "fadeout" ? "door-intro--exit" : ""}`}
          role="dialog"
          aria-label="Welcome to Alhambra Hotel"
        >
          <div className="door-intro__ambient" />
          <div className="door-intro__rays" />
          <div className="door-intro__particles">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="door-intro__particle" style={{ "--i": i }} />
            ))}
          </div>

          <div className="door-intro__light-core" />

          <div className={`door-intro__door door-intro__door--left ${phase === "opening" ? "is-open" : ""}`}>
            <div className="door-intro__panel">
              <div className="door-intro__inlay" />
              <div className="door-intro__handle" />
            </div>
          </div>
          <div className={`door-intro__door door-intro__door--right ${phase === "opening" ? "is-open" : ""}`}>
            <div className="door-intro__panel">
              <div className="door-intro__inlay" />
              <div className="door-intro__handle door-intro__handle--right" />
            </div>
          </div>

          <div className={`door-intro__brand ${phase === "opening" ? "door-intro__brand--fade" : ""}`}>
            <p className="door-intro__eyebrow">Tangier · Morocco</p>
            <h1 className="door-intro__logo">✦ Alhambra ✦</h1>
            <p className="door-intro__tagline">Palace &amp; Resort</p>
            {phase === "present" && (
              <button type="button" className="door-intro__cta" onClick={enter}>
                Enter the Palace
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
