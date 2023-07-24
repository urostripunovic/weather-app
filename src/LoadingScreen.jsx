import React from 'react'
import ReactLoading from 'react-loading';

export default function LoadingScreen() {

    return (
        //Ändra color så att den är beroende av dag eller natt
        <ReactLoading type={"spin"} height={'64px'} width={'64px'} />
    )
}
