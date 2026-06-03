"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { dealer, cars, services, usageOptions, budgetRanges, type Car } from "@/data/site";

function DeliveryCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const PER_PAGE = 3;

  useEffect(() => {
    fetch("/api/delivery")
      .then((r) => r.json())
      .then((d) => setImages(d.images || []));
  }, []);

  if (images.length === 0) return null;

  const max = Math.max(0, Math.ceil(images.length / PER_PAGE) - 1);
  const page = images.slice(idx * PER_PAGE, idx * PER_PAGE + PER_PAGE);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
        {page.map((n) => (
          <div key={n} className="aspect-[4/3] rounded-[14px] overflow-hidden bg-[#e8e8e8] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            <img
              src={`/images/delivery-${n}.jpg`}
              alt={`交車照片 ${n}`}
              className="w-full h-full object-cover"
              style={{ objectPosition: "center bottom" }}
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

      {/* 左右箭頭 & 頁數 */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={() => setIdx(p => Math.max(0, p - 1))}
          className={`grid place-items-center w-10 h-10 rounded-full bg-white border border-[#e0e0e0] shadow-sm text-[#333] text-lg transition-all hover:bg-[#f5f5f5] ${idx === 0 ? "opacity-30 pointer-events-none" : ""}`}
          aria-label="上一頁"
        >
          ‹
        </button>
        <span className="text-[#999] text-sm font-bold">{idx + 1} / {max + 1}</span>
        <button
          onClick={() => setIdx(p => Math.min(max, p + 1))}
          className={`grid place-items-center w-10 h-10 rounded-full bg-white border border-[#e0e0e0] shadow-sm text-[#333] text-lg transition-all hover:bg-[#f5f5f5] ${idx >= max ? "opacity-30 pointer-events-none" : ""}`}
          aria-label="下一頁"
        >
          ›
        </button>
      </div>
    </div>
  );
}

const R = "#e60012";


/* ═══════ Modal 車款詳細 ═══════ */
function CarModal({ car, onClose, onInterest, lineHref }: { car: Car; onClose: () => void; onInterest: () => void; lineHref: string }) {
  const [imgIdx, setImgIdx] = useState(0);

  const images = car.detail.images || [car.id];
  const imgCount = images.length;

  const handler = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [handler]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${car.name} 詳細資訊`}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-[18px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] max-sm:rounded-[14px] flex flex-col"
        style={{ overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 grid place-items-center w-9 h-9 rounded-full bg-black/30 text-white text-lg transition-colors hover:bg-black/50 sm:top-4 sm:right-4"
          aria-label="關閉"
        >
          ✕
        </button>

        {/* 圖片 Carousel — 固定高度 */}
        <div className="relative w-full flex-shrink-0" style={{ height: "300px" }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={"/images/" + img + ".jpg"}
              alt={`${car.name} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === imgIdx ? "opacity-100" : "opacity-0"}`}
              onError={(e) => { const t = e.currentTarget; t.style.display = "none"; }}
            />
          ))}

          {imgCount > 1 && (
            <>
              <button onClick={() => setImgIdx(p => Math.max(0, p - 1))}
                className={"absolute top-1/2 -translate-y-1/2 left-2 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/80 shadow text-[#333] transition-all hover:bg-white " + (imgIdx === 0 ? "hidden" : "")}
                aria-label="上一張">‹</button>
              <button onClick={() => setImgIdx(p => Math.min(imgCount - 1, p + 1))}
                className={"absolute top-1/2 -translate-y-1/2 right-2 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/80 shadow text-[#333] transition-all hover:bg-white " + (imgIdx >= imgCount - 1 ? "hidden" : "")}
                aria-label="下一張">›</button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {images.map((_, i) => (
                  <span key={i} className={"w-2 h-2 rounded-full transition-all " + (i === imgIdx ? "bg-white w-4" : "bg-white/50")} />
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 z-10">
            <h3 className="text-white text-2xl font-bold">{car.name}</h3>
            <p className="text-white/90 text-sm">{car.subtitle}</p>
          </div>
        </div>

        {/* 內容區 — 可滾動 */}
        <div className="flex-1 overflow-y-auto">

        {/* 車色選擇 */}
        {car.detail.colors && car.detail.colors.length > 0 && (
          <div className="px-5 pt-4 sm:px-6">
            <p className="text-[13px] font-extrabold text-[#333] mb-2">選擇顏色</p>
            <div className="flex flex-wrap gap-2.5">
              {car.detail.colors.map((c: { name: string; hex: string }) => (
                <div key={c.name} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e0e0e0] rounded-full text-[12px] text-[#555] font-bold">
                  <span className="inline-block w-3.5 h-3.5 rounded-full" style={{ background: c.hex }} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 資訊 */}
        <div className="p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <span className="text-[#666] text-sm font-bold">建議售價</span>
            <span className="text-[#e60012] text-2xl font-extrabold">{car.price}</span>
          </div>
          <p className="text-[#e60012] font-extrabold text-[17px] leading-tight mb-4">{car.detail.tagline}</p>

          <div className="mb-4">
            <p className="mb-2 text-[15px] font-extrabold text-[#333]">主要規格</p>
            <ul className="m-0 pl-[18px] space-y-1.5 text-[14px] text-[#555]">
              {car.detail.specs.map((spec, idx) => <li key={idx}>{spec}</li>)}
            </ul>
          </div>

          <div className="mb-4 p-3 bg-[#f5f5f5] rounded-[10px]">
            <p className="m-0 text-[13px] text-[#666]"><strong>適合誰：</strong>{car.detail.whoFor}</p>
          </div>

          {car.detail.monthlyPromo && (
            <div className="mb-5 p-3 rounded-[10px] text-white text-[14px] leading-relaxed font-extrabold"
              style={{ background: "linear-gradient(135deg, " + R + ", #bd0010)" }}>
              <span className="inline-block mr-1.5">🎉</span>
              {car.detail.monthlyPromo}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button onClick={onInterest}
              className="flex-1 flex items-center justify-center h-[48px] bg-[#e60012] text-white rounded-[10px] font-extrabold text-[15px] no-underline transition-all hover:bg-[#b9000e] hover:-translate-y-px cursor-pointer border-0">
              我有興趣
            </button>
            <a href={lineHref} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center h-[48px] border-2 border-[#e60012] text-[#e60012] rounded-[10px] font-extrabold text-[15px] no-underline transition-all hover:bg-[#e60012] hover:text-white">
              用 LINE 詢問
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

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
      await fetch("https://script.google.com/macros/s/AKfycbwHLQ1emh1ByNmQGwQqeOliUZ45KZCuGy9rxn6x92ytCMmwGdE3e4jQKyWrvyNqzAY/exec", {
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
          width: 156px;
          height: 86px;
          margin: 12px auto 0;
          background: linear-gradient(180deg, #f20a1e 0%, ${R} 64%, #b9000e 100%);
          border-radius: 30px 38px 18px 18px;
          box-shadow: inset 0 -12px 0 rgba(0,0,0,0.15), 0 10px 18px rgba(230,0,18,0.12);
        }
        .car-shape::before {
          content: "";
          position: absolute;
          left: 38px;
          top: 14px;
          width: 74px;
          height: 28px;
          background: linear-gradient(180deg, #fff 0%, #f1f1f1 100%);
          border-radius: 18px 18px 7px 7px;
          box-shadow: inset -18px 0 0 rgba(0,0,0,0.08);
        }
        .car-shape::after {
          content: "";
          position: absolute;
          left: 24px;
          bottom: -11px;
          width: 23px;
          height: 23px;
          border-radius: 999px;
          background: #202020;
          box-shadow: 88px 0 0 #202020;
        }
        .car-shape.swift {
          width: 142px;
          height: 76px;
          border-radius: 44px 50px 22px 24px;
          transform: translateY(6px);
        }
        .car-shape.swift::before {
          left: 38px;
          top: 13px;
          width: 58px;
          height: 24px;
          border-radius: 18px 18px 8px 8px;
        }
        .car-shape.swift::after { left: 22px; box-shadow: 78px 0 0 #202020; }

        .car-shape.e-vitara {
          width: 166px;
          height: 84px;
          border-radius: 26px 44px 18px 18px;
        }
        .car-shape.e-vitara::before {
          left: 48px;
          top: 13px;
          width: 66px;
          height: 25px;
          border-radius: 16px 20px 6px 6px;
        }
        .car-shape.e-vitara::after { left: 25px; box-shadow: 98px 0 0 #202020; }
        .car-shape.e-vitara span,
        .car-shape.e-vitara i { display: none; }
        .car-shape.e-vitara { outline: 0; }
        .car-shape.e-vitara:before { box-shadow: inset -18px 0 0 rgba(0,0,0,0.08), -30px 37px 0 -11px #ffb3bb, 58px 37px 0 -11px #ffb3bb; }

        .car-shape.vitara {
          width: 162px;
          height: 92px;
          border-radius: 18px 34px 17px 17px;
          transform: skewX(-5deg) translateY(2px);
        }
        .car-shape.vitara::before {
          left: 44px;
          top: 17px;
          width: 72px;
          height: 25px;
          border-radius: 10px 18px 6px 6px;
        }
        .car-shape.vitara::after { left: 25px; bottom: -10px; box-shadow: 96px 0 0 #202020; }

        .car-shape.s-cross {
          width: 176px;
          height: 82px;
          border-radius: 24px 46px 18px 18px;
          transform: skewX(-4deg) translateY(6px);
        }
        .car-shape.s-cross::before {
          left: 52px;
          top: 16px;
          width: 74px;
          height: 23px;
          border-radius: 10px 18px 5px 5px;
        }
        .car-shape.s-cross::after { left: 29px; bottom: -10px; box-shadow: 104px 0 0 #202020; }

        .car-shape.jimny {
          width: 138px;
          height: 94px;
          border-radius: 8px 8px 16px 16px;
          background: linear-gradient(180deg, #5f7042 0%, #475735 58%, #2f3b27 100%);
          box-shadow: inset 0 -12px 0 rgba(0,0,0,0.18), 0 10px 18px rgba(71,87,53,0.16);
        }
        .car-shape.jimny::before {
          left: 24px;
          top: 14px;
          width: 88px;
          height: 29px;
          border-radius: 5px;
          box-shadow: inset -42px 0 0 rgba(0,0,0,0.08);
        }
        .car-shape.jimny::after { left: 18px; bottom: -10px; box-shadow: 80px 0 0 #202020; }

        .car-shape.carry {
          width: 212px;
          height: 100px;
          border-radius: 0;
          background:
            linear-gradient(180deg, #f4f4f4 0%, #e9e9e9 100%) 45px 27px / 30px 20px no-repeat,
            linear-gradient(180deg, #f20a1e 0%, ${R} 66%, #a9000d 100%) 24px 17px / 84px 66px no-repeat,
            linear-gradient(180deg, #f20a1e 0%, ${R} 66%, #a9000d 100%) 104px 55px / 100px 28px no-repeat,
            linear-gradient(90deg, #f20a1e 0%, ${R} 100%) 104px 42px / 100px 8px no-repeat,
            linear-gradient(90deg, #a9000d 0%, #a9000d 100%) 112px 68px / 78px 5px no-repeat;
          box-shadow: none;
          transform: translateY(0);
        }
        .car-shape.carry::before {
          left: 104px;
          top: 42px;
          width: 100px;
          height: 41px;
          border: 0;
          border-radius: 2px 2px 8px 8px;
          background:
            linear-gradient(90deg, #a9000d 0 6px, transparent 6px 44px, #a9000d 44px 50px, transparent 50px 86px, #a9000d 86px 100%) 0 0 / 100% 100% no-repeat;
          box-shadow:
            inset 0 -12px 0 rgba(0,0,0,0.14),
            0 13px 18px -18px rgba(230,0,18,0.28);
        }
        .car-shape.carry::after { left: 43px; bottom: -1px; box-shadow: 140px 0 0 #202020; }

        

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
                    className="w-full h-full object-cover" style={{ objectPosition: "center 0%" }}
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
                  <div className="flex items-center gap-4 max-sm:gap-3">
                    <img src="/suzuki-logo.svg" alt="Suzuki" className="h-[42px] w-auto max-sm:h-[34px] brightness-0 invert" />
                    <p className="m-0 text-[15px] opacity-95 max-sm:text-[13px]">用心服務・安心購車</p>
                  </div>
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

                {/* 社群按鈕 — 僅 logo 小圓 */}
                <div className="flex justify-end max-md:justify-center gap-2 mt-4 md:mt-0">
                  <a
                    href="https://www.facebook.com/profile.php?id=100092443294776&locale=zh_TW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid place-items-center w-9 h-9 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full text-white text-[17px] font-bold no-underline transition-all"
                    aria-label="Facebook 粉絲專頁"
                  >f</a>
                  <span
                    className="grid place-items-center w-9 h-9 bg-white/8 rounded-full text-white/40 text-[17px] font-bold"
                    aria-label="Threads（即將開通）"
                  >@</span>
                  <span
                    className="grid place-items-center w-9 h-9 bg-white/8 rounded-full text-white/40 text-[14px] font-bold"
                    aria-label="Instagram（即將開通）"
                  >IG</span>
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
                  <div key={car.id} className="flex">
                      <button onClick={() => openModal(car)} className="flex flex-col flex-1 items-center p-[26px_20px] text-center bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,20,20,0.12)] cursor-pointer" aria-haspopup="dialog">
                        <div className={`car-shape ${shapeClass} shrink-0`} />
                        <h3 className="mt-5 mb-1 text-[26px] font-bold text-[#202020]">{car.name}</h3>
                        <p className="m-0 mt-0 text-[13px] text-[#999] font-bold">{car.subtitle}</p>
                        <p className="m-0 mt-1 text-[#666]">{car.description}</p>
                        <p className="m-0 mt-auto pt-3 text-[18px] font-extrabold text-[#e60012]">{car.price}</p>
                      </button>
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

          {/* ═══════ 交車照片 — Carousel ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">真實交車紀錄</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">每一位車主的笑容，都是我最大的動力</h2>
              </div>
            </div>

            <DeliveryCarousel />
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
                <aside className="grid place-items-center content-center min-h-[320px] p-6 border border-[#e7e7e7] rounded-2xl text-center bg-white max-lg:min-h-[auto] max-lg:py-8 max-sm:hidden">
                  <img
                    src="/images/line-qr.jpg"
                    alt="LINE QR Code"
                    className="w-[180px] h-[180px] object-contain rounded-xl"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const p = t.parentElement!;
                      p.innerHTML = `
                        <div class="w-[180px] h-[180px] bg-[#f5f5f5] rounded-xl flex items-center justify-center text-[#999] text-sm">
                          QR Code
                        </div>
                        <p class="mt-4 text-[22px] font-bold text-[#202020]">加 LINE 諮詢</p>
                        <a href="${lineHref}" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 px-6 py-3 bg-[#06c755] text-white rounded-lg font-bold text-sm no-underline hover:opacity-90">
                          點我加 LINE
                        </a>
                      `;
                    }}
                  />
                  <h3 className="mt-4 text-[22px] font-bold text-[#202020]">加 LINE 諮詢</h3>
                  <p className="m-0 text-[#666] text-sm">快速聯繫・即時回覆</p>
                  <a href={lineHref} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-6 py-3 bg-[#06c755] text-white rounded-lg font-bold text-sm no-underline hover:opacity-90 transition-opacity">
                    點我加 LINE
                  </a>
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

          <footer className="py-[26px] px-6 text-[#9b9b9b] text-center text-sm">
            © 2026 Suzuki 汽車顧問 {dealer.name}｜凱騰鈴木北投所
          </footer>

        </div>
      </main>

      {/* ═══════ 底部固定 CTA (手機 only) ═══════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-lg border-t border-[#e7e7e7] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a
          href={phoneHref}
          className="flex-1 flex items-center justify-center gap-1.5 h-[40px] bg-[#e60012] text-white rounded-[10px] font-extrabold text-[14px] no-underline transition-all hover:bg-[#b9000e] active:scale-[0.98]"
        >
          <span className="text-lg">📞</span>
          立即撥打
        </a>
        <a
          href={lineHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 h-[40px] bg-[#06c755] text-white rounded-[10px] font-extrabold text-[14px] no-underline transition-all hover:bg-[#05b549] active:scale-[0.98]"
        >
          <span className="text-lg">💬</span>
          加 LINE 詢問
        </a>
      </div>

      {/* ═══════ Modal Overlay — 車款詳細 ═══════ */}
      {modalCar && (
        <CarModal car={modalCar} onClose={closeModal} onInterest={() => {
          update("car", modalCar.name);
          closeModal();
          setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
        }} lineHref={lineHref} />
      )}
    </>
  );
}
