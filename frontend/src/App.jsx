import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importacion de paginas
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/formpage" element={<FormPage />}></Route>
          <Route path="/listpage" element={<ListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
