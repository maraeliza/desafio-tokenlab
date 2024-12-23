const InputField = ({ icon, name, value, setValue, Input, setFocado}) => {
  return (
    <div className="input-wrapper">
      <i className="material-symbols-outlined">{icon}</i>
      <Input value={value} setValue={setValue} name={name} setFocado={setFocado}/>
      <label className="input-label">{name.toUpperCase()}        
      </label>
    </div>
  );
};
export default InputField;
