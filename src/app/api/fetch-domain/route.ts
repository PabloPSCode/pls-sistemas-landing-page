import { NextRequest, NextResponse } from "next/server";

import { fetchDomainAvailability } from "@/api/fetch-domain";

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain") ?? "";
  const result = await fetchDomainAvailability(domain);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result, { status: 200 });
}
