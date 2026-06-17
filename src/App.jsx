import { useState, useEffect } from 'react';
import gameData from './Data/mockGames.json'; // Back to your stable data!
import WishList from './WishList';
import MyCollection from './MyCollection';
import PaginationControls from './PaginationControls';
import FilterControls from './Data/FilterControls';

function App() {
  const [games, setGames] = useState(gameData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [playerCount, setPlayerCount] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('dashboardLocation') || 'home';
  });
  
  const [wishList, setWishList] = useState(() => {
    const saved = localStorage.getItem('boardGameWishList');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem('boardGameCollection');
    return saved ? JSON.parse(saved) : [];
  });

  const [homePage, setHomePage] = useState(1);
  const [notification, setNotification] = useState('');

  // Synchronize dynamic tab views correctly
  const activeList = 
    location === 'wishList' ? wishList : 
    location === 'myCollection' ? collection : 
    games;

  // Stable, bulletproof local filtering logic
  const filteredGames = activeList.filter((game) => {
    if (!game || !game.title) return false;

    const cleanSearch = searchQuery.trim().toLowerCase();
    
    const matchesKeyword = 
      game.title.toLowerCase().includes(cleanSearch) || 
      (game.description && game.description.toLowerCase().includes(cleanSearch)) || 
      (game.type && game.type.toLowerCase().includes(cleanSearch));
  
    const matchesPlayers = playerCount === '' || 
      (Number(playerCount) >= game.minPlayers && Number(playerCount) <= game.maxPlayers);
      
    const matchesWeight = maxWeight === '' || game.complexity <= Number(maxWeight);
    const matchesType = type === '' || game.type === type;
    const matchesPrice = Number(game.msrp) <= maxPrice;

    return matchesKeyword && matchesPlayers && matchesWeight && matchesType && matchesPrice;
  });

  // Pagination Math
  const itemsPerPage = 5;
  const indexOfLastItem = homePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHomeItems = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalHomePages = Math.ceil(filteredGames.length / itemsPerPage);

  // List Management Functions
  const handleAddToWishList = (game) => {
    if (!wishList.some(item => item.id === game.id)) {
      setWishList([...wishList, game]);
      setNotification(`Added "${game.title}" to your wish list!`);
    } else {
      setNotification(`"${game.title}" is already in your wish list.`);
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const handleRemoveFromWishList = (game) => {
    setWishList(wishList.filter((item) => item.id !== game.id));
    setNotification(`Removed "${game.title}" from your wish list!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddToCollection = (gameToAdd) => {
    if (!collection.some((game) => game.id === gameToAdd.id)) {
      setCollection([...collection, gameToAdd]);
      setNotification(`Added "${gameToAdd.title}" to your collection!`);
    } else {
      alert("You already have this game in your collection");
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const handleRemoveFromCollection = (gameToRemove) => {
    setCollection(collection.filter((item) => item.id !== gameToRemove.id));
    setNotification(`Removed "${gameToRemove.title}" from your collection!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // Safe Page-bound Reset
  useEffect(() => {
    if (homePage > totalHomePages) {
      setHomePage(totalHomePages > 0 ? totalHomePages : 1);
    }
  }, [totalHomePages, homePage]);

  // Local Storage Sync
  useEffect(() => { localStorage.setItem('boardGameWishList', JSON.stringify(wishList)); }, [wishList]);
  useEffect(() => { localStorage.setItem('dashboardLocation', location); }, [location]);
  useEffect(() => { localStorage.setItem('boardGameCollection', JSON.stringify(collection)); }, [collection]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPlayerCount('');
    setMaxWeight('');
    setType('');
    setMaxPrice(100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 pt-44 md:pt-46">
      <header className="fixed top-0 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 z-40 text-center md:text-left">
        <h1 className="text-2xl font-bold mb-5">Board Game Finder</h1>
        <div className="flex gap-7 border border-slate-300 p-3 justify-center mb-3">
          <button onClick={() => setLocation('home')} className={`hover:text-amber-400 ${location === 'home' && 'p-2 border-b-2 border-amber-400'}`}>Home</button>
          <button onClick={() => setLocation('wishList')} className={`hover:text-amber-400 ${location === 'wishList' && 'p-2 border-b-2 border-amber-400'}`}>Wish List</button>
          <button onClick={() => setLocation('myCollection')} className={`hover:text-amber-400 ${location === 'myCollection' && 'p-2 border-b-2 border-amber-400'}`}>My Collection</button>
        </div>
      </header>

      <FilterControls 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
        playerCount={playerCount} setPlayerCount={setPlayerCount} 
        maxWeight={maxWeight} setMaxWeight={setMaxWeight}
        type={type} setType={setType} 
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        handleResetFilters={handleResetFilters} 
      />

      {location === 'home' && (
        <>
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentHomeItems.map((game) => (
              <div key={game.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-full h-48 bg-slate-950 p-2 flex items-center justify-center">
                  <img src={game.thumbnail} alt={game.title} className="max-w-full max-h-full object-contain rounded-lg shadow-md" />
                </div>            
                <div className="p-5">
                  <h2 className="text-xl font-bold mt-2 truncate">{game.title}</h2>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">{game.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-300 pt-3 border-t border-slate-700/50">
                    <div>👥 {game.minPlayers}-{game.maxPlayers} Players</div>
                    <div>⏱️ {game.playingTime} Mins</div>
                    <div>🧠 Complexity: {game.complexity} / 5</div>
                    <div>🎲 Type: {game.type}</div>
                    <div>💲 Price: ${game.msrp}</div>
                  </div>
                  <div className="flex justify-between mt-5">
                    <button onClick={() => handleAddToWishList(game)} className="bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded border border-slate-600 transition-colors duration-150 shadow-xs">+ Add to Wish List</button>
                    <button onClick={() => handleAddToCollection(game)} className="bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded border border-slate-600 transition-colors duration-150 shadow-xs">+ Add to My Collection</button>
                  </div>
                </div>
              </div>
            ))}
          </main>
          <PaginationControls currentPage={homePage} setCurrentPage={setHomePage} totalPages={totalHomePages} />
        </>
      )}

      {location === 'wishList' && (
        <WishList wishList={filteredGames} setWishList={setWishList} onRemoveGame={handleRemoveFromWishList} />
      )}  
        
      {location === 'myCollection' && (
        <MyCollection collection={filteredGames} setCollection={setCollection} onRemoveGame={handleRemoveFromCollection} />
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 bg-slate-800 border border-amber-400 text-amber-400 px-4 py-3 rounded-lg shadow-2xl font-semibold z-50 animate-bounce">
          🚀 {notification}
        </div>
      )}
    </div>
  );
}

export default App;