/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  DollarSign,
  MapPin,
  Truck,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
} from "lucide-react";
import { Deal } from "../types";

interface DealCardProps {
  key?: string;
  deal: Deal;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DealCard({ deal, isSelected, onSelect }: DealCardProps) {
  // Get Tailwind color scheme based on condition
  const getConditionColor = (cond: string) => {
    switch (cond) {
      case "Open Box - Pristine":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Open Box - Excellent":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Box Damaged - New":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "Clearance Pallet":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`group rounded-2xl border transition-all p-4 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full bg-white ${
        isSelected
          ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2 shadow-md"
          : "border-neutral-200 hover:border-neutral-400 hover:shadow-sm"
      }`}
    >
      <div className="space-y-3">
        {/* Top Badges / Info */}
        <div className="flex justify-between items-center gap-2">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            {deal.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getConditionColor(deal.condition)}`}
            >
              {deal.condition}
            </span>
          </div>
        </div>

        {/* Thumbnail + Details */}
        <div className="flex gap-3.5">
          <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200">
            <img
              src={deal.imageUrl}
              alt={deal.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-neutral-950 leading-snug line-clamp-2">
              {deal.title}
            </h3>
            <p className="text-[11px] text-neutral-500 leading-normal line-clamp-1">
              Store: {deal.storeLocation.storeName}
            </p>
          </div>
        </div>

        {/* Pricing & Savings */}
        <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-150 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-neutral-400 block uppercase font-medium">
              Liquidation price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-md font-extrabold text-neutral-900 font-mono">
                ${deal.price}
              </span>
              <span className="text-[11px] text-neutral-400 line-through font-mono">
                ${deal.originalPrice}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-mono">
              -{deal.discountPercent}% OFF
            </span>
            <span className="text-[9px] text-emerald-600 block font-semibold mt-0.5">
              Saves ${deal.originalPrice - deal.price}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-4 pt-3 border-t border-neutral-100">
        {/* Store Address & Shipping Indicators */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1 font-semibold truncate max-w-[150px]">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            {deal.storeLocation.city}, {deal.storeLocation.state}
          </span>
          <span className="flex items-center gap-1 shrink-0 font-medium">
            {deal.shippingAvailable ? (
              <>
                <Truck className="w-3.5 h-3.5 text-blue-500" />
                Shipping ok
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                In-person Pickup
              </>
            )}
          </span>
        </div>

        {/* Referral Earnings Potential Badge */}
        <div className="bg-teal-50/50 rounded-lg p-2.5 border border-teal-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-teal-800">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-[11px]">Promote & Earn:</span>
          </div>
          <span className="font-extrabold text-teal-900 font-mono text-[11px]">
            +${deal.referralEarningValue.toFixed(2)}
          </span>
        </div>

        {/* Active route button */}
        <button
          className={`w-full py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
            isSelected
              ? "bg-neutral-900 text-white"
              : "bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-neutral-700"
          }`}
        >
          <span>{isSelected ? "Selected Route Map Active" : "View Store Location & Map"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
