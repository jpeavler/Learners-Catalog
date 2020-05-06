import React from 'react';

const Term = ({term}) => {
    const displayResources = term.resources.map((resource, index) => {
        return(
            <li key={index}><a href={resource.link} >{resource.displayName}</a></li>
        )
    })
    return (
        <div>
            <h3>{term.name}</h3>
            <p>Definition: {term.definition}</p>
            <h4>Resources</h4>
            <ul>{displayResources}</ul>
        </div>
    )
}
export default Term;