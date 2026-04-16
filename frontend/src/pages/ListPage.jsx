import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ListPage() {
  // 🔹 Estado para guardar los datos
  const [contactos, setContactos] = useState([]);

  // 🔹 Se ejecuta cuando la página carga
  useEffect(() => {
    obtenerContactos();
  }, []);

  // 🔹 Función para pedir datos al backend
  const obtenerContactos = async () => {
    try {
      const response = await api.get("/contactos");
      setContactos(response.data);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="mt-4">Lista de Contactos</h2>

        {/* 🔹 Mostrar datos */}
        {contactos.map((contacto) => (
          <div key={contacto.id} className="card mt-3 p-3">
            <p>
              <strong>Nombre:</strong> {contacto.nombre}
            </p>
            <p>
              <strong>Email:</strong> {contacto.email}
            </p>
            <p>
              <strong>Número:</strong> {contacto.numero}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListPage;
