import { useCallback, useEffect, useState } from "react";

// Que se almacenen las peticiones a la api en caché de manera local, para no repetirlas innecesariamente
// No se exporta para que solo este hook tenga acceso a ello 
const localCache = {};


export const useFetch = ( url ) => {

    // Se crea el estado inicial 
   const [state, setState] = useState({
     data: null,
     isLoading: true,
     hasError: false,
     error: null,
   }) 

   // Cada vez que la url cambie, se restablecen los valores de inicio y se muestra el loading
   const setLoadingState = () => {
    setState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });
   };

   // Se hace la petición a la api. Se usa useCallback para memorizar getFetch y para para que no se vuelva a crear en cada render.
   const getFetch = useCallback (async() => {

    // Si ya se ha hecho la petición y está en localCache, entonces no se sigue ejecutando el código (es decir, no se repite la petición) porque se está trayendo del caché 
    if ( localCache[url] ) {
        console.log('Usando caché');
        setState({
            data: localCache[url],
            isLoading: false,
            hasError: false,
            error: null,
        });
        return; 
    }

      setLoadingState(); // hace que se muestre el loading

      const resp = await fetch( url );

      // sleep. Espera un tiempo marcado por nosotros antes de continuar
      await new Promise( resolve => setTimeout(resolve, 1500) ); 

      if ( !resp.ok ) {
        setState({
            data: null,
            isLoading: false,
            hasError: true,
            error: {
                code: resp.status,
                message: resp.statusText,
            }
        });
        return; // Si hay un error, no se ejecuta más código que este.
      };

      const data = await resp.json();
      setState({
        data: data,
        isLoading: false,
        hasError: false,
        error: null,
      });

      // Manejo del caché
      localCache[url] = data; // Almacenamos la data en caché

    //   console.log({ data });
   }, [url]);  // Solo se recreará si cambia la URL

   // Se pasa como parámetro getFetch para que esté atenta a cuando cambie y haga una nueva petición a la api
   useEffect(() => {
    getFetch();
  }, [getFetch]); 
   

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }
}
