const CustomInput = ({ name, setValue, setFocado={setFocado} }) => {
  return (
    <input
      type={"text"}
      name={name}
      className="input-field"
      required
      onChange={setValue}
      onFocus={()=>setFocado(true)}
      onBlur={() => setFocado(false)}
    />
  );
};
export default CustomInput;