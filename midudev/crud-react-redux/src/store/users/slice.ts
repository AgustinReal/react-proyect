import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jsx } from "react/jsx-runtime";

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Yazman Rodriguez",
        email: "yazmanito@gmail.com",
        github: "yazmanito"
    },
    {
        id: "2",
        name: "John Doe",
        email: "leo@gmail.com",
        github: "leo"
    },
    {
        id: "3",
        name: "Haakon Dahlberg",
        email: "haakon@gmail.com",
        github: "agustinreal"
    }
]   

export type UserId = string;

export interface User{
    name: string,
    email: string,
    github: string
}

export interface UserWithId extends User{
    id: UserId
}

//Funcion que se auto-invoca
const initialState: UserWithId[] = (() =>{
    const persistendState = localStorage.getItem("__redux__state__");

    if(persistendState) return JSON.parse(persistendState).users; //devuelve el valor de la storage

    return DEFAULT_STATE; //valor default
})();

//creando nuestra porcion
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>)=>{
            const id = crypto.randomUUID();
            return [...state, {id, ...action.payload}];
        },
        deleteUserById: (state, action: PayloadAction<UserId>) =>{
            const id = action.payload;
            return state.filter((user) => user.id !== id)
        }, 
        rollbackUser: (state, action: PayloadAction<UserWithId>) =>{
            console.log(action.payload.id) 
            state.filter(res =>{
                console.log(JSON.stringify(res))
            })
            const isUserAlreadyDefiend = state.some(user => user.id === action.payload.id)

            console.log(isUserAlreadyDefiend)
            if(isUserAlreadyDefiend){
                return [ ...state, action.payload]
            }
        }
    }
})

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;