export function setUser (usuario: any | null){
    return{
        type: 'Usuario',
        payload: usuario
    }
}