import React from 'react'
import {Outlet} from 'react-router-dom'

const IniciarSesion = () => {
  return (
    <div>
        <h1>Inicial Sesión</h1>
        <Outlet />
    </div>
  )
}

export default IniciarSesion