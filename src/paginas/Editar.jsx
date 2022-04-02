import Formulario from "../components/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Editar = () => {


  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams(); //Hook que ayuda a ver los parametros que se les pasa al url
  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);



  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3 font-bold text-lg mb-4">
        Utiliza este formulario para editar datos de un cliente
      </p>
      
      {cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
      ): <p>Cliente ID no valido</p>}
    </>
  );
};

export default Editar;
