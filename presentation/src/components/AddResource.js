import React, {useState} from 'react';

const AddResource = ({refresh, term, id}) => {
    const [resources, setRes] = useState(term.resources)
    const [link, setLink] = useState('');
    const [displayName, setDisName] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const tempArr = resources;
        tempArr.push({link, displayName});
        setRes(tempArr);
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({resources})
        }).then(refresh);
    }
    return (
        <form onSubmit = {handleSubmit}>
            <input value={link} 
                type='text'
                onChange={({target}) => setLink(target.value)}
                placeholder='Source Link'/>
            <input value={displayName} 
                type='text'
                onChange={({target}) => setDisName(target.value)}
                placeholder='Source Name'/>
            <input type='submit'
                value='Add Resource'/>
        </form>
    )
}

export default AddResource