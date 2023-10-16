import { useEffect, useState } from 'react';
import './App.css';
import Box from './components/Box/Box';
import TextInput from './components/TextInput/TextInput';

function truncate(num){
    return Math.floor(num * 100) / 100;
}

function App() {

  const [items,setItems] = useState([]);
  const [inputValue, setInputValue] = useState({
    "action": "read",
    "total_amount": "300",
    "item_name": "pages",
    "time": "60",
    "time_type":"days",
    "percent":"1"
  });

  const handleInputChange = (value, type) => {
    setInputValue((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  };

  useEffect(()=>{
    generateItems(300,60,.01);
  },[]);


  function generateItems(total_items,days,change){
  
    let accum = 0;
    for(var n=0; n<days;n++){
        accum+=Math.pow(1-change,n);
    }
  
  
    let arr = [];
    for(var i=0;i<days;i++){
        let itemsInDay = truncate((total_items/accum)*Math.pow(1-change,i));
        arr.push(itemsInDay);
    }

    setItems(arr.reverse());
    
  }

  function onSubmit(){
    console.log(inputValue);
    generateItems(parseInt(inputValue["total_amount"]), parseInt(inputValue["time"]), parseInt(inputValue["percent"])/100)
  }


  return (
    <div className="App">
      
      <div className='logo'>cram.graph.</div>

      <div className='form-container'>
        <div className='container'>
          <div className='prompt-text' >I want to </div>
          <TextInput placeholder="read" onInputChange={(e)=>{handleInputChange(e, "action")}} ></TextInput>
          <TextInput placeholder="300" onInputChange={(e)=>{handleInputChange(e, "total_amount")}} ></TextInput>
          <TextInput placeholder="pages" onInputChange={(e)=>{handleInputChange(e, "item_name")}} ></TextInput>

          <div className='prompt-text'> in </div>
          <TextInput placeholder="60" onInputChange={(e)=>{handleInputChange(e, "time")}} ></TextInput>
          <TextInput placeholder="days" onInputChange={(e)=>{handleInputChange(e, "time_type")}} ></TextInput>
          <div className="percent-selection">
            <div className='prompt-text'> with a </div>
            <TextInput placeholder="1" onInputChange={(e)=>{handleInputChange(e, "percent")}} ></TextInput>
            <div className='prompt-text'>% <span>increase</span> per {inputValue['time_type'].slice(0,-1)}. </div>
          </div>
        </div>
        <div className='submit'>
          <div onClick={onSubmit} className='button'>lets go.</div>
        </div>
      </div>
      
      <div className='box-container'>
        {
          items.map((element,index) => {
            return <Box key={index} value={element} metric={inputValue['item_name']} timemetric={inputValue['time_type'].slice(0,-1)} timevalue={index+1}></Box>
          })
        }
      </div>

    </div>
  );
}

export default App;
