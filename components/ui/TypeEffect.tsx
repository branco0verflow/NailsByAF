"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./cn";

type TypeEffectProps = {
    texts: string[];
    className?: string;

    typingSpeed?: number;
    deletingSpeed?: number;
    holdMs?: number;
    gapMs?: number;
    caret?: boolean;
};

export function TypeEffect({
    texts,
    className,
    typingSpeed = 60,
    deletingSpeed = 45,
    holdMs = 4500,
    gapMs = 500,
    caret = true,
}: TypeEffectProps) {
    const textsKey = useMemo(() => (texts?.length ? texts.join("\u0001") : ""), [texts]);
    const safeTexts = useMemo(() => (texts.length ? texts : [""]), [textsKey]);


    const [renderText, setRenderText] = useState("");

    const idxRef = useRef(0);
    const charRef = useRef(0);
    const textRef = useRef(safeTexts[0]);
    const modeRef = useRef<"typing" | "holding" | "deleting" | "gap">("typing");

    const timeoutRef = useRef<number | null>(null);
    const holdUntilRef = useRef(0);
    const runningRef = useRef(false);

    // Reset completo si cambian los textos
    useEffect(() => {
        idxRef.current = 0;
        charRef.current = 0;
        textRef.current = safeTexts[0];
        modeRef.current = "typing";
        setRenderText("");
        runningRef.current = false;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textsKey]);


    useEffect(() => {
        if (runningRef.current) return;
        runningRef.current = true;

        const tick = () => {
            const fullText = textRef.current;
            let delay = typingSpeed;

            switch (modeRef.current) {
                case "typing": {
                    charRef.current++;
                    setRenderText(fullText.slice(0, charRef.current));

                    if (charRef.current >= fullText.length) {
                        modeRef.current = "holding";
                        holdUntilRef.current = Date.now() + holdMs;
                        delay = 120;
                    } else {
                        delay = typingSpeed;
                    }
                    break;
                }

                case "holding": {
                    if (Date.now() >= holdUntilRef.current) {
                        modeRef.current = "deleting";
                        delay = deletingSpeed;
                    } else {
                        delay = 140;
                    }
                    break;
                }

                case "deleting": {
                    charRef.current--;
                    setRenderText(fullText.slice(0, charRef.current));

                    if (charRef.current <= 0) {
                        modeRef.current = "gap";
                        delay = gapMs;
                    } else {
                        delay = deletingSpeed;
                    }
                    break;
                }

                case "gap": {
                    // 🔑 ACA ESTÁ LA CLAVE: avanzar correctamente el texto
                    idxRef.current = (idxRef.current + 1) % safeTexts.length;
                    textRef.current = safeTexts[idxRef.current];
                    charRef.current = 0;
                    setRenderText("");
                    modeRef.current = "typing";
                    delay = typingSpeed;
                    break;
                }
            }

            timeoutRef.current = window.setTimeout(tick, delay);
        };

        timeoutRef.current = window.setTimeout(tick, typingSpeed);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            runningRef.current = false;
        };
    }, [safeTexts, typingSpeed, deletingSpeed, holdMs, gapMs]);

    return (
        <span className={cn("inline-flex items-center", className)} aria-live="polite">
            <span className="whitespace-nowrap">{renderText}</span>

            {caret && (
                <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[1em] w-[1px] bg-white/55 align-[-0.08em] animate-[caret_1.1s_ease-in-out_infinite]"
                />
            )}

            <style jsx>{`
        @keyframes caret {
          0%,
          45% {
            opacity: 1;
          }
          55%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
        </span>
    );
}
