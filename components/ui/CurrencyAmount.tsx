"use client";

import React from "react";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface CurrencyAmountProps {
  usd: number;
  compact?: boolean;
  decimals?: number;
  suffix?: string;
  className?: string;
}

/**
 * Reactive Currency Display
 * Accepts a USD base number and renders it formatted in the user's selected currency (default NGN).
 */
export function CurrencyAmount({
  usd,
  compact = false,
  decimals,
  suffix = "",
  className = "",
}: CurrencyAmountProps) {
  const { format } = useCurrency();
  const formatted = format(usd, { compact, decimals, suffix });

  return <span className={className}>{formatted}</span>;
}

