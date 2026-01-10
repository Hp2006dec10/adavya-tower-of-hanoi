"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TowerRules } from "./shared/rules";

type GameToken = {
  status: "playing" | "completed";
  startTime: number;
  moves?: number;
  completedAt?: number;
};

const STORAGE_KEY = "hanoiStatus";

export default function Home() {
  const [showRules, setShowRules] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as GameToken;
      if (parsed.status === "completed") {
        router.replace("/completed");
      }
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, [router]);

  const ruleContent = useMemo(
    () => ({
      title: "Game Rules",
      intro:
        "Before you begin, make sure you follow the official relay rules for this Tower of Hanoi challenge.",
      bullets: [
        "The game begins with all 5 disks stacked on the 1st peg.",
        "Your goal is to move the entire stack to the 3rd peg following Tower of Hanoi rules.",
        "Only one disk can be moved at a time.",
        "Each move takes the upper disk from a stack and places it on another peg.",
        "No larger disk may ever sit on top of a smaller disk.",
        "Relay format: each participant makes a single move and tags the next.",
        "If an illegal move happens, you may reset but must restart from Player 1.",
        "Completion is verified when the 5th disk rests correctly on the destination peg.",
        "Time limit for each iteration of the game is 2 minutes. After 2 minutes, the game restarts to new iteration.",
        "For the new iteration, the team can either start from the Participant 1 or continue with the next person in the queue."
      ],
    }),
    []
  );

  const startGame = () => {
    const now = Date.now();
    const token: GameToken = { status: "playing", startTime: now, moves: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
    router.push("/game");
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8">
      {!showRules ? (
        <div className="glass-card w-full max-w-md rounded-3xl px-8 py-10 text-center">
          <h1
            className="text-4xl font-bold tracking-wide text-slate-50 drop-shadow-sm"
            style={{ fontFamily: "var(--font-bungee)" }}
          >
            Tower of Hanoi
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Ready to conquer the classic puzzle? Begin the relay and keep the
            disks moving.
          </p>
          <button
            onClick={() => setShowRules(true)}
            className="mt-10 w-full rounded-full bg-white px-6 py-3 text-lg font-semibold text-slate-900 transition hover:bg-slate-200 cursor-pointer"
          >
            Play
          </button>
        </div>
      ) : (
        <div className="glass-card w-full max-w-4xl rounded-3xl px-6 py-8 sm:px-10 h-full">
          <TowerRules content={ruleContent} />
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setShowRules(false)}
              className="w-1/2 rounded-full border border-slate-400 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800 cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={startGame}
              className="w-1/2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200 cursor-pointer"
            >
              Begin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
