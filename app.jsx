import React, { useState } from 'react';
import { Music, RefreshCw } from 'lucide-react';

export default function TubaEtudeSelector() {
  const [selectedEtude, setSelectedEtude] = useState(null);
  const [enabledEtudes, setEnabledEtudes] = useState({
    bordogni: true,
    kopprasch: true,
    blazevich: true
  });

  const etudes = {
    bordogni: { name: 'Bordogni', max: 43 },
    kopprasch: { name: 'Kopprasch', max: 60 },
    blazevich: { name: 'Blazhevich', max: 70 }
  };

  const toggleEtude = (key) => {
    setEnabledEtudes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const generateRandom = () => {
    const enabled = Object.keys(enabledEtudes).filter(key => enabledEtudes[key]);
    
    if (enabled.length === 0) {
      alert('Please select at least one etude book');
      return;
    }

    const randomEtudeKey = enabled[Math.floor(Math.random() * enabled.length)];
    const randomNumber = Math.floor(Math.random() * etudes[randomEtudeKey].max) + 1;
    
    setSelectedEtude({
      name: etudes[randomEtudeKey].name,
      number: randomNumber
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tuba Etude Selector
          </h1>
          <p className="text-gray-600">Choose your practice today</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Etude Books:</h2>
          <div className="space-y-2">
            {Object.entries(etudes).map(([key, etude]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={enabledEtudes[key]}
                  onChange={() => toggleEtude(key)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">
                  {etude.name} (1-{etude.max})
                </span>
              </label>
            ))}
          </div>
        </div>

        {selectedEtude && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200 mb-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Today's Etude</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {selectedEtude.name}
            </div>
            <div className="text-4xl font-bold text-gray-800">
              No. {selectedEtude.number}
            </div>
          </div>
        )}

        <button
          onClick={generateRandom}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Random Select
        </button>
      </div>
    </div>
  );
}
