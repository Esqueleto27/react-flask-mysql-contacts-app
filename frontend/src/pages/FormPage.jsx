import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import api from "../services/api";

function FormPage() {
  // 🔹 Inicializamos React Hook Form
  const { register, handleSubmit } = useForm();

  // 🔹 Función que se ejecuta al enviar el form
  const onSubmit = async (data) => {
    try {
      const response = await api.post("/guardar", data);
      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col">
            {/* 🔹 IMPORTANTE: handleSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 🔹 INPUT NOMBRE */}
              <div className="mb-3">
                <label>Nombres</label>
                <input
                  className="form-control"
                  placeholder="Nombres"
                  type="text"
                  {...register("nombre")}
                />
              </div>

              {/* 🔹 INPUT EMAIL */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                />
              </div>

              {/* 🔹 INPUT NUMERO */}
              <div className="mb-3">
                <label>Número</label>
                <input
                  className="form-control"
                  placeholder="Número"
                  type="text"
                  {...register("numero")}
                />
              </div>

              {/* 🔹 BOTÓN */}
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPage;
