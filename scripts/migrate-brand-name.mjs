#!/usr/bin/env node
/**
 * Миграция брендового имени: NEERO → Смирнова
 * Запуск: node scripts/migrate-brand-name.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const EXT = new Set([".ts", ".tsx", ".html", ".js", ".json", ".md", ".sql"]);
const SKIP = new Set(["node_modules", ".next", ".git"]);

const REPLACEMENTS = [
  [/NATALI NEERO/g, "НАТАЛИ СМИРНОВА"],
  [/Натали Neero/g, "Натали Смирнова"],
  [/Natali Neero/g, "Natalia Smirnova"],
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else if (EXT.has(extname(name))) files.push(path);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const original = readFileSync(file, "utf8");
  let next = original;
  for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
  if (next !== original) {
    writeFileSync(file, next, "utf8");
    changed += 1;
    console.log("updated:", file.replace(ROOT + "\\", ""));
  }
}

console.log(`Done. Files updated: ${changed}`);
