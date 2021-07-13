import React from 'react'
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import styles from './Paginator.module.css'

const Paginator = ({ previousPage, nextPage, currentPage, setCurrentPage }) => {
    return (
        <div>
            {previousPage ? <Button startIcon={<ArrowBackIosIcon/>} onClick={()=>setCurrentPage(currentPage-1)}>Back</Button> : null}
            {nextPage ? <Button className={styles.next} endIcon={<NavigateNextIcon/>} onClick={()=>{setCurrentPage(currentPage+1)}}>Next</Button> : null}
        </div>
    )
}

export default Paginator
