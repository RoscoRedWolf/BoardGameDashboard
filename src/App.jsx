import { useState, useEffect } from 'react';
import gameData from './Data/mockGames.json';
import WishList from './WishList';
import MyCollection from './MyCollection';
import PaginationControls from './PaginationControls';
import FilterControls from './Data/FilterControls';

function App() {
  const [games, setGames] = useState(gameData);
  const [searchQuery, setSearchQuery] = useState('');
  const [playerCount, setPlayerCount] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('dashboardLocation');
    return savedLocation ? savedLocation : 'home';
  })
  const [wishList, setWishList] = useState(() => {
    const savedWishList = localStorage.getItem('boardGameWishList');
    return savedWishList ? JSON.parse(savedWishList) : [];
  });
  const [collection, setCollection] = useState(() => {
    const savedCollection = localStorage.getItem('boardGameCollection');
    return savedCollection ? JSON.parse(savedCollection): [];
  });


  const [homePage, setHomePage] = useState(1);
  const [notification, setNotification] = useState('');

  const activeList = location === 'wishList' ? wishList : games;

  const filteredGames = activeList.filter((game) => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    
    const matchesKeyword = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      game.type.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesPlayers = playerCount === '' || 
        (Number(playerCount) >= game.minPlayers && Number(playerCount) <= game.maxPlayers);
      const matchesWeight = maxWeight === '' || game.complexity >= Number(maxWeight);
      const matchesType = type === '' || game.type === type;

      const matchesPrice = Number(game.msrp) <= maxPrice;

      return matchesKeyword && matchesPlayers && matchesWeight && matchesType && matchesPrice;
  })

  const itemsPerPage = 5;

  const indexOfLastItem = homePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentHomeItems = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalHomePages = Math.ceil(filteredGames.length / itemsPerPage);

  const handleAddToWishList = (game) => {
    setWishList([...wishList, game]);
    setNotification(`Added "${game.title}" to your wish list!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  }

  const handleRemoveFromWishList = (game) => {
    const updatedWishList = wishList.filter((item) => item.id !== game.id);
    setWishList(updatedWishList);
    setNotification(`Removed "${game.title}" from your wish list!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  }
  const handleRemoveFromCollection = (gameToRemove) => {
    const updatedCollection = collection.filter((item) => item.id !== gameToRemove.id);
    setCollection(updatedCollection);
    setNotification(`Removed "${game.title}" from your collection!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  }

    const handleAddToCollection = (gameToAdd) => {
      const alreadyOwned = collection.some((game) => game.id === gameToAdd.id);

      if (!alreadyOwned) {
        setCollection([...collection, gameToAdd]);
      } else {
        alert("You already have this game in your collection");
      }
      setNotification(`Added "${gameToAdd.title}" to your collection!`);
      setTimeout(() => {
        setNotification('');
      }, 3000);
    };

  useEffect(() => {
        if (homePage > totalHomePages) {
            if (totalHomePages > 0) {
            setHomePage(totalHomePages);
            } else {
                setHomePage(1);
            }
        }
    }, [totalHomePages]);

  useEffect(() => {
    localStorage.setItem('boardGameWishList', JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem('dashboardLocation', location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('boardGameCollection', JSON.stringify(collection));
  }, [collection]);

  const handleResetFilters = () => {
      setSearchQuery('');
      setPlayerCount('');
      setMaxWeight('');
      setType('');
      setMaxPrice(200);
  }

  
    // --Render-- 

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <header className="mb-10 text-center md:text-left">
        <div className="flex gap-7 border border-slate-300 p-3 justify-center mb-3">
          <button 
            onClick={(e) => setLocation('home')} 
            className={`hover:text-amber-400 ${location === 'home' && 'p-2 border-b-2 border-amber-400'}`}>
              Home
          </button>
          <button 
            onClick={(e) => setLocation('wishList')} 
            className={`hover:text-amber-400 ${location === 'wishList' && 'p-2 border-b-2 border-amber-400'}`}>
              Wish List
          </button>
          <button 
            onClick={(e) => setLocation('myCollection')} 
            className={`hover:text-amber-400 ${location === 'myCollection' && 'p-2 border-b-2 border-amber-400'}`}>
              My Collection
          </button>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          GameShelf API Dashboard
        </h1>
      </header>

      <FilterControls 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        playerCount={playerCount} 
        setPlayerCount={setPlayerCount} 
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
        type={type} 
        setType={setType} 
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        handleResetFilters={handleResetFilters} 
      />

      {location === 'home' && (
        <>
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentHomeItems.map((game) => (
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
                    <div>💲 Price: ${game.msrp}</div>
                  </div>
                  
                  <div className="flex justify-between mt-5">
                    
                    <button
                      onClick={() => handleAddToWishList(game)}
                      className="bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded border border-slate-600 transition-colors duration-150 shadow-xs"
                    >
                        + Add to Wish List
                    </button>
                    <button
                      onClick={() => handleAddToCollection(game)}
                      className="bg-slate-700 hover:bg-amber-500 text-slate-100 hover:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded border border-slate-600 transition-colors duration-150 shadow-xs"
                    >
                        + Add to My Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
          </main>

          <PaginationControls 
            currentPage={homePage} 
            setCurrentPage={setHomePage} 
            totalPages={totalHomePages} 
          />
        </>
      )}

      {location === 'wishList' && (
        <WishList 
          wishList={filteredGames} 
          setWishList={setWishList}
          onRemoveGame={handleRemoveFromWishList} 
        />
      )}  
        
      {location === 'myCollection' && (
          <MyCollection 
            collection={collection}
            onRemoveGame={handleRemoveFromCollection}
          />
      )}


      {notification && (
        <div className="fixed bottom-5 right-5 bg-amber-500 text-slate-900 font-bold px-4 py-3 rounded-lg shadow-2xl border border-amber-400 animate-bounce transition-all duration-300">
          🚀 {notification}
        </div>
      )}
    </div>
  );
}

export default App;