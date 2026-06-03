import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export function GET() {
  const dir = path.join(process.cwd(), "public", "images");
  let files: string[] = [];
  try {
    files = readdirSync(dir)
      .filter((f) => f.startsWith("delivery-") && f.endsWith(".jpg"))
      .map((f) => f.replace("delivery-", "").replace(".jpg", ""))
      .sort((a, b) => Number(a) - Number(b));
  } catch {
    // directory doesn't exist yet
  }
  return NextResponse.json({ images: files });
}
