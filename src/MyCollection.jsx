

function MyCollection({ collection, onRemoveGame }) {

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collection.map((game) => (
        <div 
          key={game.id} 
          className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1"
        >
        <div className="w-full h-48 bg-slate-950 p-2 flex items-center justify-center">
          <img 
            src={game.thumbnail}
            alt={game.title} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-md"
            onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%231e293b'/><text x='50%' y='55%' font-size='10' font-family='sans-serif' fill='%23fbbf24' text-anchor='middle'>No Image</text></svg>";
          }}
          />
        </div>            
          <div className="p-5">
            <h2 className="text-xl font-bold mt-2 truncate">{game.title}</h2>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">{game.description}</p>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-300 pt-3 border-t border-slate-700/50">
              <div>👥 {game.minPlayers}-{game.maxPlayers} Players</div>
              <div>⏱️ {game.playingTime} Mins</div>
              <div>🧠 Complexity: {game.complexity} / 5</div>
              <div>🎲 Type: {game.type}</div>
            </div>
            
            <div className="flex justify-between mt-5">
              <button
                onClick={() => onRemoveGame(game)}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors">
                  Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      
    </main>

    
  )
};

export default MyCollection;