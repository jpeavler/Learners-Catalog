import React, {useState} from 'react';

const AddTerm = ({refresh}) => {
    const [name, setName] = useState('');
    const [definition, setDef] = useState('');
    const [resources, setRes] = useState([]);
    const [link, setLink] = useState('');
    const [displayName, setDisName] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();
        const tempArr = resources;
        tempArr.push({link, displayName});
        setRes(tempArr);
        const archived = false;
        const term = {name, definition, resources, archived};
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog`, {
            method: 'POST',
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
                placeholder='Source Link'
                required/>
            <input value={displayName} 
                type='text'
                onChange={({target}) => setDisName(target.value)}
                placeholder='Source Name'
                required/>
            <input type='submit'
                value='Add to Catalog'/>
        </form>
    )
}

export default AddTerm;