import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  faTimes,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";


const InputVerified = ({
  icon,
  name,
  value,
  setValue,
  Input,
  legenda,
  validar
}) => {
  const [focado, setFocado] = useState(false);
  const [validado, setValidado] = useState(false);

  useEffect(() => {
    setValidado(validar(value));
  }, [value]);

  return (
    <div className={`verified-wrapper ${focado ? "focused" : ""}`}>
      <div className="verified-wrapper-input">
        <div className="input-wrapper">
          <i className="material-symbols-outlined">{icon}</i>
          <Input
            value={value}
            setValue={setValue}
            name={name}
            setFocado={setFocado}
          />
          <label className="input-label">
            {name.toUpperCase()}
            <FontAwesomeIcon
              icon={faTimes}
              className={validado || !value ? "hide" : "show iconValid"}
              color="red"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validado && value ? "show iconValid" : "hide"}
              color="limegreen"
            />
          </label>
        </div>
        <div className="verified-wrapper-icon"></div>
      </div>

      <p
        id="note"
        className={focado && !validado ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        {legenda}
        <br />
      </p>
    </div>
  );
};
export default InputVerified;
