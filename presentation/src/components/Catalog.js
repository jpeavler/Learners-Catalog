import React, {useState, useEffect} from 'react';
import Term from './Term';
import AddTerm from './AddTerm'

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [isCreate, setIsCreate] = useState(true);
    const [displayArchived, setArchived] = useState(false);
    const [displayActive, setActive] = useState(true);

    useEffect(() => {
        getCatalog();
    }, []);

    const getCatalog = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog`)
            .then(response => response.json())
            .then(catalog => setCatalog(catalog))
            .then(() => setIsCreate(true));
    }
    const deleteTerm = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(getCatalog);
    }

    const displayCatalog = catalog.map((term) => {
        return <Term key = {term._id}
                term={term}
                deleteTerm={deleteTerm}/>
    });

    return(
        <div className='catalog'>
            <AddTerm/>
            {displayCatalog}
        </div>
    )
}

export default Catalog;