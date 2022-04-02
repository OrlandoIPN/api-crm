import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";
const Formulario = ({ cliente, cargando }) => {
  // estou pasando el prop de cliente para poder reUtilizar este form  es mejor hacer un nuevo formulario
  // pero en este caso nos complicaremos haciendo ediciones en uno solo

  const navigate = useNavigate();
  // SCHEMA un objeto que te dice que tiene toda la forma que vas a tener y que forma tendran esos campos
  //VALIDACION
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Numero no válido")
      .integer("Numero no válido")
      .typeError("Tel no válido"),
  });
  {
    /*typeError es como escribir el error */
  }

  const handleSubmit = async (values) => {
    //console.log(values)
    //aqui podemos enviar los datos por axios  o por fetch hacia una API o  un backend
    try {
      let respuesta
      if (cliente.id) {
        //EDITANDO UN REGISTRO
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        // si fetch lo colocas sin el objeto  por default te da un metodo get por eso no hace falta indicar el metodo
        // cada API tiene sus propias reglas checarlas para enviar datos
         respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // en algunos casos en los headers vas a mandar la authentificacion del ususario
            // ya si, si , entoncses ya puedes escribir en el servidor
          },
        });
      } else {
        const url = "http://localhost:4000/clientes";
        // si fetch lo colocas sin el objeto  por default te da un metodo get por eso no hace falta indicar el metodo
        // cada API tiene sus propias reglas checarlas para enviar datos
         respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // en algunos casos en los headers vas a mandar la authentificacion del ususario
            // ya si, si , entoncses ya puedes escribir en el servidor
          },
        });
      }

      console.log(respuesta);
      const resultado = await respuesta.json();
      console.log(resultado);
      navigate("/clientes");

    } catch (error) {
      console.log(error);
    }
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        // el "?" es como un ternario , lo va a buscar si tiene informacion , si es undefined dejalo como un  string vacio
        //en este caso cliente siempre existe por que esta como defaul prop pero se le pasa una propiedad para que evalue si tiene algo más
        initialValues={{
          nombre: cliente?.nombre ?? "",
          // otra opción es  --> nombre: cliente.nombre ? cliente.nombre:  "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        // formik tiene su propia forma de manejar el state  en este caso se inicia con un objeto
        // relacionado con el prop name

        enableReinitialize={true} //vuelve a ejecutar los valores de inicialValues y en este caso permite pintarlo en el input a la hora de inicial cliente, si lo quitas no se inicia
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values); //esto es para que espere y una vez se resuelva entonces is resetearlo
          resetForm(); //resetear formulario
        }}
        validationSchema={nuevoClienteSchema} //Propiedad que hace que uno define el schema dl form
      >
        {({ errors, touched }) => {
          // console.log(touched): cuando preciono adentro y afuera ese touch se ejecuta para hacer validaciones en tiempo real
          // puedes mandar entre llaves dat pero destructuramos errors para leerlos de una vez :console.log(data)
          return (
            // el arrow function va como requeriminento del formik
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />

                {/* 
              <ErrorMessage name="nombre"/>  
              componente que ayuda a mostrar el error generado 
              pero no se usa por que no te deja aplicarle clases, es mejor utilizar la destructuracion de errores
*/}

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
                {/* esto da el mismo comportamiento de arriba pero ya podemos darle clases */}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />

                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="email">
                  E-mail:{" "}
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />

                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="telefono">
                  Telefono:{" "}
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="notas">
                  Notas :{" "}
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

//Funcionan como parametros por default si no esta presente, toma estos, si está presente, toma los que estan arriba
// de esta forma le decimos a formik que solo se fije enlo que tiene o no tiene
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
