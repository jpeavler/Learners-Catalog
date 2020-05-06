import React from 'react';

const Term = ({term, deleteTerm, updateTerm}) => {
    const displayResources = term.resources.map((resource, index) => {
        return(
            <li key={index}><a href={resource.link}>{resource.displayName}</a></li>
        )
    });
    let deleteButton;
    if(term.archived) {
        deleteButton = <button onClick={() => deleteTerm(term._id)}>Delete</button>
    }
    return (
        <div>
            <h3>{term.name}</h3>
            <p>Definition: {term.definition}</p>
            <h4>Resources for {term.name}</h4>
            <ul>{displayResources}</ul>
            {deleteButton}
            <button onClick={() => updateTerm(term)}>Update</button>
        </div>
    )
}
export default Term;