
const carrito = ['producto 1', 'producto 2', 'producto 3'];

describe('Testing al carrito de compras',()=>{
    test('probar que el array tenga 3 elementos',()=>{
        expect(carrito).toHaveLength(3)
    })

    test('Verificar que el carrito no este vacio', ()=>{
        expect(carrito).not.toHaveLength(0)
    })

})