/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Location {
  lat: number;
  lng: number;
  city: string;
  state: string;
  address: string;
  storeName: string;
}

export interface CompDeal {
  id: string;
  title: string;
  storeName: string;
  price: number;
  originalPrice: number;
  condition: string;
  distanceMiles: number;
  driveTimeMins: number;
  lat: number;
  lng: number;
  address: string;
  savingsMessage: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  category: 'Electronics' | 'Tools & Home' | 'Appliances' | 'Furniture' | 'Liquidation Pallets';
  price: number;
  originalPrice: number;
  discountPercent: number;
  condition: 'Open Box - Pristine' | 'Open Box - Excellent' | 'Box Damaged - New' | 'Clearance Pallet' | 'Refurbished';
  storeName: string;
  storeLocation: Location;
  shippingAvailable: boolean;
  onlineReferralRate: number; // percentage (e.g. 5% or flat amount like $15)
  referralEarningType: 'percentage' | 'flat';
  referralEarningValue: number;
  originalProductUrl: string;
  imageUrl: string;
  popularityScore: number; // 1-100
  comps: CompDeal[];
}

export interface UserStats {
  totalClicks: number;
  conversions: number;
  totalEarnings: number;
  pendingPayout: number;
  payoutHistory: {
    id: string;
    date: string;
    amount: number;
    status: 'Completed' | 'Pending';
  }[];
}

export interface ActiveRoute {
  origin: { lat: number; lng: number; name: string };
  destination: { lat: number; lng: number; name: string };
  distanceMiles: number;
  durationMins: number;
  polylinePoints: { x: number; y: number }[];
  compDetails?: {
    savingAmount: number;
    timeSavingMins: number;
  };
}
