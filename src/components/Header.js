import React, { useState } from 'react'
import logo from '../img/logo_weather.svg'


function Header (props) {

    const { onSearch, noExist } = props
    const [cityText, setCityText] = useState('')

    const searching = async() =>{
        if (cityText.length < 3){
            onSearch('')
        }else{
            onSearch(cityText)
        }
    }
    const keyPressed = (e) =>{
        if(e.key === 'Enter'){
            searching()
        }
    }
    const onChange = (e) => {
        setCityText(e.target.value);
        if(e.target.value.length === 0){
            onSearch('');
        }
    }

  return (
    <header className='header container'>
        <img src={logo} alt="" className="logo" />

        <div className='searchBar'>
            <div className='search'>
                <input 
                    type="text"
                    onChange={onChange}
                    onKeyPress={keyPressed}
                    placeholder='Search city...'
                />
                <button onClick={ searching }><i className='bx bx-search-alt'></i></button>
            </div>
            <div className='notFoundSearch'>
                <p>{noExist ? 'City not found' : ' '}</p>
            </div>
        </div>
    </header>
  )
}

export default Header