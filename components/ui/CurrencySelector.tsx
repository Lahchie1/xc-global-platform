"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/lib/context/CurrencyContext";
import { ChevronDown, Check } from "lucide-react";

interface CurrencySelectorProps {
  className?: string;
  variant?: "navbar" | "compact" | "portal";
  direction?: "up" | "down";
}

interface DropdownPos {
  top: number;
  bottom: number;
  right: number;
  width: number;
}

export function CurrencySelector({
  className = "",
  variant = "navbar",
  direction,
}: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default direction: portal sidebar opens upwards to avoid causing scroll; navbar opens downwards
  const openDirection = direction ?? (variant === "portal" ? "up" : "down");

  // For "up" direction we use a fixed-position portal; for "down" we use absolute positioning
  const useFixedPortal = openDirection === "up";

  const calcPosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.top,       // used for "up": dropdown sits above this y
      bottom: rect.bottom, // used for "down": dropdown sits below this y
      right: window.innerWidth - rect.right,
      width: rect.width,
    });
  }, []);

  const openDropdown = () => {
    if (useFixedPortal) calcPosition();
    setIsOpen(true);
  };

  const closeDropdown = () => setIsOpen(false);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        buttonRef.current && buttonRef.current.contains(target)
      ) return;
      if (
        dropdownRef.current && dropdownRef.current.contains(target)
      ) return;
      closeDropdown();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDropdown();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Recalculate on resize/scroll when using fixed portal
  useEffect(() => {
    if (!isOpen || !useFixedPortal) return;
    const update = () => calcPosition();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true, capture: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, { capture: true } as EventListenerOptions);
    };
  }, [isOpen, useFixedPortal, calcPosition]);

  const currenciesList = Object.values(CURRENCIES);

  const dropdownContent = (
    <div
      ref={dropdownRef}
      style={
        useFixedPortal && dropdownPos
          ? {
              position: "fixed",
              // Sit above the button — bottom of dropdown = top of button minus gap
              bottom: window.innerHeight - dropdownPos.top + 8,
              right: dropdownPos.right,
              zIndex: 9999,
              minWidth: "13rem",
            }
          : undefined
      }
      className={`w-52 rounded-xl bg-surface-white border border-border shadow-elevation-3 py-1.5 animate-in fade-in zoom-in-95 duration-150 origin-bottom-right${
        !useFixedPortal
          ? " absolute right-0 top-full mt-1.5 z-50"
          : ""
      }`}
      role="menu"
    >
      <div className="px-3 py-1.5 border-b border-border/60 text-[10px] font-bold uppercase tracking-wider text-text-muted">
        Select Currency
      </div>

      <div className="py-1">
        {currenciesList.map((item) => {
          const isSelected = item.code === currency.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setCurrency(item.code as CurrencyCode);
                closeDropdown();
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                isSelected
                  ? "bg-secondary/10 text-secondary font-semibold"
                  : "text-text-primary hover:bg-surface-container-low"
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base leading-none" role="img" aria-label={item.name}>
                  {item.flag}
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">{item.code}</span>
                    <span className="text-text-muted text-[11px]">({item.symbol})</span>
                  </div>
                  <span className="text-[10px] text-text-secondary leading-tight">
                    {item.name}
                  </span>
                </div>
              </div>

              {isSelected && <Check className="w-4 h-4 text-secondary shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="px-3 py-1.5 border-t border-border/60 bg-surface-container-low/40 text-[10px] text-text-muted">
        Default: ₦ NGN (Nigerian Naira)
      </div>
    </div>
  );

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        className={`inline-flex items-center gap-1.5 rounded-lg border font-medium text-xs transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 ${
          variant === "portal"
            ? "px-2.5 py-1.5 bg-surface-white border-border text-text-primary hover:bg-surface-container-low"
            : variant === "compact"
            ? "px-2 py-1 bg-surface-white border-border text-text-primary hover:bg-surface-container-low"
            : "px-3 py-1.5 bg-surface-white/90 backdrop-blur-sm border-border text-text-primary hover:bg-surface-container-low hover:border-primary/30"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Change currency"
      >
        <span className="text-sm leading-none" role="img" aria-label={currency.name}>
          {currency.flag}
        </span>
        <span className="font-semibold tracking-wide">{currency.code}</span>
        <span className="text-text-muted font-normal">({currency.symbol})</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${
            openDirection === "up"
              ? isOpen
                ? "rotate-0 text-text-primary"
                : "rotate-180"
              : isOpen
              ? "rotate-180 text-text-primary"
              : ""
          }`}
        />
      </button>

      {/* Dropdown — rendered in a React portal (fixed) when opening upward, else inline absolute */}
      {isOpen && useFixedPortal && dropdownPos && typeof document !== "undefined"
        ? ReactDOM.createPortal(dropdownContent, document.body)
        : isOpen && !useFixedPortal
        ? dropdownContent
        : null}
    </div>
  );
}
