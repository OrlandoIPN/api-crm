import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
        <p className="mt-3 font-bold text-lg">Llena los siguientes campos pra registrar un cliente</p>
        <Formulario />
    </>
  )
}

export default NuevoCliente