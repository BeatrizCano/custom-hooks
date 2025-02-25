import { useState } from "react";


export const useCounter = (initialValue = 10 ) => {

    const [ counter, setCounter ] = useState( initialValue );

    // 'value' se le asigna el valor en el componente que se utiliza, en este caso en 'CounterCustomHook'

    const increment = ( value = 1 ) => {
        setCounter( (current) => current + value ); // En lugar de llamar al valor inicial del contador(counter), llamamos al valor actual del contador (current)
    } 

    const decrement = ( value = 1 ) => {
        if ( counter === 0 ) return; // Para que no sea nunca menor de cero
        setCounter( (current) => current - value );
    }

    const reset = () => {
        setCounter( initialValue );
    } 

  return {
    counter,
    increment,
    decrement,
    reset
  }
}
