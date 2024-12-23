import React from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
const setMask = (name) => {
  if (name.toLowerCase() == "cnpj") {
    return "99.999.999/9999-99";
  } else if (name.toLowerCase() == "cpf") {
    return "999.999.999-99";
  }
};
const MaskedInput = ({ value, setValue, name }) => {
  function handleChange(event) {
    setValue({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <InputMask
      name={name}
      mask={setMask(name)}
      value={value}
      onChange={handleChange}
      className="input-field"
      required
    />
  );
};

export default MaskedInput;
