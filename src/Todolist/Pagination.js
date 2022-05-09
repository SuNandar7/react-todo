import React from 'react';

const Pagination = ({ postPerPage, totalPost, paginate, handleNext, handlePrevious, currentPage }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {

        pageNumbers.push(i);
    }

    return (


        <React.Fragment>
            <nav aria-label="Page navigation example" className="navpag">
                <ul className="pagination">
                    <li onClick={() => handlePrevious()}>
                        <a href="#seciton" aria-label="previous">

                            <button className="pagbtn">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" onClick={() => paginate(currentPage)} href="!#" className="link"><button className="pagbtn">{currentPage}</button></a>
                    </li>
                    <li onClick={() => handleNext()}>
                        <a href="#section" aria-label="next">
                            <button className="pagbtn">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>

                        </a>
                    </li>

                </ul>
            </nav>
        </React.Fragment>
    )
}
export default Pagination;
