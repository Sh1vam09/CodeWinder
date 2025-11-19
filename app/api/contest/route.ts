import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// --- Interfaces ---
interface Contest {
  id: string;
  title: string;
  platform: string;
  startTime: string;
  endTime: string;
  description: string;
  url: string;
}

// --- 1. LeetCode (Official GraphQL API) ---
async function fetchLeetCode(): Promise<Contest[]> {
  try {
    const query = `
      query upcomingContests {
        topTwoContests {
          title
          titleSlug
          startTime
          duration
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; CodeWinder/1.0)",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000), // 8s timeout
    });

    if (!res.ok) throw new Error(`LeetCode status: ${res.status}`);
    const json = await res.json();

    if (!json.data || !json.data.topTwoContests) return [];

    return json.data.topTwoContests.map((c: any) => {
      const start = new Date(c.startTime * 1000);
      const end = new Date((c.startTime + c.duration) * 1000);
      return {
        id: `lc-${c.titleSlug}`,
        title: c.title,
        platform: "LeetCode",
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        description: `Duration: ${(c.duration / 3600).toFixed(1)} hours`,
        url: `https://leetcode.com/contest/${c.titleSlug}`,
      };
    });
  } catch (e) {
    console.warn("LeetCode fetch failed:", e);
    return [];
  }
}

// --- 2. CodeChef (Official Internal API) ---
async function fetchCodeChef(): Promise<Contest[]> {
  try {
    const res = await fetch(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!res.ok) throw new Error(`CodeChef status: ${res.status}`);
    const json = await res.json();

    // CodeChef returns { present_contests: [], future_contests: [] }
    const upcoming = [
      ...(json.present_contests || []),
      ...(json.future_contests || []),
    ];

    return upcoming.map((c: any) => {
      // CodeChef dates usually come as strings, sometimes ISO
      const start = new Date(c.contest_start_date_iso || c.contest_start_date);
      const end = new Date(c.contest_end_date_iso || c.contest_end_date);
      const durationHours =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      return {
        id: `cc-${c.contest_code}`,
        title: c.contest_name,
        platform: "CodeChef",
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        description: `Duration: ${durationHours.toFixed(1)} hours`,
        url: `https://www.codechef.com/${c.contest_code}`,
      };
    });
  } catch (e) {
    console.warn("CodeChef fetch failed:", e);
    return [];
  }
}

// --- 3. Codeforces (Official API) ---
async function fetchCodeforces(): Promise<Contest[]> {
  try {
    const res = await fetch(
      "https://codeforces.com/api/contest.list?gym=false",
      {
        headers: { "User-Agent": "CodeWinder/1.0" },
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "OK") return [];

    return data.result
      .filter((c: any) => c.phase === "BEFORE")
      .slice(0, 5) // Limit to next 5 to avoid clutter
      .map((c: any) => ({
        id: `cf-${c.id}`,
        title: c.name,
        platform: "Codeforces",
        startTime: new Date(c.startTimeSeconds * 1000).toISOString(),
        endTime: new Date(
          (c.startTimeSeconds + c.durationSeconds) * 1000,
        ).toISOString(),
        description: `Duration: ${(c.durationSeconds / 3600).toFixed(1)} hours`,
        url: `https://codeforces.com/contests/${c.id}`,
      }));
  } catch (e) {
    console.warn("Codeforces fetch failed:", e);
    return [];
  }
}

// --- 4. AtCoder (Kenkoooo API - Most Reliable) ---
async function fetchAtCoder(): Promise<Contest[]> {
  try {
    const res = await fetch(
      "https://kenkoooo.com/atcoder/resources/contests.json",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const now = Date.now();

    return data
      .filter((c: any) => c.start_epoch_second * 1000 > now)
      .slice(0, 5)
      .map((c: any) => ({
        id: `at-${c.id}`,
        title: c.title,
        platform: "AtCoder",
        startTime: new Date(c.start_epoch_second * 1000).toISOString(),
        endTime: new Date(
          (c.start_epoch_second + c.duration_second) * 1000,
        ).toISOString(),
        description: `Duration: ${(c.duration_second / 3600).toFixed(1)} hours`,
        url: `https://atcoder.jp/contests/${c.id}`,
      }));
  } catch (e) {
    console.warn("AtCoder fetch failed:", e);
    return [];
  }
}

// --- Main Handler ---
export async function GET() {
  console.log("Fetching contests from direct sources...");

  const [cf, at, lc, cc] = await Promise.all([
    fetchCodeforces(),
    fetchAtCoder(),
    fetchLeetCode(),
    fetchCodeChef(),
  ]);

  // Combine & Sort
  const allContests = [...cf, ...at, ...lc, ...cc].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  console.log(` Found ${allContests.length} upcoming contests`);
  return NextResponse.json(allContests);
}
