import fs from "fs/promises";
import path from "path";

function getDataFilePath(filename) {
  return path.resolve("data", filename);
}

export async function readJsonFile(filename) {
  const filePath = getDataFilePath(filename);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function writeJsonFile(filename, data) {
  const filePath = getDataFilePath(filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
