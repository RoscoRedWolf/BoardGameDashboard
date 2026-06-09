

function FilterControls({ 
  searchQuery, 
  setSearchQuery, 
  playerCount, 
  setPlayerCount, 
  maxWeight, 
  setMaxWeight, 
  type, 
  setType,
  maxPrice, 
  setMaxPrice, 
  handleResetFilters }) {


    return (
      <nav className="flex flex-col gap-5 mb-6 p-4 bg-slate-800 rounded-xl">
              <input
                type="text"
                placeholder="Search games..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 text-slate-100 p-2 rounded border border-slate-700 focus:outline-none focus:border-amber-400" 
              />
              
              <select
                value={playerCount}
                onChange={(e) => setPlayerCount(e.target.value)}
                className="bg-slate-900 text-slate-100 p-2 rounded border border-slate-700"
              >
                <option value="">Any Players</option>
                <option value="2">2 Players</option>
                <option value="3">3 Players</option>
                <option value="4">4 Players</option>
                <option value="5">5 Players</option>
                <option value="6">6 Players</option>
              </select>

              <select
                value={maxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
                className="bg-slate-900 text-slate-100 p-2 rounded border border-slate-700"
              >
                <option value="">Any weight/complexity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-slate-900 text-slate-100 p-2 rounded border border-slate-700"
              >
                <option value="">Any Type</option>
                <option value="Strategy">Strategy</option>
                <option value="Family">Family</option>
                <option value="Cooperative">Cooperative</option>
              </select>

              <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Max Price</span>
                  <span className="text-amber-400 font-semibold">${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-700 h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button 
                onClick={handleResetFilters} 
                className="mt-2 bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 font-semibold p-2 rounded border border-slate-600 hover:border-amber-400 transition-colors duration-200"
                > 
                  Reset All
              </button>
            </nav>
    )

}

export default FilterControls;