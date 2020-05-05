import React, {useState, useEffect} from 'react';
import Term from './Term';

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [isCreate, setIsCreate] = useState(true);
    const [displayArchived, setArchived] = useState(false);
    const [displayActive, setActive] = useState(true);

    useEffect(() => {
        getCatalog();
    });

    const getCatalog = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog`)
            .then(response => response.json())
            .then(catalog => setCatalog(catalog))
            .then(() => setIsCreate(true));
    }

    const displayCatalog = catalog.map((term) => {
        return <Term key = {term._id}
                term={term}/>
    });

    return(
        <div className='catalog'>
            {displayCatalog}
        </div>
    )
}

export default Catalog;