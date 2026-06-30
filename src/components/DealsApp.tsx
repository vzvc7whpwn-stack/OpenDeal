/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, 
  SlidersHorizontal, 
  Navigation, 
  Award, 
  TrendingUp, 
  Layers, 
  DollarSign, 
  MapPin, 
  Truck, 
  Info, 
  ExternalLink, 
  X, 
  ChevronDown, 
  Check,
  Tag,
  Map,
  Boxes,
  HelpCircle,
  Menu,
  Clock
} from 'lucide-react';

// Imports from our modular modules
import { DEALS_DATA as MOCK_DEALS, REGIONS_LIST } from '@/data/dealsData';
import { Deal, CompDeal, UserStats } from '@/types';
import DealCard from '@/components/DealCard';
import DealsMap from '@/components/DealsMap';
import EarningsHub from '@/components/EarningsHub';

export default function DealsApp() {
  const [liveDeals, setLiveDeals] = useState<Deal[]>([]);
  const DEALS_DATA = liveDeals;

  useEffect(() => {
    async function loadLiveDeals() {
      try {
        const { data, error } = await supabase.from("deals").select("*");
        if (error) throw error;
        if (data && data.length > 0) {
          const formatted = data.map((d: any) => ({
            ...d,
            id: d.id || String(Math.random()),
            title: d.title || "Liquidation Item",
            price: Number(d.price),
            originalPrice: Number(d.originalPrice || d.price),
            discountPercent: Number(d.discountPercent || 0),
            storeName: d.storeName || d.store || "Liquidation Warehouse",
            storeLocation: typeof d.storeLocation === "string" ? JSON.parse(d.storeLocation) : (d.storeLocation || { lat: 34.0522, lng: -118.2437, city: "US", state: "ALL", address: "", storeName: "" }),
            comps: typeof d.comps === "string" ? JSON.parse(d.comps) : (d.comps || [])
          }));
          setLiveDeals(formatted as Deal[]);
          if (formatted.length > 0) setActiveDealId(formatted[0].id);
        }
      } catch (err) {
        console.warn("Supabase data missing or unavailable, using local fallbacks:", err);
      }
    }
    loadLiveDeals();
  }, []);
  // Navigation tabs for smaller mobile viewports
  const [mobileActiveTab, setMobileActiveTab] = useState<'listings' | 'map' | 'promoter'>('listings');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<'All' | 'Pickup' | 'Shipping'>('All');
  const [sortBy, setSortBy] = useState<'discount' | 'price-low' | 'price-high' | 'popularity'>('discount');

  // Active Item Selection State
  const [activeDealId, setActiveDealId] = useState<string>("");
  const [activeComp, setActiveComp] = useState<CompDeal | null>(null);

  // User simulated GPS Draggable location state (lat/lng offsets)
  const [userLatOffset, setUserLatOffset] = useState<number>(0);
  const [userLngOffset, setUserLngOffset] = useState<number>(0);

  // Affiliate Promoter State (clicks, conversions, payouts)
  const [userStats, setUserStats] = useState<UserStats>({
    totalClicks: 84,
    conversions: 11,
    totalEarnings: 215.40,
    pendingPayout: 140.40,
    payoutHistory: [
      { id: 'pay-7128', date: 'Jun 15, 2026', amount: 75.00, status: 'Completed' }
    ]
  });

  // Claim Deal Modal / Simulated external redirect simulation
  const [claimedDeal, setClaimedDeal] = useState<Deal | null>(null);
  const [referralPromoterInput, setReferralPromoterInput] = useState('partner');

  // Reset comp selection when user changes active deal
  const handleSelectDeal = (dealId: string) => {
    setActiveDealId(dealId);
    setActiveComp(null); // Reset active competitor route
    setUserLatOffset(0); // Reset drag offsets
    setUserLngOffset(0);
    
    // Auto shift mobile viewport to map if on mobile for instant visual feedback
    if (window.innerWidth < 1024) {
      setMobileActiveTab('map');
    }
  };

  // Find active deal entity
  const activeDeal = useMemo(() => {
    return DEALS_DATA.find(d => d.id === activeDealId) || DEALS_DATA[0] || {
      id: "",
      title: "Loading active liquidations...",
      description: "",
      category: "Electronics",
      price: 0,
      originalPrice: 0,
      discountPercent: 0,
      condition: "Open Box - Pristine",
      storeName: "Loading Warehouse...",
      storeLocation: { lat: 34.0522, lng: -118.2437, city: "", state: "", address: "", storeName: "" },
      shippingAvailable: false,
      onlineReferralRate: 0,
      referralEarningType: "flat",
      referralEarningValue: 0,
      originalProductUrl: "",
      imageUrl: "",
      popularityScore: 0,
      comps: []
    };
  }, [activeDealId, DEALS_DATA]);

  // Compute Categories from data dynamically
  const categoriesList = useMemo(() => {
    const list = new Set(DEALS_DATA.map(d => d.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter & Sort core business logic
  const filteredDeals = useMemo(() => {
    return DEALS_DATA.filter((deal) => {
      // Search matching
      const matchesSearch = 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;

      // Region matching
      const matchesRegion = selectedRegion === 'All Regions' || deal.storeLocation.city === selectedRegion;

      // Fulfillment matching
      const matchesFulfillment = 
        fulfillmentFilter === 'All' ||
        (fulfillmentFilter === 'Pickup' && !deal.shippingAvailable) ||
        (fulfillmentFilter === 'Shipping' && deal.shippingAvailable);

      return matchesSearch && matchesCategory && matchesRegion && matchesFulfillment;
    }).sort((a, b) => {
      // Sorting strategies
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popularity') return b.popularityScore - a.popularityScore;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedRegion, fulfillmentFilter, sortBy]);

  // Handler for claim referral click (simulates commission update live)
  const triggerClaimDeal = (deal: Deal) => {
    setClaimedDeal(deal);
    
    // Automatically credit promoter clicks inside our active simulation stats
    setUserStats((prev: UserStats) => ({
      ...prev,
      totalClicks: prev.totalClicks + 1
    }));
  };

  // Simulates final purchase completion inside modal
  const handleSimulatePurchase = () => {
    if (!claimedDeal) return;
    const earnVal = claimedDeal.referralEarningValue;
    
    setUserStats((prev: UserStats) => ({
      ...prev,
      conversions: prev.conversions + 1,
      totalEarnings: prev.totalEarnings + earnVal,
      pendingPayout: prev.pendingPayout + earnVal
    }));

    setClaimedDeal(null);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans antialiased flex flex-col">
      
      {/* Premium Dark Navigation Header */}
      <header id="main-header" className="bg-neutral-900 text-white shadow-md border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500 text-neutral-950 rounded-xl font-black flex items-center justify-center shadow-lg">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight">OpenDeal Route Scanner</h1>
                <span className="text-[9px] font-bold uppercase tracking-widest bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">USA LIQUIDATION</span>
              </div>
              <p className="text-[10px] text-neutral-400"></p>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2 bg-neutral-800 border border-neutral-700/60 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-neutral-300 font-medium">Draggable Location GPS: Active</span>
            </div>
            
            <div className="flex items-center gap-2.5 bg-teal-950/40 border border-teal-900 px-3 py-1.5 rounded-xl text-teal-300">
              <DollarSign className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="text-[9px] uppercase font-bold text-teal-500 block leading-none">Your Promoter Earnings</span>
                <span className="text-xs font-bold font-mono text-white">${userStats.totalEarnings.toFixed(2)}</span>
              </div>
            </div>

            <AuthChip />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-grow flex flex-col gap-6">
        
        {/* Top Info Alert Banner */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">How It Works</span>
              <h3 className="text-sm font-bold text-neutral-900 mt-0.5">Find & Promote Open-Box Liquidation Packages</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                Toggle through deals in major US regions, compare prices with local comps, and simulate the exact pickup drive-time. Want to earn? Share the trackable referral links to direct buyers—and watch your commission dashboard grow instantly!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-500">Selected Location:</span>
            <span className="text-xs font-extrabold bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-lg text-neutral-800 font-mono">
              {selectedRegion === 'All Regions' ? 'United States (All)' : `${selectedRegion}, USA`}
            </span>
          </div>
        </div>

        {/* Dashboard Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT PANEL: FILTERS & DEAL CARDS (lg:col-span-6 or 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Filter Widget Box */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold text-neutral-950 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
                  Filter Inventory
                </h3>
                <span className="text-xs font-semibold text-neutral-500 font-mono">
                  {filteredDeals.length} Deals Found
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search products, brands, or stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 placeholder-neutral-400 text-neutral-800"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2 text-neutral-400 hover:text-neutral-700 p-1 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Region Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    US Metro Region
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full text-xs pl-3 pr-8 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none appearance-none cursor-pointer font-medium text-neutral-800"
                    >
                      {REGIONS_LIST.map((reg: { city: string; state: string }) => (
                        <option key={reg.city} value={reg.city}>
                          {reg.city} {reg.city !== 'All Regions' ? `(${reg.state})` : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                {/* Fulfillment Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    Fulfillment Mode
                  </label>
                  <div className="relative">
                    <select
                      value={fulfillmentFilter}
                      onChange={(e) => setFulfillmentFilter(e.target.value as any)}
                      className="w-full text-xs pl-3 pr-8 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none appearance-none cursor-pointer font-medium text-neutral-800"
                    >
                      <option value="All">All Deals</option>
                      <option value="Pickup">In-Store Pickup</option>
                      <option value="Shipping">Shipping Available</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Category Quick Filter Chips */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                        selectedCategory === cat
                          ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting options */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs">
                <span className="text-neutral-500 font-medium">Sort Inventory By:</span>
                <div className="flex gap-1.5">
                  {[
                    { id: 'discount', label: 'Discount %' },
                    { id: 'popularity', label: 'Popularity' },
                    { id: 'price-low', label: 'Lowest Price' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id as any)}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        sortBy === option.id
                          ? 'bg-neutral-200 text-neutral-900'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile View Toggle Tabs */}
            <div className="lg:hidden flex bg-white p-1 rounded-xl border border-neutral-200 shadow-sm gap-1">
              <button
                onClick={() => setMobileActiveTab('listings')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                  mobileActiveTab === 'listings' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                }`}
              >
                Deals ({filteredDeals.length})
              </button>
              <button
                onClick={() => setMobileActiveTab('map')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                  mobileActiveTab === 'map' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                }`}
              >
                Map & Routes
              </button>
              <button
                onClick={() => setMobileActiveTab('promoter')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                  mobileActiveTab === 'promoter' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                }`}
              >
                Earnings Link Hub
              </button>
            </div>

            {/* LISTINGS PANEL */}
            <div className={`space-y-3 lg:block ${mobileActiveTab === 'listings' ? 'block' : 'hidden'}`}>
              <div className="flex justify-between items-center px-1 text-xs text-neutral-500">
                <span className="font-semibold">Showing matching liquidation lots</span>
                <span>Select to recalculate route</span>
              </div>
              
              {filteredDeals.length === 0 ? (
                <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-3">
                  <div className="h-10 w-10 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">No liquidation lots found</h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                      Try widening your region filters or resetting your search term keyword.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedRegion('All Regions');
                      setFulfillmentFilter('All');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {filteredDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      isSelected={activeDealId === deal.id}
                      onSelect={() => handleSelectDeal(deal.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: MAP & AFFILIATE TOOLKIT (lg:col-span-7 or 6) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-start">
            
            {/* Map and driving routes block */}
            <div className={`lg:block ${mobileActiveTab === 'map' ? 'block' : 'hidden'}`}>
              <DealsMap
                activeDeal={activeDeal}
                activeComp={activeComp}
                onSelectComp={setActiveComp}
                userLatOffset={userLatOffset}
                userLngOffset={userLngOffset}
                setUserOffsets={(lat: number, lng: number) => {
                  setUserLatOffset(lat);
                  setUserLngOffset(lng);
                }}
              />
            </div>

            {/* Primary Action Panel: Direct buyer checkout + Referral tracking triggers */}
            <div className={`bg-neutral-900 text-white rounded-2xl border border-neutral-800 p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 lg:block ${mobileActiveTab === 'map' ? 'block' : 'hidden'}`}>
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">Direct Buyer Access</span>
                <h4 className="text-md font-bold tracking-tight text-white">
                  Buy from {activeDeal.storeName}
                </h4>
                <p className="text-xs text-neutral-400 leading-normal max-w-lg">
                  Route yourself to the retail check-out page. Completing this purchase triggers the referral commission logic directly under your promoter stats.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-center mt-3 lg:mt-4">
                <button
                  onClick={() => triggerClaimDeal(activeDeal)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-neutral-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  Claim & Visit Site
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Promoter Earnings Hub Component */}
            <div className={`lg:block ${mobileActiveTab === 'promoter' ? 'block' : 'hidden'}`}>
              {user ? (
                <EarningsHub
                  deals={DEALS_DATA}
                  userStats={userStats}
                  setUserStats={setUserStats}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-white py-10 mt-16 text-center text-xs text-neutral-500 space-y-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-neutral-800 tracking-tight">OpenDeal Route Scanner</span>
            <span>•</span>
            <span>Real-time geo-routing</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by React 19 & Tailwind v4</span>
            <span className="font-mono">Port: 3000</span>
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 max-w-xl mx-auto leading-relaxed px-4">
          OpenDeal Scanner is an interactive demonstration showcasing automated geo-location package deal scouting, custom drive time computations, competitive localized pricing grids (comps), and direct affiliate commission tracking interfaces.
        </p>
      </footer>

      {/* --- CLAIM REFERRAL DEAL SIMULATED POPUP MODAL --- */}
      {claimedDeal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full shadow-2xl overflow-hidden p-6 space-y-5 animate-[scaleIn_0.2s_ease-out_1]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-teal-600">
                <Award className="w-5 h-5 text-teal-600" />
                <span className="text-xs font-bold uppercase tracking-widest">Affiliate Redirect Active</span>
              </div>
              <button 
                onClick={() => setClaimedDeal(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-center">
              <div className="h-20 w-20 rounded-2xl overflow-hidden mx-auto border border-neutral-200 bg-neutral-50">
                <img 
                  src={claimedDeal.imageUrl} 
                  alt={claimedDeal.title} 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-950 line-clamp-2">{claimedDeal.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">Visit Merchant: <strong className="text-neutral-800">{claimedDeal.storeName}</strong></p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-150 rounded-2xl p-4 text-xs text-teal-900 space-y-2">
              <span className="font-bold block text-center">Simulated Tracking Active</span>
              <p className="leading-relaxed text-[11px] text-teal-800">
                The URL has been injected with the promoter parameter <code className="font-mono font-bold bg-teal-100 px-1 rounded">promoter={referralPromoterInput}</code>. 
                Complete this checkout simulation to immediately update the affiliate dashboard with earned funds!
              </p>
              <div className="flex justify-between items-center py-1 border-t border-teal-200/50 pt-2 font-mono text-[10px] text-teal-700">
                <span>Promoter Commission:</span>
                <span className="font-extrabold text-teal-900">${claimedDeal.referralEarningValue.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setClaimedDeal(null)}
                className="py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded-xl border border-neutral-200 transition-all cursor-pointer text-center"
              >
                Cancel Visit
              </button>
              <button
                onClick={handleSimulatePurchase}
                className="py-2.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
              >
                Complete Simulation
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
