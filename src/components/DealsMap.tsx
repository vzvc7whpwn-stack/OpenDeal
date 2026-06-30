import React, { useState, useEffect } from "react";
import { MapPin, Search, Locate } from "lucide-react";
import { Deal, CompDeal } from "../types";

interface DealsMapProps {
  activeDeal: Deal;
  activeComp: CompDeal | null;
  onSelectComp: (comp: CompDeal | null) => void;
  userLatOffset: number;
  userLngOffset: number;
  setUserOffsets: (latOffset: number, lngOffset: number) => void;
}

export default function DealsMap({ activeDeal, activeComp, onSelectComp }: DealsMapProps) {
  const [manualCity, setManualCity] = useState("");
  const [manualState, setManualState] = useState("");
  const [userLocationName, setUserLocationName] = useState("Standby...");
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  // Auto-focus the map on the currently selected deal or competitor
  useEffect(() => {
    const target = activeComp?.address || activeDeal?.storeLocation?.address || "United States";
    setMapSearchQuery(target);
  }, [activeDeal, activeComp]);

  // GPS Locate Button
  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setUserLocationName("Locating device...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocationName(`GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setMapSearchQuery(`${latitude},${longitude}`);
      },
      (error) => {
        console.error("GPS tracking failed:", error);
        setUserLocationName("Location access denied");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  // Manual Search Submit
  const handleManualSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCity && !manualState) return;
    const queryStr = `${manualCity.trim()}${manualState ? ", " + manualState.trim() : ""}`;
    setMapSearchQuery(queryStr);
    setUserLocationName(`Manual: ${queryStr}`);
  };

  // Safe Google Maps formatting
  const iframeEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapSearchQuery || "United States")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-white space-y-4 h-full flex flex-col">
      {/* Location Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Device Location
          </label>
          <button
            type="button"
            onClick={handleAutoDetectLocation}
            className="w-full p-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Locate className="w-4 h-4" /> Auto-Detect Location
          </button>
          <span className="block text-[11px] text-slate-400 italic text-center truncate">
            {userLocationName}
          </span>
        </div>

        <form onSubmit={handleManualSearchSubmit} className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Manual Override
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              placeholder="City"
              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500"
            />
            <input
              type="text"
              value={manualState}
              onChange={(e) => setManualState(e.target.value)}
              placeholder="State"
              className="w-20 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-center focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg transition"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Live Interactive Map */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[350px]">
        <iframe
          title="Live Liquidation Tracking"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={iframeEmbedUrl}
          className="absolute inset-0 w-full h-full grayscale opacity-80 contrast-125"
        />
      </div>

      <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded-lg text-xs border border-slate-800/40">
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-medium truncate max-w-[280px]">
            Focusing: {activeDeal?.storeName || "National Hub"}
          </span>
        </div>
      </div>
    </div>
  );
}
