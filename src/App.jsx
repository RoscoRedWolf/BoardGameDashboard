import { useState } from 'react';
import gameData from './Data/mockGames.json';

function App() {
  // Storing the JSON data in state so we can filter/search it later
  const [games, setGames] = useState(gameData);
  const [searchQuery, setSearchQuery] = useState('');
  const [playerCount, setPlayerCount] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [type, setType] = useState('');

  const filteredGames = games.filter((game) => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    
    const matchesKeyword = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      game.type.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesPlayers = playerCount === '' || 
        (Number(playerCount) >= game.minPlayers && Number(playerCount) <= game.maxPlayers);
      const matchesWeight = maxWeight === '' || game.complexity <= Number(maxWeight);
      const matchesType = type === '' || game.type === type;

      return matchesKeyword && matchesPlayers && matchesWeight && matchesType;
  })

  const handleResetFilters = () => {
      setSearchQuery('');
      setPlayerCount('');
      setMaxWeight('');
      setType('');
  }
  
    //Render

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          GameShelf API Dashboard
        </h1>
      </header>

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

        <button 
          onClick={handleResetFilters} 
          className="mt-2 bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 font-semibold p-2 rounded border border-slate-600 hover:border-amber-400 transition-colors duration-200"
          > 
            Reset All
        </button>
      </nav>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div 
            key={game.id} 
            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1"
          >
          <div className="w-full h-48 bg-slate-950 p-2 flex items-center justify-center">
            <img 
              src={game.thumbnail} 
              alt={game.title} 
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x400/1e293b/fbbf24?text=No+Image";
              }}
            />
          </div>            
            <div className="p-5">
              <h2 className="text-xl font-bold mt-2 truncate">{game.title}</h2>
              <p className="text-sm text-slate-400 mt-2 line-clamp-2">{game.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-300 pt-3 border-t border-slate-700/50">
                <div>👥 {game.minPlayers}-{game.maxPlayers} Players</div>
                <div>⏱️ {game.playingTime} Mins</div>
                <div>🧠 Weight: {game.complexity}</div>
                <div>🎲 Type: {game.type}</div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;