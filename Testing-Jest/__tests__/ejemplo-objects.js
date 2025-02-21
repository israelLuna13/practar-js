const cliente ={
    nombre:'Israel',
    balance:600
}

describe('Testing al cliente',()=>{
    test('El cliente es premium',()=>{
        expect(cliente.balance).toBeGreaterThan(500)
    })

    test('Es israel',()=>{
        expect(cliente.nombre).toBe('Israel')
    })

    test('No es otro cliente', ()=>{
        expect(cliente.nombre).not.toBe('Pedro')
    })

    test('No es 600', ()=>{
        expect(cliente.nombre).not.toBe(500)
    })
})