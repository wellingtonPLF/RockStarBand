
const user = {
    isLoggedIn: undefined,
    active: false,
    auth_id: undefined,
    bornDate: '',
    email: '',
    id: undefined,
    nickName: '',
    phone: '',
}

export default function usuarioReducer(state = user, action: any){
    switch (action.type){
        case 'Usuario':
            return action.payload
        default:
            return state;
    }
}