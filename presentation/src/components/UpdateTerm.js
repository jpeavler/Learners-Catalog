import React, {useState} from 'react';

const UpdateTerm = ({refresh, term, id}) => {
    const [name, setName] = useState(term.name);
    const [definition, setDef] = useState(term.definition);
    const [resources, setRes] = useState(term.resources);
    const [link, setLink] = useState(term.resources[0].link);
    const [displayName, setDisName] = useState(term.resources[0].displayName); 

    const handleSubmit = (event) => {
        event.preventDefault();
        const tempArr = resources;
        tempArr[0] = {link, displayName};
        setRes(tempArr);
        const term = {name, definition, resources};
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(term)
        }).then(refresh)
            .then(() => setName(''))
            .then(() => setDef(''))
            .then(() => setRes([]))
            .then(() => setLink(''))
            .then(() => setDisName(''));
    }

    return(
        <form onSubmit={handleSubmit}>
            <input value={name}
                type='text'
                onChange={({target}) => setName(target.value)}
                placeholder='Name of Term'
                required/>
            <textarea value={definition}
                type='text'
                onChange={({target}) => setDef(target.value)}
                placeholder='Definition'
                required/>
            <input value={link} 
                type='text'
                onChange={({target}) => setLink(target.value)}
                placeholder='First Source Link'/>
            <input value={displayName} 
                type='text'
                onChange={({target}) => setDisName(target.value)}
                placeholder='First Source Name'/>
            <input type='submit'
                value='Edit Term'/>
            <input type='button'
                value='Cancel Edit'
                onClick={refresh}/>
        </form>
    )
}

export default UpdateTerm;