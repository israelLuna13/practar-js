import Citas from "../js/classes/Citas";
const id = Date.now()

describe("Probar la clase de citas",()=>{

    const citas = new Citas()
    test('Agregar una nueva cita', ()=>{

    const citaObj = {
        id,
        mascota: 'hook',
        propietario: 'israel',
        telefono: '22222222',
        fecha: '10-20-2026',
        hora:'10:20',
        sintomas: 'jajajajjaja'
    }
    citas.agregarCita(citaObj)

    expect(citas).toMatchSnapshot()
    })

    test("actualizar cita", ()=>{
        const citaActualizada = {
            id:id,
            mascota: 'escubi',
            propietario: 'israel',
            telefono: '22222222',
            fecha: '10-20-2026',
            hora:'10:20',
            sintomas: 'jajajajjaja'
        }

        citas.editarCita(citaActualizada)
        expect(citas).toMatchSnapshot()
    })

    test("eliminar cita", ()=>{
      citas.eliminarCita(id)
      expect(citas).toMatchSnapshot()
    })
})