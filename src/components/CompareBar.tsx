"use client";

import { useState, useEffect, useCallback } from "react";
import { useCompare } from "./CarCompareProvider";
import type { Car } from "@/data/site";

/* ─── Compare Modal ─── */
function CompareModal({ cars, onClose }: { cars: Car[]; onClose: () => void }) {
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

  const rows: { label: string; getVal: (c: Car) => string }[] = [
    { label: "售價", getVal: (c) => c.price },
    { label: "引擎／動力", getVal: (c) => c.detail.specs[0] || "-" },
    { label: "馬力", getVal: (c) => {
        const s = c.detail.specs.find((x) => /馬力|PS/i.test(x));
        return s || "-";
      }
    },
    { label: "油耗", getVal: (c) => {
        const s = c.detail.specs.find((x) => /油耗|km\/L|km\/h/i.test(x));
        return s || "-";
      }
    },
    { label: "行李箱", getVal: (c) => {
        const s = c.detail.specs.find((x) => /行李廂|行李箱|後座傾倒|載重|貨台/i.test(x));
        return s || "-";
      }
    },
    { label: "適合誰", getVal: (c) => c.detail.whoFor },
    { label: "標語", getVal: (c) => c.detail.tagline },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="車款比較"
    >
      <div
        className="relative w-full max-w-5xl max-h-[85vh] bg-white rounded-[18px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#eee] flex-shrink-0">
          <h3 className="m-0 text-[22px] font-extrabold text-[#202020]">車款比較</h3>
          <button
            onClick={onClose}
            className="grid place-items-center w-9 h-9 rounded-full bg-[#f0f0f0] text-[#666] text-lg transition-colors hover:bg-[#e0e0e0] cursor-pointer border-0"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 bg-white text-left text-[13px] font-extrabold text-[#888] uppercase tracking-wider pb-3 pr-4 border-b-2 border-[#e60012]" style={{ minWidth: "100px" }}>
                  項目
                </th>
                {cars.map((c) => (
                  <th
                    key={c.id}
                    className="sticky top-0 bg-white text-center pb-3 px-3 border-b-2 border-[#e60012]"
                  >
                    <span className="text-[18px] font-extrabold text-[#202020]">{c.name}</span>
                    <br />
                    <span className="text-[12px] text-[#999] font-bold">{c.subtitle}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="text-[13px] font-extrabold text-[#888] py-3 pr-4 border-b border-[#f0f0f0] align-top">
                    {row.label}
                  </td>
                  {cars.map((c) => (
                    <td
                      key={c.id}
                      className={`text-[14px] text-[#555] py-3 px-3 border-b border-[#f0f0f0] text-center ${
                        row.label === "售價" ? "text-[#e60012] font-extrabold text-[16px]" : ""
                      }`}
                    >
                      {row.getVal(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-[#eee] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 h-[42px] bg-[#e60012] text-white rounded-[10px] font-extrabold text-[15px] cursor-pointer border-0 transition-all hover:bg-[#b9000e]"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating Compare Bar ─── */
export default function CompareBar() {
  const { selected, removeCar, clearAll } = useCompare();
  const [showModal, setShowModal] = useState(false);

  if (selected.length === 0) return null;

  return (
    <>
      {/* Floating bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-[#e7e7e7] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:pl-[calc(50%-590px+16px)] md:pr-[calc(50%-590px+16px)]">
        <span className="text-[13px] font-extrabold text-[#888] whitespace-nowrap shrink-0">
          已選 {selected.length}/3 台
        </span>

        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto">
          {selected.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] border border-[#e0e0e0] rounded-full text-[13px] font-bold text-[#333] whitespace-nowrap shrink-0"
            >
              <span>{car.name}</span>
              <button
                onClick={() => removeCar(car.id)}
                className="grid place-items-center w-4 h-4 rounded-full bg-[#ccc] text-white text-[10px] cursor-pointer border-0 transition-colors hover:bg-[#999]"
                aria-label={`移除 ${car.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={clearAll}
          className="text-[12px] text-[#999] font-bold cursor-pointer hover:text-[#e60012] transition-colors border-0 bg-transparent whitespace-nowrap shrink-0"
        >
          清除全部
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="h-[38px] px-5 bg-[#e60012] text-white rounded-[10px] font-extrabold text-[14px] cursor-pointer border-0 transition-all hover:bg-[#b9000e] whitespace-nowrap shrink-0"
        >
          比較
        </button>
      </div>

      {/* Padding so content isn't hidden behind the bar — only on mobile (CTA bar is also fixed) */}
      <div className="h-[60px] md:hidden" />

      {showModal && <CompareModal cars={selected} onClose={() => setShowModal(false)} />}
    </>
  );
}
