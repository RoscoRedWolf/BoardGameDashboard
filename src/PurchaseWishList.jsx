import { useState, useEffect } from 'react';
import PaginationControls from './PaginationControls';

function PurchaseWishList({ wishList, setWishList, onRemoveGame }) {
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200);
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredCatalog = wishList.filter((game) => {
        const matchesKeyword = game.title.toLowerCase().includes(query.toLowerCase());
        
        const gamePrice = Number(game.msrp || 0);
        const matchesMinPrice = gamePrice >= minPrice;
        const matchesMaxPrice = gamePrice <= maxPrice;

        return matchesKeyword && matchesMinPrice && matchesMaxPrice;
    })

    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentDisplayItems = filteredCatalog.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCatalog.length / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            if (totalPages > 0) {
            setCurrentPage(totalPages);
            } else {
                setCurrentPage(1);
            }
        }
    }, [totalPages]);

    return (
        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                My Wish List
            </h2>
            
            <div className="flex flex-col gap-3 mb-6 bg-slate-900 p-4 rounded-lg border border-slate-750">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Game title (e.g., Root, Everdell)..." 
                        className="bg-slate-850 text-slate-100 p-2 rounded border border-slate-700 focus:outline-none focus:border-amber-400 md:col-span-2 text-sm" 
                    />

                    <div className="bg-slate-850 p-4 rounded-lg border border-slate-700/50 mb-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-3">
                        Filter Catalog by Price Range
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
													<div className="flex justify-between text-xs text-slate-400 mb-1">
															<span>Max Price</span>
															<span className="text-amber-400 font-medium">${maxPrice}</span>
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
                    </div>
                    </div>
                </div>
            </div>

            <ul className="space-y-3">
            {currentDisplayItems.map((game) => (
                <li key={game.id} className="p-4 bg-slate-900 rounded-lg border border-slate-700 flex justify-between items-center">
                    <div>
                        <span className="font-bold text-slate-100">{game.title}</span>
                        {game.msrp && (
                        <span className="ml-3 text-amber-400 font-medium">${game.msrp}</span>
                        )}
                        <div className="text-xs text-slate-400 mt-1">🎲 {game.type} | 👥 {game.minPlayers}-{game.maxPlayers} players</div>
                    </div>
										<div>
											<button 
												onClick={() => onRemoveGame(game)}
												className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors">
													Remove
											</button>
										</div>
                </li>
            ))}
            </ul>

            <PaginationControls 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalPages={totalPages} 
            />
        </div>        
    )
}

export default PurchaseWishList;