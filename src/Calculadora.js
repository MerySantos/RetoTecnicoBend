import React from 'react';
import './css/style.css'; 
import {getClick} from './actions';

const Display = (props) => {
    return (
      <div id="display-container">
        <div id="list-result">
            {
                props.list.map ( (item, index) => {
                return <div id={item.id} key = {index} className="result" >{item.conlist}</div>
                })
            }  
        </div>
        <div id="all-result-view">
            <p id="calculation">{props.calculation}</p>
            <p id="display">{props.result}</p>
        </div>
      </div>
    );
}

const Button = (props) => {
    return (
      <button 
      className={`button ${props.button.type}`} 
      id={props.button.id} 
      onClick={(e) => props.onClick(e, props.button)}
      style={{gridArea: props.button.id}}
      >
        {props.button.value}
      </button>
    );
  }



  const Calculator = ({ list, result, calculation, buttons }) => {
    return (
        <div id="calculator">
            <Display list={list} result={result} calculation={calculation} />
            {
                buttons.map( button => 
                <Button 
                    button={button} 
                    key={button.id}
                    onClick={getClick}
                /> )
            }
        </div>
        
        )
}

export default Calculator;