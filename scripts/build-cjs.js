import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const distDir = resolve(process.cwd(), "dist");
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Generate CommonJS bridge
const cjsBridge = `
"use strict";
const esmPromise = import("./index.js");

module.exports = new Proxy({}, {
  get(target, prop) {
    return async (...args) => {
      const mod = await esmPromise;
      if (typeof mod[prop] === "function") {
        return mod[prop](...args);
      }
      return mod[prop];
    };
  }
});
`;

writeFileSync(resolve(distDir, "index.cjs"), cjsBridge.trim() + "\n", "utf8");
console.log("✓ CommonJS bridge generated at dist/index.cjs");
