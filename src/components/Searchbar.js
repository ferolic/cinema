import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [input, setInput] = useState('');
    const history = useNavigate();

    const onFormSubmit = (e) => {
      e.preventDefault();
      if(input.length === 0) return;
      setInput('');
      history(`/search/${input}`)
    };

     return (
        <form onSubmit={onFormSubmit}>
          <input 
            type='text' 
            onChange={(e) => setInput(e.target.value)} 
            value={input}
            placeholder='search for a movie'
          />  
          <button type='submit'> Search </button>
        </form>
    )
}

export default Searchbar
