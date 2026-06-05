"use client";

import { useState, useEffect, useCallback } from "react";
import type { Car } from "@/data/site";
import { R } from "@/data/constants";

interface CarModalProps {
  car: Car;
  onClose: () => void;
  onInterest: () => void;
  lineHref: string;
}

/**
 * 車款詳細 Modal — 圖片輪播、顏色選擇、規格、優惠與行動按鈕
 */
export default function CarModal({ car, onClose, onInterest, lineHref }: CarModalProps) {
  const [imgIdx, setImgIdx] = useState(0);

  const images = car.detail.images || [car.id];
  const imgCount = images.length;

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 modal-overlay"
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
              onError={(e) => {
                /* 隱藏載入失敗的圖片 */
                e.currentTarget.style.display = "none";
              }}
            />
          ))}

          {imgCount > 1 && (
            <>
              <button
                onClick={() => setImgIdx((p) => Math.max(0, p - 1))}
                className={
                  "absolute top-1/2 -translate-y-1/2 left-2 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/80 shadow text-[#333] transition-all hover:bg-white " +
                  (imgIdx === 0 ? "hidden" : "")
                }
                aria-label="上一張"
              >
                ‹
              </button>
              <button
                onClick={() => setImgIdx((p) => Math.min(imgCount - 1, p + 1))}
                className={
                  "absolute top-1/2 -translate-y-1/2 right-2 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/80 shadow text-[#333] transition-all hover:bg-white " +
                  (imgIdx >= imgCount - 1 ? "hidden" : "")
                }
                aria-label="下一張"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={
                      "w-2 h-2 rounded-full transition-all " +
                      (i === imgIdx ? "bg-white w-4" : "bg-white/50")
                    }
                  />
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
                  <div
                    key={c.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e0e0e0] rounded-full text-[12px] text-[#555] font-bold"
                  >
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-full"
                      style={{ background: c.hex }}
                    />
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
            <p className="text-[#e60012] font-extrabold text-[17px] leading-tight mb-4">
              {car.detail.tagline}
            </p>

            <div className="mb-4">
              <p className="mb-2 text-[15px] font-extrabold text-[#333]">主要規格</p>
              <ul className="m-0 pl-[18px] space-y-1.5 text-[14px] text-[#555]">
                {car.detail.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4 p-3 bg-[#f5f5f5] rounded-[10px]">
              <p className="m-0 text-[13px] text-[#666]">
                <strong>適合誰：</strong>
                {car.detail.whoFor}
              </p>
            </div>

            {car.detail.monthlyPromo && (
              <div
                className="mb-5 p-3 rounded-[10px] text-white text-[14px] leading-relaxed font-extrabold"
                style={{ background: "linear-gradient(135deg, " + R + ", #bd0010)" }}
              >
                <span className="inline-block mr-1.5">🎉</span>
                {car.detail.monthlyPromo}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={onInterest}
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
    </div>
  );
}
