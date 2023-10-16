import './TextInput.css';

function TextInput({placeholder,onInputChange}) {

  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <input style={{"width":placeholder.length *25 + "px"}} className='input' placeholder={placeholder}
      onChange={handleChange}></input>
  );
}

export default TextInput;
