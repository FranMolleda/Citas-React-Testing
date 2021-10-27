import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import Formulario from '../components/Formulario'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn()

test('<Formulario/>, Cargar el formulario y revisar que todo sea correcto', () => {
    /*Con esto a continuación podemos ver que el componente se ha montado correctamente y su estructura html*/
    // const wrapper = render(<Formulario/>)
    // wrapper.debug()

    //La función render() es obligatoria
    render(<Formulario crearCita={crearCita}/>)
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

test('<Formulario/> Validación de Formulario', () =>{
    render(<Formulario crearCita={crearCita}/>)

    //Click en el botón de submit
    const btnSubmit = screen.getByTestId('btn-submit')
    fireEvent.click(btnSubmit)

    //Revisar por la alerta
    const alerta = screen.getByTestId('alerta')
    expect(alerta).toBeInTheDocument()
    expect(alerta.tagName).toBe('P')
    expect(alerta.textContent).toBe('Todos los campos son obligatorios')

})

test('<Formulario/> Validación de formulario', ()=>{
    render(<Formulario crearCita={crearCita} />)

    //Utilizamos fireEvent ahora para testear si escribimos en el formulario, está obsoleto
    //Al metodo change le pasamos 2 argumentos, primero el elemento donde escribiremos (utilizando el data-testid) y segundo qué queremos escribir
    fireEvent.change(screen.getByTestId('mascota'),{
        target: {value: 'Hook'}
    })

    //En lugar de fireEvent, vamos a utilizar userEvent
    userEvent.type(screen.getByTestId('propietario'), "Fran")
    userEvent.type(screen.getByTestId('fecha'), "2021-09-10")
    userEvent.type(screen.getByTestId('hora'), "10:30")
    userEvent.type(screen.getByTestId('sintomas'), "Solo duerme")

    //Click en el botón de submit
    const btnSubmit = screen.getByTestId('btn-submit')
    userEvent.click(btnSubmit)

    //Revisar por la alerta
    //Como la alerta está dentro de un condicional, en lugar de screen.getByTestId vamos a utilizar queryByTestId
    const alerta = screen.queryByTestId('alerta')
    expect(alerta).not.toBeInTheDocument()

    //Crear Cita y comprobar que la función se haya llamado
    expect(crearCita).toHaveBeenCalled()
    expect(crearCita).toHaveBeenCalledTimes(1)
    
})
