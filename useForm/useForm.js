import { useState } from "react";


export const useForm = ( initialForm = {} ) => {
  
     // Mantener el estado
    // initialForm es un objeto que incluye los valores iniciales del formulario
     // Ahora el initialForm va a ser igual a los valores que le pasemos como argumento 
        const [ formState, setFormState ] = useState( initialForm ); 
        
    
        // Función para manejar el cambio en los inputs
        const onInputChange = ({ target }) => { // Desestructuramos 'value' para acceder al 'target'
            // console.log(event.target.value);// muestra los nuevos valores introducidos en el input
            const { name, value } = target; // Desestructuramos 'target' para acceder a 'name' y 'value'
            setFormState({
                ...formState, // Desestructuramos 'formState' para mantener todos los valores del formulario
                [ name ] : value // La propiedad 'name' va a ser igual al nuevo 'value' introducido en el input
            });
        };

        const onResetForm = () => {
            // Resetear el formulario, se usan los valores iniciales del formulario para cambiarlos     
            setFormState( initialForm );
        }

    return {
        ...formState, // Se copia el objeto entero, para poder extraer directamente los valores del formulario, como props, en el componente que lo usa, en este caso FormCustomHook
        formState, // Este es el objeto entero, hay que extraer los valores del formulario de él una vez pasado como prop.
        onInputChange,
        //setFormState, // Este es el método para modificar los valores del formulario, hay que usarlo dentro del componente que lo usa, en este caso FormCustomHook
        onResetForm  // Este es el método para resetear el formulario, hay que usarlo dentro del componente que lo usa, en este caso FormCustomHook
    }
}
