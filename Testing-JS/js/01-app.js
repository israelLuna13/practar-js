//testing

function suma(a,b){

    return a+b
}
function restar(a,b)
{
    return a-b
}

async function sumaAsync(a,b){
    return Promise.resolve(suma(a,b))
}

async function test(msj,callback){
    try{
        await callback();
        console.log(`El test ${msj} fue exitoso`);
        
    }catch(error){
        console.error('Error');
        console.error(error);
    }
}

function expected(esperado){
    return{
        toBe(resultado){
            if(resultado !== esperado)
                {
                    console.error(`El ${resultado} es diferente al esperado; la prueba no paso`);
                }else{
                    console.log('La prubea fue exitosa');
                }
        },
        toEqual(resultado){
           if (resultado !== esperado){
            console.error(`El ${resultado} no es igual a lo esperado`)

            }else{
                console.log('La prueba fue exitosa');
            }
        }
    }
}
//---------------------------------------
// let resultado = suma(1,2)
// let esperado = 12

// expected(esperado).toBe(resultado)

//  resultado = restar(5,2)
//  esperado = 3

// expected(esperado).toBe(resultado)
// expected(esperado).toEqual(resultado)
test('Suma 10 + 20 y el resultado es 30',async()=>{
    const resultado = await sumaAsync(10,20)
    const esperado = 31
    expected(esperado).toBe(resultado)
})

