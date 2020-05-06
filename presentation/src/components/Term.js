import React, {useState} from 'react';

const Term = ({term, deleteTerm, updateTerm, archiveTerm}) => {
    const displayResources = term.resources.map((resource, index) => {
        return(
            <li key={index}><a href={resource.link}>{resource.displayName}</a></li>
        )
    });
    let deleteButton;
    let archiveButton;
    if(term.archived) {
        deleteButton = <button onClick={() => deleteTerm(term._id)}>Delete Term</button>
        archiveButton = <button>Restore Term</button>
    } else{
        archiveButton = <button onClick={() => archiveTerm(term._id)}>Archive Term</button>
    }
    return (
        <div>
            <h3>{term.name}</h3>
            <p>Definition: {term.definition}</p>
            <h4>Resources for {term.name}</h4>
            <ul>{displayResources}</ul>
            {archiveButton}
            {deleteButton}
            <button onClick={() => updateTerm(term)}>Update</button>
        </div>
    )
}
export default Term;