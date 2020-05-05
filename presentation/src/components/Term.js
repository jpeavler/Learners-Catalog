import React from 'react';

const Term = ({term}) => {
    return (
        <div className ='term'>
            <h4>{term.name}</h4>
            <p>Definition: {term.definition}</p>
            <p>Resources: {term.resources}</p>
            
        </div>
    )
}
export default Term;