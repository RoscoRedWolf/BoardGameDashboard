import { useState, useEffect } from 'react';
import PaginationControls from './PaginationControls';

function WishList({ wishList, setWishList, onRemoveGame }) {
    const [notes, setNotes] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentDisplayItems = wishList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(wishList.length / itemsPerPage);

		const handleClear = () => {
			const userConfirmed = window.confirm("Are you sure you want to clear your entire wishlist? : This action cannot be undone!");
			if (userConfirmed) {
				setWishList([])
			}
		}

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

					<div className="flex items-center justify-center mt-5">
						<button
							onClick={handleClear}
							className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
						>
							Clear Collection
						</button>
					</div>
      </div>
    )
}

export default WishList;