import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1512367301914001408/M6hVuKVpWdgnwE90Moh0evD7uyDhqzq8y5-_yVbJHpNXoH97VWLBr7ilmCoIFoqVOQPr";

interface NotifyBody {
  name: string;
  contact: string;
  car: string;
  usage: string;
  budget: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: NotifyBody = await req.json();
    const now = new Date();
    const tw = now.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });

    const embed = {
      title: "📩 新購車諮詢",
      color: 0xe60012,
      fields: [
        { name: "姓名", value: body.name || "（未填）", inline: true },
        { name: "聯絡方式", value: body.contact || "（未填）", inline: true },
        { name: "想了解車款", value: body.car || "（未選）", inline: true },
        { name: "購車用途", value: body.usage || "（未選）", inline: true },
        { name: "預算區間", value: body.budget || "（未選）", inline: true },
      ],
      footer: { text: `收到時間：${tw}` },
    };

    const res = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!res.ok) {
      console.error("Discord webhook failed:", res.status, await res.text());
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Notify API error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
