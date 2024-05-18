import { Suspense, lazy } from 'react'

import './App.css'
import { HomePage } from './pages/Home'
import {AboutPage} from './pages/About' //import estático
import Page404 from './pages/Error404'
import SearchPage from './pages/Search'

import { Router } from './Routera'
import { Route } from './Route'

/*
  Paquetes instalados:
  npm install path-to-regexp -E

  Paquetes testing

  npm install vitest -D

  npm install happy-dom @testing-library/react -D
*/

const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const routes = [
  {
    // ruta dinámica 
    path: '/search/:query',
    Component: SearchPage
  }
]


function App() {

  //si no encuentra la ruta en (routes), este mostra el default
  return (
    <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Router routes={routes} defaultComponent={Page404}>
            <Route path='/' Component={HomePage}/>
            <Route path='/about' Component={AboutPage}/>
          </Router>
        </Suspense>
        
        {/* Técnica de renderizado condiccional (asi se hacian las paginas antes) */}
        {/* { currentPath === '/' && <HomePage/>}   ==> esto es:  http://localhost:5173 
        { currentPath === '/about' && <AboutPage/>} ==> esto es:  http://localhost:5173/about */}
    </main>  
  )
}

export default App
