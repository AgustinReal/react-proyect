import { Toaster } from 'sonner'
import './App.css'
import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'


/*
                               Paquetes Instalados:
  Componentes y style: 

  [ npm add @tremor/react -E ]==> Componentes Tremor

  Importar archivos tailwind y inciar tailwind
  npm add -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

  Redux Toolkit:

  npm install @reduxjs/toolkit react-redux -E

  Buen estructurado:
  https://dev.to/profydev/screaming-architecture-evolution-of-a-react-folder-structure-4g25

*/

function App() {

  return (
    <>
     <ListOfUsers/>
     <CreateNewUser/>
     <Toaster richColors/>
    </>
  )
}

export default App
