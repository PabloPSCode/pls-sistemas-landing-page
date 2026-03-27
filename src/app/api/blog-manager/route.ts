import { NextResponse } from "next/server";

import { getBlogManagerContent } from "@/api/blog-manager";

export async function GET() {
  try {
    const content = await getBlogManagerContent();

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load blog manager content.";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
