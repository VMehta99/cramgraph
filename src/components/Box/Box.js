import './Box.css';

function Box(props) {
  
  return (
    <div className='box'>
      <p className='value'>{props.value} <span className='metric'>{props.metric}</span></p>
      <p className='sub-heading'>{props.timemetric} {props.timevalue}</p>
    </div>
  );
}

export default Box;
