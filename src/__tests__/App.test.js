import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'; 


test('<App/>,La aplicación funciona bien la primera vez', ()=>{
    
    //Esto lo hacemos para comprobar que se monta bien la aplicacion y luego lo borramos
    // const wrapper = render(<App/>)
    // wrapper.debug()

    render(<App/>)

    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument()
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes')
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1')

    expect(screen.getByText('Crear Cita')).toBeInTheDocument()
    expect(screen.queryByText('No hay citas')).toBeInTheDocument()

})

test('<App/>,Agregar una cita y título dinámico', ()=>{
    
    render(<App/>)


    userEvent.type(screen.getByTestId('mascota'), "Hook")
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

    //Revisar por el título dinamico
    expect(screen.getByTestId("titulo-dinamico").textContent).toBe('Administra tus Citas')
    expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe('No hay citas')




})

test('<App/>, Verificar las citas en el DOM', async()=>{
    
    render(<App/>)

    //Todos los find son asincronos por lo tanto hay que utilizar async await
    const citas = await screen.findAllByTestId("cita")

    //Snapshot crea un archivo (crea carpeta a la izquierda llamada snapshot) donde podemos ver y verificar su contenido. De esta manera podemos hacer más test a este contenido
    // expect(citas).toMatchSnapshot()

    expect(screen.getByTestId("btn-eliminar").tagName).toBe('BUTTON')
    expect(screen.getByTestId("btn-eliminar")).toBeInTheDocument()

    //Verificar alguna cita
    expect(screen.getByText('Hook')).toBeInTheDocument()

})


test('<App/>, Eliminar la cita', ()=>{
    
    render(<App/>)

    const btnEliminar = screen.getByTestId("btn-eliminar")
    expect(btnEliminar.tagName).toBe('BUTTON')
    expect(btnEliminar).toBeInTheDocument()

    //Simular el click
    userEvent.click(btnEliminar)

    //El botón ya no deberá estar
    expect(btnEliminar).not.toBeInTheDocument()

    //Lacita ya no debe estar 
    expect(screen.queryByText("Hook")).not.toBeInTheDocument()
    expect(screen.queryByTestId("cita")).not.toBeInTheDocument()
})