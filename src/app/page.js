// app/page.js
'use client';

import { useState } from 'react';
import MapComponent from '../components/MapComponent';

export default function SafeRouteDhaka() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [buses, setBuses] = useState([]);
  const [sortBy, setSortBy] = useState('fare'); // fare, time, distance
  const [loading, setLoading] = useState(false);

  const dhakaBuses = [
    { id: 1, name: "Best Transport", number: "বেস্ট ট্রান্সপোর্ট", fare: 45, time: "32 min", distance: "12.8 km", type: "সিটিং" },
    { id: 2, name: "Al Makka", number: "আল মক্কা", fare: 40, time: "35 min", distance: "13.2 km", type: "লোকাল" },
    { id: 3, name: "Bahon", number: "বাহন", fare: 50, time: "28 min", distance: "12.4 km", type: "সিটিং" },
    { id: 4, name: "6 No. Motijheel Banani", number: "৬ নং", fare: 35, time: "40 min", distance: "14 km", type: "লোকাল" },
  ];

  const findSafeRoute = () => {
    if (!origin || !destination) return alert("অরিজিন ও ডেস্টিনেশন দিন");

    setLoading(true);

    setTimeout(() => {
      setRouteData({
        duration: "28 min",
        distance: "12.4 km",
        cost: "40-50 taka",
        safetyScore: "92%",
        badBuildings: 7,
        footpath: "Average",
      });

      setBuses(dhakaBuses);
      setLoading(false);
    }, 1400);
  };

  // Sort buses
  const sortedBuses = [...buses].sort((a, b) => {
    if (sortBy === 'fare') return a.fare - b.fare;
    if (sortBy === 'time') return parseInt(a.time) - parseInt(b.time);
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a] border-b border-green-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-3xl">📍</div>
          <div>
            <h1 className="text-3xl font-bold text-green-400">SafeRoute Dhaka</h1>
            <p className="text-sm text-gray-400">নিরাপদ • স্মার্ট • সাশ্রয়ী</p>
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-3xl flex items-center gap-2">
            ✅ Clear in Dhaka
          </div>
          <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-3xl flex items-center gap-2">
            🤖 AI Active
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-h-[85vh] p-3">
        {/* LEFT: MAP (বড় স্ক্রিনে বামে) */}
        <div className="flex-1 lg:w-3/5 h-[420px] lg:h-auto  relative border-r border-gray-800">
          <MapComponent routeData={routeData} />
          
          {routeData && (
            <div className="absolute bottom-6 left-6 bg-[#1e2937]/95 backdrop-blur-xl border border-green-500/40 rounded-3xl p-5 shadow-2xl max-w-[280px]">
              <p className="text-green-400 text-lg font-semibold">AI Safe Route</p>
              <p className="text-5xl font-bold mt-1">{routeData.duration}</p>
              <p className="text-gray-400">{routeData.distance} • {routeData.cost}</p>
              <p className="text-emerald-400 mt-3">Safety Score: {routeData.safetyScore}</p>
            </div>
          )}
        </div>

        {/* RIGHT: SIDEBAR (সব তথ্য) */}
        <div className="w-full lg:w-2/5 bg-[#0f172a] p-3 overflow-auto hide-scrollbar flex flex-col gap-6">
          <div className="bg-[#1e2937] rounded-xl p-3">
            <p className="text-green-400 mb-3">Assalamu Alaikum! আমি SafeRoute।</p>
            <p className="text-gray-300 leading-relaxed">
              বলুন কোথা থেকে কোথায় যাবেন। আমি আপনার জন্য সবচেয়ে নিরাপদ, সস্তা এবং ভালো অবস্থার রাস্তা বের করে দিব।
            </p>
          </div>
          {/* Input Section */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="কোথা থেকে? (যেমন: Mirpur 10)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-[#1e2937] border border-gray-700 focus:border-green-500 rounded-xl px-5 py-3 outline-none"
            />
            <input
              type="text"
              placeholder="কোথায় যাবেন? (যেমন: Motijheel)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#1e2937] border border-gray-700 focus:border-green-500 rounded-xl px-5 py-3 outline-none"
            />
            <button
              onClick={findSafeRoute}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl text-xl font-semibold transition-all"
            >
              {loading ? "রুট খুঁজছে..." : "Find Safe Route"}
            </button>
          </div>

          {/* Quick for New in Dhaka */}
          {!routeData && (
            <div>
              <h2 className="text-green-400 text-lg mb-3">নতুন ঢাকায় এসেছেন?</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <button onClick={() => {setOrigin("Mirpur 10"); setDestination("Motijheel"); findSafeRoute();}} className="bg-[#1e2937] hover:bg-green-500/10 p-4 rounded-2xl text-left">Mirpur 10 → Motijheel</button>
                <button onClick={() => {setOrigin("Uttara"); setDestination("Farmgate"); findSafeRoute();}} className="bg-[#1e2937] hover:bg-green-500/10 p-4 rounded-2xl text-left">Uttara → Farmgate</button>
              </div>
            </div>
          )}

          {routeData && (
            <>
              {/* Available Buses */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-green-400">🚌 Available Buses</h2>
                  <div className="flex gap-2 text-xs">
                    <button onClick={() => setSortBy('fare')} className={`px-4 py-2 rounded-3xl ${sortBy === 'fare' ? 'bg-green-500 text-black' : 'bg-[#1e2937]'}`}>ভাড়া</button>
                    <button onClick={() => setSortBy('time')} className={`px-4 py-2 rounded-3xl ${sortBy === 'time' ? 'bg-green-500 text-black' : 'bg-[#1e2937]'}`}>সময়</button>
                    <button onClick={() => setSortBy('distance')} className={`px-4 py-2 rounded-3xl ${sortBy === 'distance' ? 'bg-green-500 text-black' : 'bg-[#1e2937]'}`}>দূরত্ব</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {sortedBuses.map(bus => (
                    <div key={bus.id} className="bg-[#1e2937] p-4 rounded-2xl flex justify-between items-center hover:border-green-500 border border-transparent transition-all">
                      <div>
                        <p className="font-semibold">{bus.name} ({bus.number})</p>
                        <p className="text-xs text-gray-400">{bus.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">৳{bus.fare}</p>
                        <p className="text-xs text-gray-400">{bus.time} • {bus.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Footpath */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1e2937] p-5 rounded-3xl">
                  <h3 className="text-red-400 text-sm mb-2">⚠️ Bad Buildings</h3>
                  <p className="text-5xl font-bold">{routeData.badBuildings}</p>
                  <p className="text-gray-400">buildings in poor condition</p>
                </div>
                <div className="bg-[#1e2937] p-5 rounded-3xl">
                  <h3 className="text-yellow-400 text-sm mb-2">🚶 Footpath</h3>
                  <p className="text-4xl font-bold">{routeData.footpath}</p>
                  <p className="text-xs text-gray-400 mt-1">মাঝারি অবস্থা (হকার ও পার্কিং আছে)</p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-[#1e2937] p-5 rounded-3xl text-sm leading-relaxed">
                <strong>টিপস:</strong> নতুন হলে সিটিং বাস নিন। ভিড়ের সময় এড়িয়ে চলুন। ফুটপাথে হাঁটবেন না।
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}