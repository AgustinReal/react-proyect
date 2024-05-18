import { type Middleware, configureStore} from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from './users/slice';
import { toast } from "sonner";

//Middleware
//Es una función que recupera la store, que tiene que devolver una función, que recupera un método next, que tiene que devolver
//una función que recupera método action.
//Cada función se ejecuta en una parte diferente

const persistanceLocalStorageMiddleware: Middleware = (store: any) => (next: any) => (action: any) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
}

const syncWithDataBase : Middleware = store => next => action => {
    const { type, payload } = action
    const previousState = store.getState() as RootState
    next(action)

    if(type === 'users/deleteUserById')
    {
        const userIdToRemove = payload
        const userToRemove = previousState.users.find(user => user.id === payload)

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE'
        }).then(res => {
            if(res.ok){
                toast.success(`Usuario ${payload} eliminado correctamente.`)
            }
            throw new Error('Error al eliminar el usuario.');
        }).catch(error =>{
            
            if(userToRemove) store.dispatch(rollbackUser(userToRemove))
                
            toast.error(`Error deleting use ${userIdToRemove}`);

            console.log(error);    
        })
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware).concat(syncWithDataBase),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch