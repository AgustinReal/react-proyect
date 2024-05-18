import { useAppDispatch } from "./store";
import { deleteUserById, UserId, addNewUser } from "../store/users/slice";

export const useUserActions = () =>
{
    const dispatch = useAppDispatch();

    const addUser = ({name, email, github}: any) =>{
        dispatch(addNewUser({name, email, github}))
    }

    const removeUser = (id: UserId) =>{
      dispatch(deleteUserById(id));
    }

    return {removeUser, addUser};
}