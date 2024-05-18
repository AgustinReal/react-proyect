import { Button, Card, TextInput, Title, Badge } from "@tremor/react";
import { useUserActions } from '../hooks/useUserActions';
import { useState } from "react";

export function CreateNewUser()
{
    const{addUser} = useUserActions()
    const[result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handlerSubmit = (event: any) =>{
        event.preventDefault();

        setResult(null);

        const form = event.target;
        const formdate = new FormData(form);

        const name = formdate.get('name') as string;
        const email = formdate.get('email') as string;
        const github = formdate.get('github') as string;

        if(!name || !email || !github){
            return setResult('ko');
        }

        addUser({name, email, github});
        setResult('ok');
        form.reset();
    }

    return(
        <Card style={{marginTop: "16px"}}>
            <Title>Create New User</Title>

            <form onSubmit={handlerSubmit} action="" className="">
                <TextInput name="name" placeholder="Ingrese su nombre"/>
                <TextInput name="email" placeholder="Ingrese su email"/>
                <TextInput name="github" placeholder="Ingrese su usuario de github"/>

                <div>
                    <Button type="submit" style={{marginTop: '16px'}}> Crear Usuario</Button>
                    <span>
                        {result === 'ok' && <Badge color="green">Guardado correctamente</Badge>}
                        {result === 'ko' && <Badge color='red'>Error en los campos</Badge>}
                    </span>
                </div>
            </form>
        </Card>
    )
}