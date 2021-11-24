import { useEffect, useState } from "react"

export const useDebouncedValue = ( input: string = '', time: number = 500 ) => {
    
    const [ debouncedValue , setDebouncedValue ] = useState(input);

    useEffect(() => {

        const timeOut = setTimeout(() => {

            setDebouncedValue( input );

        }, time);

        return () => {
            // Cada vez que cambia el input se ejecuta el Effect y esta función destruye el timeOut anterior
            clearTimeout( timeOut );
        }

    }, [ input ]);

    return debouncedValue;
}
