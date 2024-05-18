import { InputText } from "./formulario";
import { MyComponent } from "./listadoNotas";
import {TablaDeNotasCategoria} from "./tablaDeNotas";
import "./formulario.css"
import "./app.css"
import "./tablaDeNotas.css"
import "./listadoNotas.css"



export function App()
{
    return (
        <div className="container-components">
            <InputText />
            <MyComponent />
            <TablaDeNotasCategoria/>
        </div>
      
    );
}