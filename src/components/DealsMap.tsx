/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Locate } from 'lucide-react';
import { Deal, CompDeal } from '../types';

interface DealsMapProps {
  activeDeal: Deal;
  activeComp: CompDeal | null;
  onSelectComp: (comp: CompDeal | null) => void;
  userLatOffset: number;
  userLngOffset: number;
  setUserOffsets: (latOffset: number, lngOffset: number) => void;
}

export default function DealsMap({
  activeDeal,
  activeComp,
  onSelectComp
}: DealsMapProps) {
  const [manualCity, setManualCity] = useState('');
  const [manualState, setManualState] = useState('');
  const [userLocationName, setUserLocationName] = useState('Detecting location...');
  const [mapSearchQuery, setMapSearchQuery] = useState('');

  // 1. Core Map Target Calculation Logic
  useEffect(() => {
    if (activeDeal?.storeLocation?.address) {
      const target = activeComp ? activeComp.address : activeDeal.storeLocation.address;
      setMapSearchQuery(target);
    }
  }, [activeDeal, activeComp]);

  // 2. Automated GPS Device Location Retrieval Engine
  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setUserLocationName('Locating device...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocationName(`GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        // Shift map focus directly to user device perimeter
        setMapSearchQuery(`${latitude},${longitude}`);
      },
      (error) => {
        console.error('GPS tracking failed:', error);
        setUserLocationName('Location access denied');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // 3. Manual Search Form Submission Override
  const handleManualSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCity && !manualState) return;
    const queryStr = `${manualCity.trim()}${manualState ? ', ' + manualState.trim() : ''}`;
    setMapSearchQuery(queryStr);
    setUserLocationName(`Manual: ${queryStr}`);
  };

  // Generate safe frame rendering query extensions
  const iframeEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapSearchQuery || 'United States')}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-white space-y-4 h-full flex flex-col">
      {/* Geolocation Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
        {/* Left Hand GPS Automated Detection */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Device Spatial Telemetry</label>
          <button 
            type="button"
            onClick={handleAutoDetectLocation}
            className="w-full p-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Locate className="w-4 h-4" /> Auto-Detect My Location
          </button>
          <span className="block text-[11px] text-slate-400 italic text-center truncate">{userLocationName}</span>
        </div>

        {/* Right Hand Manual Input Override Entry */}
        <form onSubmit={handleManualSearchSubmit} className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Manual Center Override</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={manualCity} 
              onChange={(e) => setManualCity(e.target.value)}
              placeholder="City (e.g. Chicago)" 
              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500"
            />
            <input 
              type="text" 
              value={manualState} 
              onChange={(e) => setManualState(e.target.value)}
              placeholder="State" 
              className="w-20 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-center focus:outline-none focus:border-teal-500"
            />
            <button type="submit" className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg transition">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Actual Genuine Interactive Render Canvas Viewport */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[350px]">
        <iframe 
          title="Live Liquidation Mapping Node"
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={iframeEmbedUrl}
          className="absolute inset-0 w-full h-full grayscale opacity-90 invert contract-[90%]"
        />
      </div>

      {/* Map Meta Details Footnote */}
      <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded-lg text-xs border border-slate-800/40">
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-medium truncate max-w-[280px]">Focusing: {activeDeal.storeName || 'National Center'}</span>
        </div>
        {activeComp && (
          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-semibold">
            Comparing Competitor Node
          </span>
        )}
      </div>
    </div>
  );
}
