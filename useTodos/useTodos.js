import { useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

 // Se crea el estado inicial 
 const initialState = [];
 
 // Se crea una constante init para coger los valores que se encuentren en el localStorage convirtiéndolos en un objeto de nuevo usando 'parse'
 // Esto es lo que se va a mostrar cuando se monte la aplicación, haciendo que siempre se muestren los valores que se encuentren en el localStorage
 const init = () => {
     return ( JSON.parse(localStorage.getItem('todos')) || [] ); 
 }  
 
 export const useTodos = () => {

    // 'init' es la función que inicializa nuestro reducer
        const [ todos, dispatch ] = useReducer( todoReducer, initialState, init ); // Se importa la función 'todoReducer' para pasarla como argumento 
    
        // Hacemos que se almacenen los datos en el localstorage, convirtiendo el objeto en strings, cada vez que se monta el componente o cambia la dependencia
        useEffect(() => {
            localStorage.setItem('todos', JSON.stringify( todos ) );
        }, [todos]);
    
        // Se crea una función para agregar un nuevo todo y se dispara el dispatch con el nuevo estado
        const handleNewTodo = ( todo ) => {
            // Se crea una acción para agregar el nuevo to-do al estado inicial  y la pasamos al reducer
            const action = {
                type: '[TODO] Add Todo',
                payload: todo,
            };
            dispatch(action); // Llamar al reducer con el estado inicial y la acción para actualizar el estado y obtener el nuevo estado
        };
    
        // Creamos la función para eliminar un todo
        const handleDeleteTodo = (id) => {
            // console.log(id);
            dispatch({
                type: '[TODO] Remove Todo',
                payload: id, // le pasamos solo el id del item en lugar del elemento entero a 'todoReducer'
            });
        };
    
        // Se encarga de marcar como completada una tarea 
        const handleToggleTodo = (id) => {
            // console.log(id);
            dispatch({
                type: '[TODO] Complete Todo',
                payload: id, // le pasamos solo el id del item en lugar del elemento entero a 'todoReducer'
            });
        };

     
        return {
            handleNewTodo,
            handleDeleteTodo,
            handleToggleTodo,
            todos, 
            todosCount: todos.length, // Se iguala al valor
            pendingTodosCount: todos.filter(todo => !todo.done).length, // Se iguala al valor
        }
 }
