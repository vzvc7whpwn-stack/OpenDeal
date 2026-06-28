/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  RotateCw, 
  Car, 
  ChevronRight, 
  Award, 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  AlertCircle
} from 'lucide-react';
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
  onSelectComp,
  userLatOffset,
  userLngOffset,
  setUserOffsets
}: DealsMapProps) {
  // Navigation Simulation State
  const [isSimulatingDrive, setIsSimulatingDrive] = useState(false);
  const [driveProgress, setDriveProgress] = useState(0); // 0 to 100%
  const [showRoutesList, setShowRoutesList] = useState(false);
  const [draggingUser, setDraggingUser] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Active coordinates
  const cityCenter = {
    lat: activeDeal.storeLocation.lat - userLatOffset,
    lng: activeDeal.storeLocation.lng - userLngOffset
  };

  // User simulated live location
  const userLoc = {
    lat: activeDeal.storeLocation.lat - 0.02 + userLatOffset,
    lng: activeDeal.storeLocation.lng + 0.025 + userLngOffset,
    address: 'Simulated Current Live Location'
  };

  // Destination coordinates (Main Deal or selected Comp)
  const destLoc = activeComp ? {
    lat: activeComp.lat,
    lng: activeComp.lng,
    name: activeComp.storeName,
    price: activeComp.price,
    address: activeComp.address
  } : {
    lat: activeDeal.storeLocation.lat,
    lng: activeDeal.storeLocation.lng,
    name: activeDeal.storeName,
    price: activeDeal.price,
    address: activeDeal.storeLocation.address
  };

  // Normalization boundaries for SVG coordinate system (500 width x 350 height)
  // Compute bounding box containing User, Deal, and Comps
  const allCoords = [
    { lat: userLoc.lat, lng: userLoc.lng },
    { lat: activeDeal.storeLocation.lat, lng: activeDeal.storeLocation.lng },
    ...activeDeal.comps.map(c => ({ lat: c.lat, lng: c.lng }))
  ];

  const lats = allCoords.map(c => c.lat);
  const lngs = allCoords.map(c => c.lng);

  const padding = 0.015;
  const bounds = {
    minLat: Math.min(...lats) - padding,
    maxLat: Math.max(...lats) + padding,
    minLng: Math.min(...lngs) - padding,
    maxLng: Math.max(...lngs) + padding
  };

  // Coordinate scaling to SVG 500x320 view box
  const getX = (lng: number) => {
    const ratio = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
    return 50 + ratio * 400; // Map to 50px - 450px
  };

  const getY = (lat: number) => {
    // Invert Y for SVG coordinates
    const ratio = (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
    return 270 - ratio * 220; // Map to 50px - 270px
  };

  // Calculate real-time distance using Haversine formula
  const getHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Earth radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distanceMiles = getHaversineDistance(userLoc.lat, userLoc.lng, destLoc.lat, destLoc.lng);
  // Assume avg city traffic speed of 25mph
  const driveTimeMins = Math.round((distanceMiles / 25) * 60 + 2); // adding base delay

  // SVG Positions
  const userX = getX(userLoc.lng);
  const userY = getY(userLoc.lat);
  const destX = getX(destLoc.lng);
  const destY = getY(destLoc.lat);

  // Simulated path points for route line. A curved Bezier path adds high fidelity!
  const controlPointX = (userX + destX) / 2 + 35;
  const controlPointY = (userY + destY) / 2 - 40;

  const pathD = `M ${userX} ${userY} Q ${controlPointX} ${controlPointY} ${destX} ${destY}`;

  // Vehicle position on route
  const getPointOnQuadraticBezier = (t: number) => {
    const x = (1 - t) * (1 - t) * userX + 2 * (1 - t) * t * controlPointX + t * t * destX;
    const y = (1 - t) * (1 - t) * userY + 2 * (1 - t) * t * controlPointY + t * t * destY;
    return { x, y };
  };

  const vehiclePos = getPointOnQuadraticBezier(driveProgress / 100);

  // Handle Dragging simulated current location
  const handleMouseDown = () => {
    setDraggingUser(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingUser || !mapContainerRef.current) return;

      const rect = mapContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Inverse map calculation to convert screen coords back to Lat/Lng offsets
      const svgWidth = rect.width;
      const svgHeight = rect.height;

      // Normalize client x/y relative to bounds
      const ratioX = (x / svgWidth);
      const ratioY = (y / svgHeight);

      // Scale ratio back to coordinates
      const targetLng = bounds.minLng + ((ratioX * svgWidth - 50) / 400) * (bounds.maxLng - bounds.minLng);
      const targetLat = bounds.minLat + ((270 - ratioY * svgHeight) / 220) * (bounds.maxLat - bounds.minLat);

      // Set user offsets
      const originalUserLat = activeDeal.storeLocation.lat - 0.02;
      const originalUserLng = activeDeal.storeLocation.lng + 0.025;

      const newLatOffset = targetLat - originalUserLat;
      const newLngOffset = targetLng - originalUserLng;

      // Bound to avoid out of range
      if (Math.abs(newLatOffset) < 0.1 && Math.abs(newLngOffset) < 0.1) {
        setUserOffsets(newLatOffset, newLngOffset);
      }
    };

    const handleMouseUp = () => {
      setDraggingUser(false);
    };

    if (draggingUser) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingUser, bounds, activeDeal, setUserOffsets]);

  // Simulated Drive Animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulatingDrive) {
      interval = setInterval(() => {
        setDriveProgress((prev) => {
          if (prev >= 100) {
            setIsSimulatingDrive(false);
            return 100;
          }
          return prev + 1.5;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isSimulatingDrive]);

  const resetDriveSimulation = () => {
    setIsSimulatingDrive(false);
    setDriveProgress(0);
  };

  const startDriveSimulation = () => {
    setDriveProgress(0);
    setIsSimulatingDrive(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-md overflow-hidden flex flex-col h-full">
      {/* Header Info Panel */}
      <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neutral-800 rounded-lg border border-neutral-700">
            <Navigation className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Pickup Route Scanner</h3>
            <p className="text-sm font-bold tracking-tight text-white line-clamp-1">
              To: {destLoc.name}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-neutral-400 block">Open Box Price</span>
          <span className="text-md font-extrabold text-teal-400 font-mono">${destLoc.price}</span>
        </div>
      </div>

      {/* Map Stats HUD */}
      <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200 text-center py-2.5 divide-x divide-neutral-200">
        <div>
          <span className="text-[10px] text-neutral-500 uppercase font-medium block">Drive Time</span>
          <span className="text-sm font-bold text-neutral-800 flex items-center justify-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            {isSimulatingDrive ? Math.max(1, Math.round(driveTimeMins * (1 - driveProgress / 100))) : driveTimeMins} mins
          </span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 uppercase font-medium block">Distance</span>
          <span className="text-sm font-bold text-neutral-800 font-mono mt-0.5 block">
            {distanceMiles.toFixed(1)} miles
          </span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 uppercase font-medium block">Pickup Mode</span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-0.5">
            In-Store
          </span>
        </div>
      </div>

      {/* Embedded Map Canvas */}
      <div 
        ref={mapContainerRef}
        className="relative bg-neutral-100 flex-grow select-none overflow-hidden cursor-crosshair min-h-[260px] md:min-h-[300px]"
        style={{ height: '320px' }}
      >
        {/* Vector Background Graphic */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Simulated Rivers / Bay */}
          <path 
            d="M -10 150 Q 150 180 250 200 T 510 120 L 510 350 L -10 350 Z" 
            fill="#e0f2fe" 
            opacity="0.6"
          />
          <path 
            d="M 120 -10 Q 220 180 180 360" 
            fill="none" 
            stroke="#bae6fd" 
            strokeWidth="20" 
            opacity="0.4"
          />

          {/* Grid lines resembling city blocks */}
          <line x1="0" y1="60" x2="500" y2="60" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="120" x2="500" y2="120" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="180" x2="500" y2="180" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="240" x2="500" y2="240" stroke="#e2e8f0" strokeWidth="1" />
          
          <line x1="100" y1="0" x2="100" y2="350" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="350" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="300" y1="0" x2="300" y2="350" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="400" y1="0" x2="400" y2="350" stroke="#e2e8f0" strokeWidth="1" />

          {/* Park Area */}
          <rect x="280" y="30" width="80" height="60" rx="8" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1" />
          <text x="320" y="65" fill="#166534" fontSize="8" fontWeight="bold" textAnchor="middle" opacity="0.7">SIMULATED PARK</text>

          {/* City center watermark */}
          <text x="250" y="160" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle" opacity="0.3" tracking-widest="0.1em">
            {activeDeal.storeLocation.city.toUpperCase()} METRO AREA
          </text>

          {/* Route Path Polyline */}
          <path
            d={pathD}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.3"
          />
          
          <path
            d={pathD}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6,4"
            className={isSimulatingDrive ? "animate-none" : "animate-[dash_20s_linear_infinite]"}
          />

          {/* Moving car simulation overlay */}
          {driveProgress > 0 && driveProgress < 100 && (
            <g transform={`translate(${vehiclePos.x - 10}, ${vehiclePos.y - 10})`}>
              <circle cx="10" cy="10" r="10" fill="#14b8a6" />
              <g transform="translate(4,4) scale(0.6)">
                <path d="M18.5 12c.83 0 1.5-.67 1.5-1.5V6c0-.83-.67-1.5-1.5-1.5H5.5C4.67 4.5 4 5.17 4 6v4.5c0 .83.67 1.5 1.5 1.5H18.5z" fill="#fff"/>
              </g>
            </g>
          )}
        </svg>

        {/* --- Interactive HTML Overlays --- */}

        {/* User Location Marker (Draggable) */}
        <div
          style={{ left: `${userX}px`, top: `${userY}px` }}
          onMouseDown={handleMouseDown}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group z-25 p-2 ${draggingUser ? 'scale-110' : ''}`}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing beacon */}
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-30 animate-ping"></span>
            
            <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white">
              <span className="text-[9px] font-bold">YOU</span>
            </div>
          </div>
          {/* Live label tooltip */}
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Drag to relocate
          </div>
        </div>

        {/* Store Location Marker (Main Deal) */}
        <div
          style={{ left: `${getX(activeDeal.storeLocation.lng)}px`, top: `${getY(activeDeal.storeLocation.lat)}px` }}
          className={`absolute transform -translate-x-1/2 -translate-y-full z-20 cursor-pointer ${!activeComp ? 'scale-110' : 'opacity-85'}`}
          onClick={() => onSelectComp(null)}
        >
          <div className="flex flex-col items-center">
            {/* Store card tooltip */}
            <div className={`px-2 py-1 rounded bg-teal-600 text-white text-[10px] font-extrabold shadow-md mb-1 border border-teal-500 flex items-center gap-1 ${!activeComp ? 'ring-2 ring-offset-1 ring-teal-500' : ''}`}>
              <span>MAIN DEAL</span>
              <span className="bg-teal-950 px-1 py-0.2 rounded font-mono text-[9px] text-teal-300">${activeDeal.price}</span>
            </div>
            <div className="h-7 w-7 bg-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white text-white">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Competitor Markers (Comps) */}
        {activeDeal.comps.map((comp) => {
          const compX = getX(comp.lng);
          const compY = getY(comp.lat);
          const isSelected = activeComp?.id === comp.id;

          return (
            <div
              key={comp.id}
              style={{ left: `${compX}px`, top: `${compY}px` }}
              className={`absolute transform -translate-x-1/2 -translate-y-full z-10 cursor-pointer group transition-all ${isSelected ? 'scale-110 z-20' : 'opacity-75 hover:opacity-100'}`}
              onClick={() => onSelectComp(comp)}
            >
              <div className="flex flex-col items-center">
                {/* Custom comp display badge */}
                <div className={`px-2 py-1 rounded bg-neutral-800 text-white text-[9px] font-bold shadow-md mb-1 border border-neutral-700 flex items-center gap-1 ${isSelected ? 'ring-2 ring-offset-1 ring-amber-400 border-amber-400 bg-neutral-900' : ''}`}>
                  <span>Comp Deal</span>
                  <span className="bg-neutral-950 px-1 py-0.2 rounded font-mono text-[8px] text-amber-400">${comp.price}</span>
                </div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shadow-sm border-2 border-white text-white ${isSelected ? 'bg-amber-500' : 'bg-neutral-700'}`}>
                  <Sliders className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Drag Instruction Overlay Banner */}
        <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow border border-neutral-200 flex items-center gap-1.5 max-w-[90%] text-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-[10px] font-medium text-neutral-600">
            <strong>Protip:</strong> Grab and drag the <span className="text-blue-600 font-bold">BLUE YOU PIN</span> to simulate your actual driving location!
          </span>
        </div>
      </div>

      {/* Map Control Actions */}
      <div className="p-4 border-t border-neutral-200 bg-white space-y-4">
        {/* Drive Simulation controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!isSimulatingDrive ? (
              <button
                onClick={startDriveSimulation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Car className="w-3.5 h-3.5" />
                Start Route Simulation
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                </span>
                <span className="text-xs font-bold text-teal-800">Simulating Drive ({Math.round(driveProgress)}%)</span>
              </div>
            )}
            
            {(driveProgress > 0 || isSimulatingDrive) && (
              <button
                onClick={resetDriveSimulation}
                className="p-1.5 text-neutral-500 hover:text-neutral-800 rounded-lg hover:bg-neutral-100 transition-all cursor-pointer"
                title="Reset simulation"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-neutral-500 flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
            <span>Lat: {userLoc.lat.toFixed(4)}</span>
            <span>•</span>
            <span>Lng: {userLoc.lng.toFixed(4)}</span>
          </div>
        </div>

        {/* Selected Route & Comps Detail */}
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/90 text-xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-200/60">
            <span className="font-bold text-neutral-800">Active Destination Details</span>
            <span className="text-[10px] font-mono font-medium text-neutral-500">
              {activeComp ? 'Comp Routing Selected' : 'Primary Clearance Outlet'}
            </span>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5">
              <span className="text-neutral-400 font-bold shrink-0">Store:</span>
              <span className="font-medium text-neutral-700">{destLoc.name}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-neutral-400 font-bold shrink-0">Address:</span>
              <span className="text-neutral-600 line-clamp-1">{destLoc.address}</span>
            </div>
            {activeComp && (
              <div className="mt-2 bg-amber-50 border border-amber-200 text-amber-900 p-2 rounded-lg flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Savings Alert:</span>
                  <p className="text-[11px] leading-tight mt-0.5">{activeComp.savingsMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nearby Comps Selection Helper */}
        <div>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">
            Compare with Nearby pickups & comps ({activeDeal.comps.length})
          </span>
          <div className="space-y-1.5">
            {/* Primary Deal selector button */}
            <button
              onClick={() => onSelectComp(null)}
              className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                !activeComp
                  ? 'bg-teal-50/60 border-teal-300 text-teal-950 font-bold'
                  : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className={`w-3.5 h-3.5 ${!activeComp ? 'text-teal-600' : 'text-neutral-400'}`} />
                <span>Primary: {activeDeal.storeName} (${activeDeal.price})</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold">
                <span>0.0 mi</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </button>

            {/* Competitor option lists */}
            {activeDeal.comps.map((comp) => {
              const isSelected = activeComp?.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => onSelectComp(comp)}
                  className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                      : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-500' : 'text-neutral-400'}`} />
                    <span className="truncate max-w-[200px]">{comp.storeName} (${comp.price})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold">
                    <span>+{comp.distanceMiles.toFixed(1)} mi</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
