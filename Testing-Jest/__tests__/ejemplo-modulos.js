import { suma } from "../js/funciones.js";

describe("suma de 2 numeros", ()=>{
    test("suma 10 y 20 son 30",()=>{
        expect(suma(10,20)).toBe(30)
    })
})