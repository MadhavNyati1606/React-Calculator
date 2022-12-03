import './styles.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}
function reducer(state, {type , payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === '0' && state.currentOperand === '0'){
        return state;
      }
      if(payload.digit === '.' && state.currentOperand.includes('.')){
        return state;
      }
      return{
        ...state,
        currentOperand : `${state.currentOperand||""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand == null){
         return state;
      }
      return{
        currentOperand: `${state.currentOperand.slice(0, state.currentOperand.length -1)}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state;
      }
      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return{
        ...state,
          operation: payload.operation,
          previousOperand: evaluate(state),
          currentOperand: null
      }
    case ACTIONS.EVALUATE:
      if(state.currentOperand == null && state.previousOperand == null){
        return state;
      }
      if(state.currentOperand == null){
        return state;
      }
      return{
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state)
      }
      
      default:
        return state;
  }
}

function evaluate({currentOperand, previousOperand, operation}){
  let prev = parseFloat(previousOperand);
  let current = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch(operation){
    case '+':
      computation = prev+current;
      break;
    case '-':
      computation = prev-current;
      break;
    case '*':
      computation = prev*current;
      break;
    case '/':
      computation = prev / current;
      break;
      default:
        computation = computation;
}
return computation.toString(); 
}


function App() {

  const [{currentOperand, previousOperand, operation} , dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
        </div>
        <button className='span-two' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationButton dispatch={dispatch} operation = "/"/>
        <DigitButton dispatch={dispatch} digit = '1'/>
        <DigitButton dispatch={dispatch} digit = '2'/>
        <DigitButton dispatch={dispatch} digit = '3'/>
        <OperationButton dispatch={dispatch} operation = "*"/>
        <DigitButton dispatch={dispatch} digit = '4'/>
        <DigitButton dispatch={dispatch} digit = '5'/>
        <DigitButton dispatch={dispatch} digit = '6'/>
        <OperationButton dispatch={dispatch} operation = "+"/>
        <DigitButton dispatch={dispatch} digit = '7'/>
        <DigitButton dispatch={dispatch} digit = '8'/>
        <DigitButton dispatch={dispatch} digit = '9'/>
        <OperationButton dispatch={dispatch} operation = "-"/>
        <DigitButton dispatch={dispatch} digit = '.'/>
        <DigitButton dispatch={dispatch} digit = '0'/>
        <button className='span-two' onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
