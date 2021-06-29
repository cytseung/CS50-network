import React from 'react'

const handleBack = () => {
    return null
}
const handleNext = () => {
    return null
}


const Paginator = ({ previousPage, nextPage }) => {
    return (
        <div>
            {previousPage ? <button onClick={handleBack}>Back</button> : null}
            {nextPage ? <button onClick={handleNext}>Next</button> : null}
        </div>
    )
}

export default Paginator
