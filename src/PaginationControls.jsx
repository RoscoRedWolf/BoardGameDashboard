

const PaginationControls = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="flex justify-between mt-5">
            <button
                className="disabled:opacity-50 cursor-pointer"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}>
                    Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button
                className="disabled:opacity-50 cursor-pointer"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}>
                    Next
            </button>
        </div>
    );
};

export default PaginationControls;