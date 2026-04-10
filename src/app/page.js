// app/page.js
'use client';

import { useState } from 'react';
import MapComponent from '../components/MapComponent';

export default function SafeRouteDhaka() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const findSafeRoute = async () => {
    if (!origin || !destination) return alert("Origin and Destination দিন");

    setLoading(true);
    setRouteData(null);

    // Simulate AI safety calculation + real route
    setTimeout(() => {
      setRouteData({
        distance: "12.4 km",
        duration: "28 min",
        cost: "48 taka",
        safetyScore: "94%",
        polyline: null, // MapComponent এ DirectionsRenderer handle করবে
        buildings: [
          { name: "Mirpur-10", status: "good", color: "#22c55e" },
          { name: "Technical College", status: "average", color: "#eab308" },
          { name: "Farmgate", status: "good", color: "#22c55e" },
          { name: "Kawran Bazar", status: "poor", color: "#ef4444" },
        ]
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Header */}
      <header className="bg-[#0f172a] border-b border-green-500/30 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-green-500 rounded-2xl flex items-center justify-center text-2xl">📍</div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-green-400">SafeRoute Dhaka</h1>
              <p className="text-sm text-gray-400">পরিবারের জন্য নিরাপদ যাত্রা</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full flex items-center gap-1 border border-green-500/30">
              ✅ Clear in Dhaka
            </div>
            <div className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full flex items-center gap-1 border border-green-500/30">
              🤖 AI Active
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Real Google Map */}
        <div className="relative h-[450px] border-b border-gray-800">
          <MapComponent 
            origin={origin}
            destination={destination}
            routeData={routeData}
          />

          {routeData && (
            <div className="absolute bottom-6 left-4 right-4 bg-[#1e2937]/95 backdrop-blur-xl border border-green-500/40 rounded-3xl p-5 shadow-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-400 font-semibold text-lg">AI Recommended Safe Route</p>
                  <p className="text-4xl font-bold mt-1 tracking-tighter">{routeData.duration}</p>
                  <p className="text-gray-400">{routeData.distance} • {routeData.cost}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 text-2xl font-bold">{routeData.safetyScore}</p>
                  <p className="text-xs text-gray-500">Safety Score</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Chat Area */}
        <div className="p-5 space-y-6">
          <div className="bg-[#1e2937] rounded-3xl p-6">
            <p className="text-green-400 mb-3">Assalamu Alaikum! আমি SafeRoute।</p>
            <p className="text-gray-300 leading-relaxed">
              বলুন কোথা থেকে কোথায় যাবেন। আমি আপনার জন্য সবচেয়ে নিরাপদ, সস্তা এবং ভালো অবস্থার রাস্তা বের করে দিব।
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => { setOrigin("Mirpur 10, Dhaka"); setDestination("Motijheel, Dhaka"); findSafeRoute(); }}
              className="w-full bg-[#1e2937] hover:bg-green-600/10 border border-green-500/30 p-4 rounded-2xl text-left transition-all active:scale-[0.985]"
            >
              🛵 Mirpur 10 → Motijheel (≈ 50 taka)
            </button>
            <button 
              onClick={() => { setOrigin("Home, Mirpur"); setDestination("Child School, Mirpur"); findSafeRoute(); }}
              className="w-full bg-[#1e2937] hover:bg-green-600/10 border border-green-500/30 p-4 rounded-2xl text-left transition-all active:scale-[0.985]"
            >
              🏫 My child's school route — is it safe today?
            </button>
          </div>

          {/* Input Section */}
          <div className="bg-[#1e2937] rounded-3xl p-2 flex flex-col gap-3">
            <input
              type="text"
              placeholder="From (যেমন: Mirpur 10)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-transparent px-5 py-4 outline-none border border-gray-700 rounded-2xl focus:border-green-500 transition-colors"
            />
            <input
              type="text"
              placeholder="To (যেমন: Motijheel)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent px-5 py-4 outline-none border border-gray-700 rounded-2xl focus:border-green-500 transition-colors"
            />
            <button 
              onClick={findSafeRoute}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 font-semibold py-4 rounded-2xl text-lg transition-all"
            >
              {loading ? "Finding safest route..." : "Find Safe Route"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}