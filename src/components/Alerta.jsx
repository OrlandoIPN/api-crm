import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className="text-center my-4 bg-red-500 text-white font-bold p-3 uppercase">
            {children}
        </div>
    )
}

export default Alerta