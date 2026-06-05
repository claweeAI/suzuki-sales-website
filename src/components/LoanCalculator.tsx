"use client";

import { useState, useMemo } from "react";
import { cars } from "@/data/site";

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  if (priceStr.includes("萬")) return n * 10000;
  return n;
}

export default function LoanCalculator() {
  const [selectedCarId, setSelectedCarId] = useState("");
  const [price, setPrice] = useState("800000");
  const [downPayment, setDownPayment] = useState(160000);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(2.5);

  const principal = parseInt(price) || 0;
  const loanAmount = Math.max(0, principal - downPayment);

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || months <= 0) return 0;
    const r = rate / 100 / 12;
    if (r === 0) return loanAmount / months;
    return loanAmount * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }, [loanAmount, months, rate]);

  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId);
    if (!carId) return;
    const car = cars.find((c) => c.id === carId);
    if (car) {
      const p = parsePrice(car.price);
      setPrice(String(p));
      setDownPayment(Math.round(p * 0.2));
    }
  };

  return (
    <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
      <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="m-0 text-[#666] text-[15px] font-bold">貸款試算</p>
          <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">試算月付金額，輕鬆購車</h2>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6 max-lg:grid-cols-1">
        {/* Calculator Form */}
        <div className="p-6 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)]">
          <div className="grid gap-5">
            {/* Select Car */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#555] mb-1.5">
                選擇車款（自動帶入價格）
              </label>
              <select
                value={selectedCarId}
                onChange={(e) => handleCarSelect(e.target.value)}
                className="w-full h-11 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all text-[14px]"
              >
                <option value="">手動輸入車價</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#555] mb-1.5">
                車價（元）
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-11 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all text-[14px]"
                placeholder="例如 800000"
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[14px] font-extrabold text-[#555]">頭期款</label>
                <span className="text-[14px] font-extrabold text-[#e60012]">
                  {downPayment.toLocaleString()} 元
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={principal}
                step={5000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #e60012 ${(downPayment / Math.max(principal, 1)) * 100}%, #e0e0e0 ${(downPayment / Math.max(principal, 1)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[12px] text-[#999] mt-1">
                <span>0 元</span>
                <span>{principal.toLocaleString()} 元</span>
              </div>
            </div>

            {/* Payment Period */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#555] mb-1.5">
                期數
              </label>
              <div className="flex flex-wrap gap-2">
                {[12, 24, 36, 48, 60, 72].map((n) => (
                  <button
                    key={n}
                    onClick={() => setMonths(n)}
                    className={`px-4 h-10 rounded-lg font-extrabold text-[14px] cursor-pointer border-2 transition-all ${
                      months === n
                        ? "bg-[#e60012] text-white border-[#e60012]"
                        : "bg-white text-[#555] border-[#d9d9d9] hover:border-[#e60012] hover:text-[#e60012]"
                    }`}
                  >
                    {n} 期
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[14px] font-extrabold text-[#555]">年利率</label>
                <span className="text-[14px] font-extrabold text-[#e60012]">{rate}%</span>
              </div>
              <input
                type="range"
                min={2.5}
                max={8}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #e60012 ${((rate - 2.5) / (8 - 2.5)) * 100}%, #e0e0e0 ${((rate - 2.5) / (8 - 2.5)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[12px] text-[#999] mt-1">
                <span>2.5%</span>
                <span>8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className="p-6 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] flex flex-col justify-center items-center text-center">
          <p className="m-0 text-[14px] font-extrabold text-[#888] mb-2">每月應付金額</p>
          <p className="m-0 text-[42px] font-extrabold text-[#e60012] leading-none">
            {monthlyPayment > 0 ? Math.round(monthlyPayment).toLocaleString() : "—"}
          </p>
          <p className="m-0 text-[14px] text-[#999] mt-1">元 / 月</p>

          <div className="w-full mt-5 pt-4 border-t border-[#eee] space-y-2 text-left">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#888]">貸款總額</span>
              <span className="font-extrabold text-[#555]">{loanAmount.toLocaleString()} 元</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#888]">期數</span>
              <span className="font-extrabold text-[#555]">{months} 期（{Math.round(months / 12 * 10) / 10} 年）</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#888]">年利率</span>
              <span className="font-extrabold text-[#555]">{rate}%</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#888]">頭期款</span>
              <span className="font-extrabold text-[#555]">{downPayment.toLocaleString()} 元</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#888]">總繳金額</span>
              <span className="font-extrabold text-[#555]">
                {monthlyPayment > 0 ? Math.round(monthlyPayment * months + downPayment).toLocaleString() : "—"} 元
              </span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[#aaa] leading-relaxed">
            * 本試算結果僅供參考，實際貸款條件依金融機構核定為準
          </p>
        </div>
      </div>
    </section>
  );
}
