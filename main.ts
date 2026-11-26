// Sorry, I Heard That Wrong — one-line entry.
// Competition: u-kiencx-sorry-i-heard-that-wrong-1858c729
// This program writes one apology line to /output/entry.txt.
// Node 22, standard library only. Deterministic, no network, no input.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

// The mishearing is phonetically plausible: "twenty-one" heard as
// "ninety-one". Two concrete consequences escalate (melted ice cream,
// then the cat — the household's harshest critic — walking out), and
// the twist lands on the last words, with nothing explained.
const MAX_CHARS = 140;

// Build the entry line from its beats.
function entryLine(): string {
  return joinBeats([
    "Sorry \u2014 you said 'set the thermostat to 21,'",
    "I heard 'set it to 91.'",
    "Your ice cream is soup.",
    "Your cat has moved out.",
  ]);
}

const ENTRY_LINE = entryLine();

// Join the beats with single spaces: one line, no double spaces.
function joinBeats(parts: string[]): string {
  return parts.join(" ");
}

// Gate guard: the sealed scorer accepts 1-140 UTF-8 characters, not
// only whitespace. Count code points once, then reuse the count.
function validateLine(line: string): number {
  const len = [...line].length;
  const withinLimits = len >= 1 && len <= MAX_CHARS;
  const singleLine = !line.includes("\n");
  if (!withinLimits || !line.trim() || !singleLine) {
    throw new Error("entry line violates the 1-140 char single-line gate");
  }
  return len;
}

validateLine(ENTRY_LINE);
writeEntry(OUT_DIR, OUT_PATH, ENTRY_LINE);

// Write the validated line with no trailing newline, so the artifact
// is exactly the entry text and nothing else.
function writeEntry(dir: string, path: string, line: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(path, line, "utf8");
}
