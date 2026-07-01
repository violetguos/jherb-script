import { cpSync, writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const actionsPath = resolve(root, "src", "lib", "actions.ts");
const backupPath = actionsPath + ".bak";

cpSync(actionsPath, backupPath);
writeFileSync(
  actionsPath,
  [
    "export async function createPlan(_formData: FormData) {",
    '  throw new Error("Not available in static mode");',
    "}",
    "export async function updatePlan(_id: number, _formData: FormData) {",
    '  throw new Error("Not available in static mode");',
    "}",
    "export async function deletePlan(_id: number) {",
    '  throw new Error("Not available in static mode");',
    "}",
    "",
  ].join("\n"),
);

try {
  execSync(`npx next build`, {
    stdio: "inherit",
    cwd: root,
    env: {
      ...process.env,
      NEXT_PUBLIC_STATIC_MODE: "true",
    },
  });
} finally {
  cpSync(backupPath, actionsPath);
  unlinkSync(backupPath);
}
