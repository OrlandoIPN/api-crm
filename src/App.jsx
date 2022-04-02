import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import LoginForm from './paginas/LoginForm.jsx'
import NuevoCliente from './paginas/NuevoCliente'
import Editar from './paginas/Editar'
import VerCliente from './paginas/VerCliente'


function App() {
    
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas anidadas o nested routes */}
        {/*este lo detecta como un grupo de rutas anidadas y que perteneces a esta ruta*/}
        {/* <Route path='/' element={<IniciarSesion />}>
          <Route index element={<LoginForm />} />
        </Route> */} 

        {/* EN ESTE PROYECTO NO VAMOS A REQUERIR EL LOGIN FORM NI EL INICIAR SESION PERO CASI SIEMPRE SE USAN */}


        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Inicio />} />
          {/* ruta : /clientes/nuevo */}
          <Route path='nuevo' element={<NuevoCliente />} />  
          {/* en react router puedes agregar un placeholder de /:id y va a estar escuchando  por el id */}
          <Route path='editar/:id' element={<Editar />} /> 
           {/*Al tener los dos puntos al inicio lo va a tratar como variable  */}
          <Route path=':id' element={<VerCliente />} />  
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App
