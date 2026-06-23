'use client'

import { useState } from 'react'
import { MapPin, Map, Navigation, Shuffle, Info } from 'lucide-react'

type LocationData = {
  name: string
  distanceKm: number
  drivingMinutes: number
  runningMinutesPace5: number // Pace 5:00/km
  runningMinutesPace4: number // Pace 4:00/km
  category: 'Training' | 'Scenic' | 'Practical'
  description: string
}

const LOCATIONS: LocationData[] = [
  {
    name: 'Kamariny Stadium Track',
    distanceKm: 2.1,
    drivingMinutes: 4,
    runningMinutesPace5: 10,
    runningMinutesPace4: 8,
    category: 'Training',
    description: 'The historic dirt track where legends train. Perfect distance for a warm-up jog from the guesthouse.'
  },
  {
    name: 'Iten View Point (Kerio Valley)',
    distanceKm: 1.8,
    drivingMinutes: 3,
    runningMinutesPace5: 9,
    runningMinutesPace4: 7,
    category: 'Scenic',
    description: 'Panoramic views over the Rift Valley. An easy walk or jog to catch the sunrise.'
  },
  {
    name: 'Kerio View Road & Hotel',
    distanceKm: 2.5,
    drivingMinutes: 5,
    runningMinutesPace5: 12,
    runningMinutesPace4: 10,
    category: 'Scenic',
    description: 'Scenic forest trails and a premium restaurant to unwind after training.'
  },
  {
    name: 'Singore Forest Run (Trails)',
    distanceKm: 6.2,
    drivingMinutes: 10,
    runningMinutesPace5: 31,
    runningMinutesPace4: 25,
    category: 'Training',
    description: 'Dense forest dirt trails at 2,400m altitude. Preferred destination for long Sunday runs.'
  },
  {
    name: 'Cheploch Gorge (Valley Floor)',
    distanceKm: 28.5,
    drivingMinutes: 45,
    runningMinutesPace5: 142,
    runningMinutesPace4: 114,
    category: 'Practical',
    description: 'Beautiful canyon excursion. High heat training site down in the valley floor.'
  },
  {
    name: 'Eldoret International Airport (EDL)',
    distanceKm: 46.0,
    drivingMinutes: 70,
    runningMinutesPace5: 230,
    runningMinutesPace4: 184,
    category: 'Practical',
    description: 'The main regional airport. Shuttle transfers are easily arranged for guests.'
  }
]

export function DistanceCalculator() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const loc = LOCATIONS[selectedIdx]

  return (
    <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-primary/10 shadow-premium overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.2fr]">
        
        {/* Left selector */}
        <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-primary/10 flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Proximity & Routes
            </h4>
            <h3 className="font-display text-3xl text-primary tracking-tight mb-8">
              Distance from Cherush Stay
            </h3>
            
            <div className="space-y-3">
              {LOCATIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    idx === selectedIdx
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-primary/5 text-primary hover:bg-primary/10'
                  }`}
                >
                  <span className="font-medium tracking-tight">{item.name}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    idx === selectedIdx
                      ? 'bg-premium text-primary'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {item.distanceKm} km
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-primary/5 rounded-2xl flex gap-3 text-xs text-muted leading-relaxed">
            <Info className="w-5 h-5 text-accent shrink-0" />
            <span>
              Iten lies at ~2,400m altitude. Distances and walking/running times assume rolling dirt trails and paved segments.
            </span>
          </div>
        </div>

        {/* Right metrics */}
        <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="text-xs uppercase tracking-widest text-premium">Destination</span>
              <span className="text-sm font-semibold uppercase tracking-wider bg-white/10 px-3 py-1 rounded">
                {loc.category}
              </span>
            </div>
            
            <h3 className="font-display text-3xl text-premium font-medium tracking-tight">
              {loc.name}
            </h3>
            <p className="text-white/80 leading-relaxed text-sm">
              {loc.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
            <div className="bg-white/5 p-4 rounded-2xl text-center flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-premium mb-2">Distance</span>
              <div>
                <span className="font-display text-3xl font-semibold text-white block">
                  {loc.distanceKm}
                </span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider">Kilometers</span>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl text-center flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-premium mb-2">Drive Time</span>
              <div>
                <span className="font-display text-3xl font-semibold text-white block">
                  {loc.drivingMinutes}
                </span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider">Minutes</span>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl text-center flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-premium mb-2">Run Time</span>
              <div>
                <span className="font-display text-3xl font-semibold text-white block">
                  {loc.runningMinutesPace5}
                </span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider">Mins (5:00/km)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-premium" />
              <span>Easy access via main road</span>
            </div>
            <div className="flex items-center gap-2">
              <Shuffle className="w-3.5 h-3.5 text-premium" />
              <span>Pace (4:00/km): {loc.runningMinutesPace4} mins</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
