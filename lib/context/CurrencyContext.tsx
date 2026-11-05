"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "NGN" | "USD" | "GBP" | "EUR" | "CAD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  /** Multiplier against USD base (e.g. 1 USD = 1500 NGN) */
  rateFromUSD: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  NGN: {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    flag: "🇳🇬",
    rateFromUSD: 1500,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    rateFromUSD: 1,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    rateFromUSD: 0.79,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    rateFromUSD: 0.92,
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    rateFromUSD: 1.38,
  },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  currencyCode: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (
    usdValue: number,
    options?: {
      compact?: boolean;
      decimals?: number;
      suffix?: string;
    }
  ) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = "xc_selected_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Default currency is Nigerian Naira (NGN)
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("NGN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrencyCode(saved);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const handleSetCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyCode(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        // LocalStorage unavailable
      }
    }
  };

  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.NGN;

  /**
   * Format USD base value into selected currency
   */
  const format = (
    usdValue: number,
    options?: {
      compact?: boolean;
      decimals?: number;
      suffix?: string;
    }
  ): string => {
    const converted = usdValue * currentCurrency.rateFromUSD;
    const { compact = false, decimals, suffix = "" } = options || {};

    if (compact) {
      // Large number compact formatting (K, M, B, T)
      if (Math.abs(converted) >= 1_000_000_000_000) {
        const val = (converted / 1_000_000_000_000).toFixed(decimals ?? 1);
        return `${currentCurrency.symbol}${val.replace(/\.0$/, "")}T${suffix}`;
      }
      if (Math.abs(converted) >= 1_000_000_000) {
        const val = (converted / 1_000_000_000).toFixed(decimals ?? (currencyCode === "NGN" ? 0 : 1));
        return `${currentCurrency.symbol}${val.replace(/\.0$/, "")}B${suffix}`;
      }
      if (Math.abs(converted) >= 1_000_000) {
        const val = (converted / 1_000_000).toFixed(decimals ?? (currencyCode === "NGN" ? 1 : 0));
        return `${currentCurrency.symbol}${val.replace(/\.0$/, "")}M${suffix}`;
      }
      if (Math.abs(converted) >= 1_000) {
        const val = (converted / 1_000).toFixed(decimals ?? 0);
        return `${currentCurrency.symbol}${val.replace(/\.0$/, "")}k${suffix}`;
      }
    }

    // Standard number formatting with commas
    const defaultDecimals =
      decimals !== undefined
        ? decimals
        : currencyCode === "NGN" && converted >= 1000
        ? 0
        : converted % 1 === 0
        ? 0
        : 2;

    const formattedNumber = converted.toLocaleString("en-US", {
      minimumFractionDigits: defaultDecimals,
      maximumFractionDigits: defaultDecimals,
    });

    return `${currentCurrency.symbol}${formattedNumber}${suffix}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: currentCurrency,
        currencyCode,
        setCurrency: handleSetCurrency,
        format,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback outside of provider
    const fallbackCurrency = CURRENCIES.NGN;
    return {
      currency: fallbackCurrency,
      currencyCode: "NGN" as CurrencyCode,
      setCurrency: () => {},
      format: (usdValue: number) => `₦${(usdValue * 1500).toLocaleString()}`,
    };
  }
  return context;
}

