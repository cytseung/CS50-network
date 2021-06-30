import React from 'react'


const Paginator = ({ previousPage, nextPage, currentPage, setCurrentPage }) => {
    return (
        <div>
            {previousPage ? <button onClick={()=>setCurrentPage(currentPage-1)}>Back</button> : null}
            {nextPage ? <button onClick={()=>{setCurrentPage(currentPage+1)}}>Next</button> : null}
        </div>
    )
}

export default Paginator
