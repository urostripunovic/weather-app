import React from 'react'
import ReactLoading from 'react-loading';
import "./App.css"

export default function LoadingScreen() {

    return (
        //Ändra color så att den är beroende av dag eller natt
        <div className='content loading-screen'>
            <ReactLoading type={"spin"} height={'25%'} width={'25%'} />
        </div>
    )
}
