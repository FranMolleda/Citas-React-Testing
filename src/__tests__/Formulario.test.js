import React from 'react';
import {render, screen} from '@testing-library/react'
import Formulario from '../components/Formulario'
import '@testing-library/jest-dom/extend-expect'

test('<Formulario/>, Cargar el formulario y revisar que todo sea correcto', () => {
    /*Con esto a continuación podemos ver que el componente se ha montado correctamente y su estructura html*/
    // const wrapper = render(<Formulario/>)
    // wrapper.debug()

    //La función render() es obligatoria
    render(<Formulario/>)
    //expect es lo que pasamos que quiera que ocurra o que no. Ejemplo:
    //expect(2+2).toBe(4)  --Pasaría el test--
    //expect (2+10).toBe(4) --No pasaría el test--

    //.toBeInTheDocument() es un metodo de '@testing-library/jest-dom/extend-expect' y por eso lo importamos
    expect(screen.getByText('Crear Cita')).toBeInTheDocument()

    //Heading
    expect(screen.getByTestId("titulo").tagName).toBe('H2')
    expect(screen.getByTestId("titulo").tagName).not.toBe('H1')
    expect(screen.getByTestId("titulo").textContent).toBe('Crear Cita')

    //Botón de  submit
    expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON")
    expect(screen.getByTestId("btn-submit").textContent).toBe("Agregar Cita")

} )
