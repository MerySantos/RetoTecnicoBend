import store from './store';

// EventListener
export function componentDidMount(){
    window.addEventListener("keydown", e => getKeyPress(e), false);
  }
export function componentWillUnmount(){
    window.removeEventListener("keydown", e => getKeyPress(e), false);
  }

export const getClick = (e, button) => {

      switch (button.type) {
        case "clear":
          getClear();
          break;
        case "number":
          getNumber(button.value);
          break;
        case "operator":
          getOperator(button.value);
          break;
        case "equals":
          getEquals(button.value);
          break;
        default:
          break;
      }
    // }
  }

  export const getKeyPress = (e) => {
    switch(e.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        getNumber(e.key);
        break;
      case "+":
      case "-":
      case "/":
        getOperator(e.key);
        break;
      case "*":
        getOperator(String.fromCharCode(215));
        break;
      case "=":
      case "Enter":
        e.preventDefault();
        getEquals("=");
        break;
      // case "Backspace": 
      //   getBackspace();
      //   break;
      default:
        break;
    }
    console.log("ingreso de teclas", e.key);
  }

  export const getClear = () => {
    store.setState({
      list: [],
      calculation: "",
      result: "0",
      reset: false
    });
  }

  export const getNumber = (value) => {
    const newReset = store.getState().reset;
    const newResult = store.getState().result;
    if (newReset) {
      store.setState({
        result: newResult === "0" ? "0" : value,
        calculation: "",
        reset: false,
      });
    } else {
        store.setState({
          result: newResult === "0" ? value : newResult + value,
        });
    }
  }

  export const getOperator = (value) => {
    const newReset = store.getState().reset;
    const newResult = store.getState().result;
    const newCalculation = store.getState().calculation;
    if (newReset) {
      store.setState({
        result: "0",
        calculation: `${newResult} ${value}`,
        reset: false,
      });
    } else {
      store.setState({
        calculation: 
          (['-', '+', '/', String.fromCharCode(215)].includes(newCalculation.slice(-1)) && !newResult) ? 
          `${newCalculation.slice(0, -1)} ${newResult} ${value}` : 
          `${newCalculation} ${newResult} ${value}`,
        result: "0"
      });
    }
  }

  export const getEquals = (value) => {
    let newList = [...store.getState().list];
    const newReset = store.getState().reset;
    const newResult2 = store.getState().result;
    const newCalculation = store.getState().calculation;
    if (!newReset) {
      // Calculo de operaciones
      const newCalc = (['-', '+', '/', String.fromCharCode(215)].includes(newCalculation.slice(-1)) && !newResult2) ? 
        `${newCalculation.slice(0, -1)} ${newResult2}` : 
        `${newCalculation} ${newResult2}`;

      const re = new RegExp(String.fromCharCode(215),"g"); 
      // Resultado Final
      const newResult = (+parseFloat(eval(newCalc.replace(re, '*'))).toFixed(10)).toString();
      
      // Historial
      const inputList = newList.concat({
        id: newList.length,
        conlist: `${newCalc} ${value} ${newResult}`,
      });


      store.setState({
        list: inputList,
        calculation: `${newCalc} ${value}`,
        result: newResult,
        reset: true,
      });
    }
  }

  // export const getBackspace = () =>{
  //   const newResult = store.getState().result;
  //   store.setState ({
  //     result: newResult.length > 1 ? 
  //             newResult.slice(0,-1) : 
  //             newResult.length === 1 ? 
  //             "0" : 
  //             ""                  
  //   });
  // }

  // export const getSign = () => {
  //   const newResult = store.getState().result;
  //   store.setState({
  //     result: !newResult || newResult === "0" ? 
  //             newResult : 
  //             newResult.slice(0, 1) === '-' ?
  //             newResult.slice(1) : 
  //             '-' + newResult
  //   });
  // }
