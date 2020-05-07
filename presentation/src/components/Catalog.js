import React, {useState, useEffect} from 'react';
import Term from './Term';
import AddTerm from './AddTerm'
import UpdateTerm from './UpdateTerm'

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [isCreate, setIsCreate] = useState(true);
    const [termToUpdate, setUpdateTerm] = useState({});
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
    const updateTerm = (term) => {
        setIsCreate(false);
        setUpdateTerm(term);
    }
    const toggleArchive = (term, id) =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(term)
        }).then(getCatalog);
    }
    const archiveTerm = (id) => {
        const archivedTerm = {archived: true};
        toggleArchive(archivedTerm, id);
    }

    const restoreTerm = (id) => {
        const restoredTerm = {archived: false};
        toggleArchive(restoredTerm, id);
    }

    const renderForm = () => {
        let formToRender;
        if(isCreate){
            formToRender = <AddTerm key="createForm"refresh={getCatalog}/>
        }else{
            const data = termToUpdate;
            formToRender = <UpdateTerm key={data._id} 
                id={data._id} 
                term={data} 
                refresh={getCatalog}/>
        }
        return formToRender;
    }
    const displayCatalog = catalog.map((term) => {
        return <Term key = {term._id}
                term={term}
                deleteTerm={deleteTerm} 
                updateTerm={updateTerm} 
                archiveTerm={archiveTerm}
                restoreTerm={restoreTerm}/>
    });

    return(
        <div className='catalog'>
            {renderForm()}
            {displayCatalog}
        </div>
    )
}

export default Catalog;