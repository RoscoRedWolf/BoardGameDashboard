import { useState } from 'react';
import gameData from './Data/mockGames.json';

function App() {
  // Storing the JSON data in state so we can filter/search it later
  const [games, setGames] = useState(gameData);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          GameShelf API Dashboard
        </h1>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
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