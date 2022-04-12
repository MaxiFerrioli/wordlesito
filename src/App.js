import "./App.css";
import "./components/Darkmode/darkmode.css";
import React, { useState } from "react";
import Index from "./components";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useModal } from "./components/Modals/hooks/useModal";
import Modal from "./components/Modals/Modal";
import { HiAdjustments } from "react-icons/hi";
import "./components/Modals/Modal.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <section className="containerDM">
        <button
          className="btn-open-modal"
          onClick={openModal1}
          style={{
            backgroundColor: darkMode ? "#1a1919" : "white",
            color: darkMode ? "white" : "#1a1919",
          }}
        >
          <HiAdjustments />
        </button>
        <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
          <h3>Modo nocturno</h3>
          <div className="inputDM">
            <span
              className="iconDM"
              style={{ color: darkMode ? "grey" : "yellow" }}
            >
              ☀︎
            </span>
            <div className="switch-checkbox">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider round"> </span>
              </label>
            </div>
            <span
              className="iconDM"
              style={{ color: darkMode ? "#b96df7" : "grey" }}
            >
              ☽
            </span>
          </div>
        </Modal>

        <button
          className="btn-open-modal"
          onClick={openModal2}
          style={{
            backgroundColor: darkMode ? "#1a1919" : "white",
            color: darkMode ? "white" : "#1a1919",
          }}
        >
          <AiOutlineQuestionCircle />
        </button>
        <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
          <h3>CÓMO JUGAR</h3>
          <br></br>
          <p>
            Adivina la palabra oculta en seis intentos. Cada intento debe ser
            una palabra válida de 5 letras. Después de cada intento el color de
            las letras cambia para mostrar qué tan cerca estás de acertar la
            palabra. El color AMARILLO indica que la letra estan en la palabra
            pero NO en el orden correcto; el color VERDE nos muestra que la letra esta en la
            palabra y en el orden correcto y, por ultimo, el GRIS indica que la
            letra NO se encuentra en la palabra.
          </p>
        </Modal>
      </section>
      <Index />
    </div>
  );
};

export default App;
