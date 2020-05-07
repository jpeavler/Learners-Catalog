import React, {useState} from 'react';
import AddResource from './AddResource';

const Term = ({term, deleteTerm, updateTerm, archiveTerm, restoreTerm, refresh}) => {
    const removeRes = (index) => {
        const tempArr = term.resources;
        tempArr.splice(index, 1);
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog/${term._id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({resources:tempArr})
        }).then(refresh)
    }
    const displayResources = term.resources.map((resource, index) => {
        return(
            <li key={index}><a href={resource.link}>{resource.displayName}</a>
                <button onClick={() => removeRes(index)}>Remove Resource</button>
            </li>
        )
    });
    let deleteButton;
    let archiveButton;
    let updateButton;
    if(term.archived) {
        deleteButton = <button onClick={() => deleteTerm(term._id)}>Delete Term</button>
        archiveButton = <button onClick={() => restoreTerm(term._id)}>Restore Term</button>
    } else{
        archiveButton = <button onClick={() => archiveTerm(term._id)}>Archive Term</button>
        updateButton = <button onClick={() => updateTerm(term)}>Update</button>
    }
    return (
        <div>
            <h3>{term.name}</h3>
            <p>Definition: {term.definition}</p>
            {archiveButton}
            {deleteButton}
            {updateButton}
            <h4>Resources for {term.name}</h4>
            <AddResource term ={term}
            id={term._id} 
            refresh={refresh}/>
            <ul>{displayResources}</ul>
        </div>
    )
}
export default Term;