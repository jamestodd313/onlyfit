import {useState, useEffect} from 'react'

export const Filters = ({filterOptions, filters, setFilters, sortOptions, setSortBy, sortBy}) => {
    const [sortOpen, setSortOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [innerOpen, setInnerOpen] = useState(false)
    const [numOfFilters, setNumOfFilters] = useState(0)


    function changeSort(e){
        setSortBy(e.target.innerText)
        setSortOpen(false)
    }
    function updateFilters(e){
        let fltr = e.target
        let filtersref = [...filters,]
        if(fltr.classList.contains('selected')){
            fltr.classList.remove('selected')
            let i = filtersref.indexOf(e.target.innertext)
            filtersref.splice(i, 1);
            setFilters(filtersref)
        }else{
            fltr.classList.add('selected')
            filtersref.push(e.target.innerText)
            setFilters(filtersref)
        }
    }

    // function updateFilters(e){
    //     let currentFiltersRef = filters
    //     if(currentFiltersRef.includes(e.target.innerText.toLowerCase())){
    //         let i = currentFiltersRef.indexOf(e.target.innerText.toLowerCase())
    //         currentFiltersRef.splice(i, 1)
    //     }else{
    //         currentFiltersRef.push(e.target.innerText.toLowerCase())
    //     }
    //     setFilters(currentFiltersRef)
    // }
    return (
        <div className="view-controls">
            <div className="dropdown-container" onMouseLeave={e=>setSortOpen(false)}>
                <div className="dropdown-select" onClick={e=>setSortOpen(!sortOpen)} onKeyDown={e=> setSortOpen(!sortOpen)} tabIndex="0">
                    {sortBy}
                    <div className="arrow"/>
                </div>
                <ul className={sortOpen ? "dropdown-list" : "dropdown-list hidden"}>
                    {sortOptions.map(opt=>{
                        return(
                            opt.toLowerCase() !== sortBy.toLowerCase() ? <li tabIndex="0" key={opt} className="dropdown-option" onClick={changeSort}>{opt}</li> : null
                        )
                    })}
                </ul>
            </div>
            <div className="nested-menu-container">
                <div className="nested-menu-toggle" onClick={e=> setFiltersOpen(!filtersOpen)} tabIndex="0" onKeyDown={e=> setFiltersOpen(!filtersOpen)}>
                    Filters ({filters.length})
                    <img src="/icons/plus.svg" alt="" className="icon"/>
                </div>
                <menu className={filtersOpen ? "top-level-menu" : "top-level-menu hidden"}>
                    {filterOptions.map(opt=>{
                        return(
                            <div key={opt.title} className="top-level-menu-item">
                                <div className="top-level-menu-toggle" data-id={opt.title} onClick={e=> setInnerOpen(e.target.dataset.id)}>
                                    {opt.title}
                                    <div className="icon">+</div>
                                </div>
                                {innerOpen === opt.title ? (
                                    <ul className="nested-menu">
                                        {opt.options.map(opti=>{
                                            return(
                                                <li key={opti} className={filters.includes(opti) ? "dropdown-option selected" : "dropdown-option"} onClick={updateFilters}>{opti === 2 || opti === 3 || opti === 4 || opti === 5 ? `${opti} Stars` : opti === 1 ? `${opti} Star` : opti }</li>
                                            )
                                        })}
                                    </ul>
                                ) : null}

                            </div>
                        )
                    })}
                </menu>
            </div>
        </div>
    )
}
