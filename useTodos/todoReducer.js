
export const todoReducer = ( initialState = [], action ) => {
    // Recibe como argumentos el estado inicial 'state' y 'action' que son las acciones que van a cambiar el estado
    switch ( action.type ) {
        // Si se cumple el case, se muestra el return, sino, se muestra el estado inicial
        case '[TODO] Add Todo':
            return [ ...initialState, action.payload ]; // En el 'action.payload' tenemos el nuevo 'todo' que se lo añadimos al estado inicial sin sobreescribirlo

        case '[TODO] Remove Todo':
            // Filter regresa un nuevo arreglo
            return initialState.filter( todo => todo.id !== action.payload ); //  Vamos  regresar todos los todos siempre y cuando el id sea diferente del todo.id que recibe el payload
        
            case '[TODO] Complete Todo':
            // Filter regresa un nuevo arreglo
            return initialState.map( todo => {
                // Si todo.id es igual al que recibe del todo, entonces retorna el objeto y el done con el valor contrario al que tenía (true o false)
                if( todo.id === action.payload ) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });
        default:    
            return initialState;
    }


} 