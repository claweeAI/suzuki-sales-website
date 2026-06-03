"use client";

import { useState } from "react";
import { dealer, cars, services, usageOptions, budgetRanges, type Car } from "@/data/site";

const R = "#e60012";

export default function HomePage() {
  const [form, setForm] = useState({ name: "", contact: "", car: "", usage: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [modalCar, setModalCar] = useState<Car | null>(null);

  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ ...form, timestamp: new Date().toISOString() }),
      });
    } catch {}
    setSending(false);
    setSubmitted(true);
  };

  const lineHref = `https://line.me/R/ti/p/~${dealer.line}`;
  const phoneHref = `tel:${dealer.phone.replace(/[^0-9]/g, "")}`;

  const openModal = (car: Car) => setModalCar(car);
  const closeModal = () => setModalCar(null);

  return (
    <>
      <style>{`
        .car-shape {
          position: relative;
          width: 148px;
          height: 82px;
          margin: 12px auto 0;
          background: ${R};
          border-radius: 28px 36px 18px 18px;
          box-shadow: inset 0 -12px 0 rgba(0,0,0,0.18);
        }
        .car-shape::before {
          content: "";
          position: absolute;
          left: 36px;
          top: 14px;
          width: 72px;
          height: 28px;
          background: #f6f6f6;
          border-radius: 18px 18px 6px 6px;
          opacity: 0.9;
        }
        .car-shape::after {
          content: "";
          position: absolute;
          left: 22px;
          bottom: -10px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #222;
          box-shadow: 82px 0 0 #222;
        }
        .car-shape.swift { border-radius: 32px 40px 20px 20px; height: 78px; }
        .car-shape.vitara { border-radius: 18px 26px 16px 16px; height: 88px; }
        .car-shape.jimny { border-radius: 8px 8px 14px 14px; height: 92px; width: 138px; }
        .car-shape.e-vitara,
        .car-shape.s-cross { border-radius: 22px 34px 18px 18px; height: 84px; }
        .car-shape.e-vitara::before { width: 60px; left: 44px; border-radius: 14px 14px 4px 4px; }
        .car-shape.s-cross::before { width: 66px; left: 42px; border-radius: 14px 14px 4px 4px; }
        .car-shape.carry { border-radius: 10px 10px 14px 14px; height: 82px; width: 168px; background: #c0392b; }
        .car-shape.carry::before { width: 80px; left: 44px; border-radius: 6px; height: 24px; top: 12px; }
        .car-shape.carry::after { left: 26px; box-shadow: 118px 0 0 #222; }

        .fake-qr {
          display: grid;
          grid-template-columns: repeat(6, 18px);
          grid-auto-rows: 18px;
          gap: 5px;
          padding: 16px;
          background: #fff;
          border: 10px solid #fff;
          box-shadow: 0 0 0 1px #e7e7e7;
        }
        .fake-qr span { background: #e7e7e7; }
        .fake-qr span:nth-child(3n+1),
        .fake-qr span:nth-child(4n),
        .fake-qr span:nth-child(7),
        .fake-qr span:nth-child(11),
        .fake-qr span:nth-child(16) { background: #111; }

        /* Modal overlay animation */
        .modal-overlay {
          animation: fadeIn 0.2s ease;
        }
        .modal-content {
          animation: scaleIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <main className="min-h-screen bg-[#2f2f2f] antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans TC", Arial, sans-serif' }}>
        {/* ── 頁面容器 ── */}
        <div className="max-w-[1180px] mx-auto my-7 bg-[#f5f5f5] rounded-[20px] shadow-[0_26px_80px_rgba(0,0,0,0.28)] overflow-hidden max-sm:my-0 max-sm:rounded-none max-sm:shadow-none">

          {/* ═══════ HERO — 大頭照 + 資訊 ═══════ */}
          <section className="relative px-11 pb-[54px] pt-[34px] text-white overflow-hidden max-sm:px-[22px] max-sm:pb-10 max-sm:pt-6"
            style={{
              background: `radial-gradient(circle at 85% 30%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(135deg, ${R}, #bd0010 70%, #9d000b)`,
            }}
          >
            <div className="absolute w-[420px] h-[110px] -left-[120px] bottom-12 bg-white/8 skew-x-[-24deg] pointer-events-none max-sm:hidden" />
            <div className="absolute w-[360px] h-[160px] -right-[100px] top-[88px] bg-white/8 skew-x-[-24deg] pointer-events-none max-sm:hidden" />

            <div className="relative z-10 flex items-center gap-10 max-md:flex-col max-md:text-center">
              {/* 大頭照 */}
              <div className="flex-shrink-0">
                <div className="w-[140px] h-[140px] max-sm:w-[120px] max-sm:h-[120px] rounded-full border-4 border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden bg-white/10">
                  <img
                    src="/images/avatar.jpg"
                    alt={dealer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      t.parentElement!.classList.add("flex", "items-center", "justify-center", "text-white/60", "font-bold", "text-3xl");
                      t.parentElement!.textContent = dealer.name.charAt(0);
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 font-bold max-md:justify-center">
                  <div className="flex items-center gap-3 text-[30px] tracking-[0.02em] max-sm:text-2xl">
                    <span className="inline-grid place-items-center w-10 h-10 rounded-[10px] bg-white text-[#e60012] font-black text-xl">S</span>
                    <span>SUZUKI</span>
                  </div>
                  <p className="m-0 text-[15px] opacity-95 max-sm:text-[13px]">用心服務・安心購車</p>
                </div>

                <div className="mt-8 max-md:mt-6">
                  <p className="m-0 text-xl font-bold max-sm:text-lg">Suzuki 汽車顧問</p>
                  <h1 className="m-0 leading-none tracking-[0.06em] font-bold"
                    style={{ fontSize: "clamp(44px, 7vw, 72px)" }}>
                    {dealer.name}
                  </h1>
                  <p className="inline-block mt-[18px] pb-3 border-b-2 border-white/80 text-[19px] tracking-[0.18em] max-sm:text-base max-sm:tracking-[0.12em]">
                    新車諮詢 / 試乘預約
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ 聯絡資訊 3 欄 ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:grid-cols-1 max-sm:gap-[14px]">
            <article className="flex items-center gap-[22px] min-h-[170px] p-7 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] border-l-5 border-l-[#e60012] max-sm:min-h-[132px] max-sm:p-5">
              <div className="flex-shrink-0 grid place-items-center w-[66px] h-[66px] rounded-full bg-[#e60012] text-white text-[30px] font-extrabold max-sm:w-[54px] max-sm:h-[54px] max-sm:text-2xl">☎</div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">電話諮詢</p>
                <h2 className="my-1 text-2xl text-[#e60012] leading-tight max-sm:text-xl">{dealer.phone}</h2>
                <a href={phoneHref} className="inline-flex items-center justify-center min-w-[112px] px-4 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm">
                  立即撥打
                </a>
              </div>
            </article>

            <article className="flex items-center gap-[22px] min-h-[170px] p-7 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] border-l-5 border-l-[#e60012] max-sm:min-h-[132px] max-sm:p-5">
              <div className="flex-shrink-0 grid place-items-center w-[66px] h-[66px] rounded-full bg-[#e60012] text-white text-[13px] font-extrabold max-sm:w-[54px] max-sm:h-[54px]">LINE</div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">LINE 聯絡</p>
                <h2 className="my-1 text-2xl text-[#e60012] leading-tight max-sm:text-xl">@{dealer.line}</h2>
                <a href={lineHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-w-[112px] px-4 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm">
                  加入好友
                </a>
              </div>
            </article>

            <article className="flex items-center gap-[22px] min-h-[170px] p-7 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] border-l-5 border-l-[#e60012] max-sm:min-h-[132px] max-sm:p-5">
              <div className="flex-shrink-0 grid place-items-center w-[66px] h-[66px] rounded-full bg-[#e60012] text-white text-[30px] font-extrabold max-sm:w-[54px] max-sm:h-[54px] max-sm:text-2xl">📍</div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">服務據點</p>
                <h2 className="my-1 text-2xl text-[#e60012] leading-tight max-sm:text-xl">凱騰鈴木 Suzuki 北投所</h2>
                <p className="mt-[-6px] mb-[14px] text-[#666] text-sm">{dealer.location.split("｜")[1] || dealer.location}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.location.replace(/｜.*/, ""))}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-w-[112px] px-4 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm">
                  查看地圖
                </a>
              </div>
            </article>
          </section>

          {/* ═══════ 車款區塊 — 6 台，點卡片開 Modal ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">熱門車款</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">依照需求，快速找到適合的 Suzuki</h2>
              </div>
            </div>

            {/* 車款卡片 — 3 欄 (6 台) */}
            <div className="grid grid-cols-3 gap-6 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1 max-sm:gap-[14px]">
              {cars.map((car) => {
                const shapeClass =
                  car.id === "swift" ? "swift" :
                  car.id === "vitara" ? "vitara" :
                  car.id === "jimny" ? "jimny" :
                  car.id === "e-vitara" ? "e-vitara" :
                  car.id === "s-cross" ? "s-cross" :
                  car.id === "carry" ? "carry" : "";
                return (
                  <div key={car.id}>
                    <div
                      onClick={() => openModal(car)}
                      className="cursor-pointer"
                    >
                      <article className="min-h-[286px] p-[26px_20px] text-center bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,20,20,0.12)]">
                        <div className={`car-shape ${shapeClass}`} />
                        <h3 className="mt-5 mb-1 text-[26px] font-bold text-[#202020]">{car.name}</h3>
                        <p className="m-0 mt-0 text-[13px] text-[#999] font-bold">{car.subtitle}</p>
                        <p className="m-0 mt-1 text-[#666]">{car.description}</p>
                        <p className="m-0 mt-3 text-[18px] font-extrabold text-[#e60012]">{car.price}</p>
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════ 服務項目 ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-5 max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">服務項目</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">購車流程，一次協助</h2>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-[14px]">
              {services.map((s) => (
                <span key={s.title} className="grid place-items-center min-h-[72px] p-3 bg-white border border-[#e7e7e7] rounded-[14px] text-[#333] font-extrabold text-center">
                  {s.title}
                </span>
              ))}
            </div>
          </section>

          {/* ═══════ 交車照片 ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">真實交車紀錄</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">每一位車主的笑容，都是我最大的動力</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {[1,2,3,4,5,6].map((n) => (
                <div key={n} className="aspect-[4/3] rounded-[14px] overflow-hidden bg-[#e8e8e8] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  <img
                    src={`/images/delivery-${n}.jpg`}
                    alt={`交車照片 ${n}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const p = t.parentElement!;
                      p.classList.add("flex", "items-center", "justify-center", "text-[#bbb]", "font-bold");
                      p.textContent = `📸 交車照 ${n}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ═══════ 詢問表單區塊 ═══════ */}
          <section id="contact" className="w-[calc(100%-88px)] mx-auto mt-[34px] p-[26px] bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:p-[18px]">
            <div className="flex items-center gap-[14px] mb-[22px]">
              <div className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-full bg-[#e60012] text-white text-[22px] font-extrabold">💬</div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">快速諮詢</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">留下需求，我將盡快與您聯繫</h2>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="flex-shrink-0 grid place-items-center w-16 h-16 rounded-full bg-[#e60012] text-white text-[30px] font-extrabold mx-auto">✓</div>
                <h3 className="text-2xl font-bold text-[#202020]">需求已送出</h3>
                <p className="text-[#666]">我會盡快與你聯繫！也可以直接加 LINE 😊</p>
                <a href={lineHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-w-[220px] h-[54px] bg-[#e60012] text-white rounded-[10px] font-black text-[19px] tracking-[0.08em] no-underline transition-all hover:bg-[#b9000e] hover:-translate-y-px">
                  加 LINE 諮詢
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-[280px_1fr] gap-[34px] items-stretch max-lg:grid-cols-1">
                <aside className="grid place-items-center content-center min-h-[320px] p-6 border border-dashed border-[#bdbdbd] rounded-2xl text-center bg-[#fafafa] max-lg:min-h-[260px]">
                  <div className="fake-qr">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                  <h3 className="mt-5 mb-1 text-[22px] font-bold text-[#202020]">掃描加入 LINE</h3>
                  <p className="m-0 text-[#666]">快速聯繫・即時回覆</p>
                </aside>

                <form onSubmit={handleSubmit} className="grid gap-[14px]">
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>姓名</span>
                    <input required value={form.name} onChange={e => update("name", e.target.value)} className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all" placeholder="請輸入您的姓名" />
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>聯絡方式</span>
                    <input required value={form.contact} onChange={e => update("contact", e.target.value)} type="tel" className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all" placeholder="請輸入手機號碼" />
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>想了解車款</span>
                    <select value={form.car} onChange={e => update("car", e.target.value)} className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all">
                      <option value="">請選擇想了解的車款</option>
                      {cars.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option value="還不確定">還不確定</option>
                    </select>
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>購車用途</span>
                    <select value={form.usage} onChange={e => update("usage", e.target.value)} className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all">
                      <option value="">請選擇購車用途</option>
                      {usageOptions.map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>預算區間</span>
                    <select value={form.budget} onChange={e => update("budget", e.target.value)} className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all">
                      <option value="">請選擇預算區間</option>
                      {budgetRanges.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </label>
                  <button type="submit" disabled={sending} className="w-full h-[54px] mt-1 border-0 rounded-[10px] bg-[#e60012] text-white font-black text-[19px] tracking-[0.08em] cursor-pointer transition-all hover:bg-[#b9000e] hover:-translate-y-px disabled:opacity-50">
                    {sending ? "送出中⋯" : "送出需求"}
                  </button>
                </form>
              </div>
            )}
          </section>

          {/* ═══════ 底部 CTA ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] flex items-center justify-between gap-6 p-[26px_30px] bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:flex-col max-sm:items-start">
            <div>
              <h2 className="m-0 text-[28px] leading-tight max-sm:text-[23px]">還不確定該選哪台 Suzuki？</h2>
              <p className="mt-1.5 mb-0 text-[#666]">留下你的預算與用途，我可以先幫你做初步建議。</p>
            </div>
            <a href={lineHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-w-[220px] h-[54px] px-[26px] bg-[#e60012] text-white rounded-[10px] font-black text-[19px] tracking-[0.08em] no-underline transition-all hover:bg-[#b9000e] hover:-translate-y-px max-sm:w-full max-sm:min-w-0">
              加 LINE 免費諮詢
            </a>
          </section>

          <footer className="py-[26px] px-6 pb-[34px] text-[#9b9b9b] text-center text-sm">
            © 2026 Suzuki 汽車顧問 {dealer.name}｜凱騰鈴木北投所
          </footer>

        </div>
      </main>

      {/* ═══════ Modal Overlay ═══════ */}
      {modalCar && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="modal-content relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-[18px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] max-sm:rounded-[14px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 grid place-items-center w-9 h-9 rounded-full bg-black/30 text-white text-lg transition-colors hover:bg-black/50 sm:top-4 sm:right-4"
              aria-label="關閉"
            >
              ✕
            </button>

            {/* 車款圖片 */}
            <div className="relative w-full aspect-[16/9] bg-[#e8e8e8] overflow-hidden rounded-t-[18px] max-sm:rounded-t-[14px]">
              <img
                src={`/images/${modalCar.id}.jpg`}
                alt={modalCar.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = document.createElement("div");
                    placeholder.className = "w-full h-full flex items-center justify-center text-[#999] font-bold text-lg bg-[#e8e8e8]";
                    placeholder.textContent = modalCar.name;
                    parent.appendChild(placeholder);
                  }
                }}
              />
              {/* 車名浮層在圖片上 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                <h3 className="text-white text-2xl font-bold">{modalCar.name}</h3>
                <p className="text-white/90 text-sm">{modalCar.subtitle}</p>
              </div>
            </div>

            {/* Modal 內容 */}
            <div className="p-5 sm:p-6">
              {/* 價格 */}
              <div className="flex items-baseline justify-between gap-2 mb-3">
                <span className="text-[#666] text-sm font-bold">建議售價</span>
                <span className="text-[#e60012] text-2xl font-extrabold">{modalCar.price}</span>
              </div>

              {/* Tagline */}
              <p className="text-[#e60012] font-extrabold text-[17px] leading-tight mb-4">
                {modalCar.detail.tagline}
              </p>

              {/* 主要規格列表 */}
              <div className="mb-4">
                <p className="mb-2 text-[15px] font-extrabold text-[#333]">主要規格</p>
                <ul className="m-0 pl-[18px] space-y-1.5 text-[14px] text-[#555]">
                  {modalCar.detail.specs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>

              {/* 適合誰 */}
              <div className="mb-4 p-3 bg-[#f5f5f5] rounded-[10px]">
                <p className="m-0 text-[13px] text-[#666]">
                  <strong>適合誰：</strong>{modalCar.detail.whoFor}
                </p>
              </div>

              {/* 本月優惠 */}
              {modalCar.detail.monthlyPromo && (
                <div className="mb-5 p-3 rounded-[10px] text-white text-[14px] leading-relaxed font-extrabold"
                  style={{ background: `linear-gradient(135deg, ${R}, #bd0010)` }}
                >
                  <span className="inline-block mr-1.5">🎉</span>
                  {modalCar.detail.monthlyPromo}
                </div>
              )}

              {/* CTA 按鈕 */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    update("car", modalCar.name);
                    closeModal();
                    // Scroll to contact form
                    setTimeout(() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="flex-1 flex items-center justify-center h-[48px] bg-[#e60012] text-white rounded-[10px] font-extrabold text-[15px] no-underline transition-all hover:bg-[#b9000e] hover:-translate-y-px cursor-pointer border-0"
                >
                  我有興趣
                </button>
                <a
                  href={lineHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center h-[48px] border-2 border-[#e60012] text-[#e60012] rounded-[10px] font-extrabold text-[15px] no-underline transition-all hover:bg-[#e60012] hover:text-white"
                >
                  用 LINE 詢問
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
