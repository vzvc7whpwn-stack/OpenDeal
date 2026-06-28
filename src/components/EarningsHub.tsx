/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  DollarSign, 
  Share2, 
  Copy, 
  Check, 
  TrendingUp, 
  Users, 
  ExternalLink, 
  AlertCircle, 
  ArrowUpRight, 
  RefreshCw, 
  Sparkles,
  Award,
  CircleCheck,
  Smartphone
} from 'lucide-react';
import { Deal, UserStats } from '../types';

interface EarningsHubProps {
  deals: Deal[];
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export default function EarningsHub({
  deals,
  userStats,
  setUserStats
}: EarningsHubProps) {
  const [selectedDealId, setSelectedDealId] = useState<string>(deals[0]?.id || '');
  const [customHandle, setCustomHandle] = useState<string>('partner');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'links' | 'payouts'>('analytics');

  // Find currently selected deal for the link builder
  const currentDeal = deals.find(d => d.id === selectedDealId) || deals[0];

  // Formulate the tracking link
  const generatedLink = `${window.location.origin}/buy?deal=${currentDeal?.id}&promoter=${customHandle.trim().toLowerCase() || 'partner'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Live conversion click simulator
  const handleSimulateConversion = () => {
    // Pick a random reward value or calculate based on selected deal
    const earnVal = currentDeal ? currentDeal.referralEarningValue : 15;
    
    setUserStats(prev => {
      const isNewSale = Math.random() > 0.4; // 60% chance of a full conversion
      
      return {
        ...prev,
        totalClicks: prev.totalClicks + 1,
        conversions: isNewSale ? prev.conversions + 1 : prev.conversions,
        totalEarnings: isNewSale ? prev.totalEarnings + earnVal : prev.totalEarnings,
        pendingPayout: isNewSale ? prev.pendingPayout + earnVal : prev.pendingPayout
      };
    });
  };

  // Submit Payout
  const handleRequestPayout = () => {
    if (userStats.pendingPayout <= 0) return;
    setIsRequestingPayout(true);
    
    setTimeout(() => {
      const amountPaid = userStats.pendingPayout;
      
      setUserStats(prev => ({
        ...prev,
        pendingPayout: 0,
        payoutHistory: [
          {
            id: `pay-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount: amountPaid,
            status: 'Completed'
          },
          ...prev.payoutHistory
        ]
      }));
      
      setIsRequestingPayout(false);
      setPayoutSuccess(true);
      setTimeout(() => setPayoutSuccess(false), 3500);
    }, 1500);
  };

  const isAdmin = window.localStorage.getItem('opendeal_admin') === 'true';

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-md p-6 space-y-6">
      {/* Title & Commission Intro Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-5">
        <div>
          {isAdmin ? <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Admin Control Console</span> : <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Affiliate Tracker Link Hub</span>}
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight mt-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Referral Earnings & Link Hub
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
            Earn money for routing users to buy from retail websites or stores. Generate links, share them, and claim your payouts instantly.
          </p>
        </div>

        {/* Live Simulation Trigger */}
        <button
          onClick={handleSimulateConversion}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
          Simulate Clicks & Purchases
        </button>
      </div>

      {/* Promoter Stats Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/80 p-4 relative overflow-hidden">
          <DollarSign className="absolute right-3 top-3 w-8 h-8 text-neutral-200 pointer-events-none" />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Total Earned</span>
          <span className="text-2xl font-extrabold text-neutral-900 font-mono mt-1.5 block">
            ${userStats.totalEarnings.toFixed(2)}
          </span>
          <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" />
            +18.4% this week
          </span>
        </div>

        <div className="bg-neutral-50 rounded-xl border border-neutral-200/80 p-4 relative overflow-hidden">
          <Share2 className="absolute right-3 top-3 w-8 h-8 text-neutral-200 pointer-events-none" />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Link Clicks</span>
          <span className="text-2xl font-extrabold text-neutral-900 font-mono mt-1.5 block">
            {userStats.totalClicks}
          </span>
          <span className="text-[9px] text-neutral-500 block mt-1">
            Simulated link traffic
          </span>
        </div>

        <div className="bg-neutral-50 rounded-xl border border-neutral-200/80 p-4 relative overflow-hidden">
          <Users className="absolute right-3 top-3 w-8 h-8 text-neutral-200 pointer-events-none" />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Conversions</span>
          <span className="text-2xl font-extrabold text-neutral-900 font-mono mt-1.5 block">
            {userStats.conversions}
          </span>
          <span className="text-[9px] text-teal-600 font-bold block mt-1">
            Conversion rate: {userStats.totalClicks > 0 ? ((userStats.conversions / userStats.totalClicks) * 100).toFixed(1) : '0.0'}%
          </span>
        </div>

        <div className="bg-teal-900 text-white rounded-xl border border-teal-950 p-4 relative overflow-hidden">
          <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block">Available Balance</span>
          <span className="text-2xl font-extrabold text-teal-200 font-mono mt-1.5 block">
            ${userStats.pendingPayout.toFixed(2)}
          </span>
          {userStats.pendingPayout > 0 ? (
            <button
              onClick={handleRequestPayout}
              disabled={isRequestingPayout}
              className="mt-2 w-full text-center bg-teal-500 hover:bg-teal-400 disabled:bg-neutral-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {isRequestingPayout ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Request Payout
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          ) : (
            <span className="text-[10px] text-teal-300 italic block mt-2.5">
              Accrue $10+ to cash out
            </span>
          )}
        </div>
      </div>

      {/* Payout Success Banner */}
      {payoutSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2.5 text-xs animate-[bounce_1s_ease-in-out_1]">
          <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold">Payout Initiated successfully!</span>
            <p className="text-[11px] text-emerald-700 mt-0.5">Your funds are being transferred directly to your account. Standard transfer time: 1-2 business mins.</p>
          </div>
        </div>
      )}

      {/* Tabs Menu inside EarningsHub */}
      <div className="flex border-b border-neutral-200 gap-4 text-xs">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-2.5 font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'analytics' ? 'border-neutral-900 text-neutral-950' : 'border-transparent text-neutral-500'
          }`}
        >
          Link Builder
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`pb-2.5 font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'links' ? 'border-neutral-900 text-neutral-950' : 'border-transparent text-neutral-500'
          }`}
        >
          Sharing Strategies
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-2.5 font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'payouts' ? 'border-neutral-900 text-neutral-950' : 'border-transparent text-neutral-500'
          }`}
        >
          Payout History ({userStats.payoutHistory.length})
        </button>
      </div>

      {/* Tab: Analytics & Link Builder */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-neutral-50/50 p-4 rounded-xl border border-neutral-200">
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xs font-bold text-neutral-700 uppercase">Construct Your Custom Tracking Link</h3>
            
            {/* Deal selector dropdown */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">
                Select Deal Package
              </label>
              <select
                value={selectedDealId}
                onChange={(e) => setSelectedDealId(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-500"
              >
                {deals.map(d => (
                  <option key={d.id} value={d.id}>
                    [{d.category}] {d.title} (${d.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Custom affiliate handle name */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">
                Your Promoter Referral Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-neutral-400 font-mono text-xs">@</span>
                <input
                  type="text"
                  value={customHandle}
                  onChange={(e) => setCustomHandle(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  className="w-full text-xs pl-7 pr-3 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-500 font-mono"
                  placeholder="e.g. yourhandle"
                />
              </div>
              <span className="text-[9px] text-neutral-400 mt-1 block">Customize this to track conversions specifically under your account.</span>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between p-4 bg-white rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Generated Trackable URL</span>
              <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-700 break-all select-all flex items-center justify-between">
                <span>{generatedLink}</span>
              </div>
            </div>

            {currentDeal && (
              <div className="bg-teal-50 border border-teal-100 p-3 rounded-lg text-xs space-y-1">
                <span className="font-bold text-teal-900">Your potential reward:</span>
                <p className="text-[11px] text-teal-800 leading-normal">
                  Each purchase routed through this link earns you a{' '}
                  <strong>
                    {currentDeal.referralEarningType === 'percentage' 
                      ? `${currentDeal.onlineReferralRate}% commission` 
                      : `$${currentDeal.referralEarningValue} flat reward`}
                  </strong>
                  . Estimated payout: <strong className="text-teal-900 font-mono">${currentDeal.referralEarningValue.toFixed(2)}</strong> per checkout.
                </p>
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Link Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Custom Trackable Link
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Sharing Strategies */}
      {activeTab === 'links' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
            <div className="h-8 w-8 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="font-bold text-neutral-900">Share on Social Channels</h4>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Post open-package deals on Reddit liquidation groups, Facebook Marketplace, or Telegram channels. Include drive-time comparisons to capture immediate buyers.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
            <div className="h-8 w-8 bg-teal-50 rounded-lg border border-teal-200 flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-teal-600" />
            </div>
            <h4 className="font-bold text-neutral-900">Target Local Contractors</h4>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Contractors constantly look for bargain DeWalt or Milwaukee toolkits. Post the DeWalt saw and tool package link on localized trade forums or Nextdoor groups.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
            <div className="h-8 w-8 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-neutral-900">Add Comps to Link</h4>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              When writing posts, compare the deal to retail prices. Pointing out a $200 saving versus the nearest competitor builds instant trust and speeds up conversions.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Payout History */}
      {activeTab === 'payouts' && (
        <div className="space-y-2.5">
          {userStats.payoutHistory.length === 0 ? (
            <div className="text-center py-6 text-neutral-400 text-xs bg-neutral-50 rounded-xl border border-neutral-200/60">
              No historical payouts requested yet. Collect referrals and request your first payout.
            </div>
          ) : (
            <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-4 bg-neutral-50 p-2.5 border-b border-neutral-200 font-bold text-neutral-600">
                <span>Payout ID</span>
                <span>Requested Date</span>
                <span>Amount Paid</span>
                <span className="text-right">Transaction Status</span>
              </div>
              <div className="divide-y divide-neutral-100 bg-white">
                {userStats.payoutHistory.map((pay) => (
                  <div key={pay.id} className="grid grid-cols-4 p-2.5 font-mono text-neutral-700">
                    <span className="font-semibold text-neutral-900">{pay.id}</span>
                    <span>{pay.date}</span>
                    <span className="font-bold text-emerald-600">${pay.amount.toFixed(2)}</span>
                    <span className="text-right">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {pay.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
