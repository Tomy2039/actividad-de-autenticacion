import './style.css' 
import { indexPage } from "./pages/index.js";
import { loginPage } from "./pages/login.js";
import { Header } from './components/header.js';
import { registerPage } from './pages/register.js';
import { homePage } from './pages/home.js';

const pathname = window.location.pathname;

const $app = document.querySelector('#app');

$app.appendChild(Header())

if (pathname === '/') $app.appendChild(indexPage())
if (pathname === '/login') $app.appendChild(loginPage())
if (pathname === '/register') $app.appendChild(registerPage())
if (pathname === '/home') $app.appendChild(homePage())

(async () => {
    const response = await fetch('http://localhost:4000/session', {
        method: 'GET',
        credentials: 'include' // Importante para enviar las cookies de sesión
    })

    console.log({ response })


    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-name').innerText = data.user.username;
    } else {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/home';
    }
})();


// Manejar el cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
    })
    
    if (!response.ok) {
        throw new Error('Error al cerrar sesión');
    } else {
        window.location.href = '/home';
    }
});

(async () => {
    const response = await fetch('http://localhost:4000/session', {
        method: 'GET',
        credentials: 'include' // Importante para enviar las cookies de sesión
    })

    console.log({ response })


    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-name').innerText = data.user.username;
    } else {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/home';
    }
})();


// Manejar el cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
    })
    
    if (!response.ok) {
        throw new Error('Error al cerrar sesión');
    } else {
        window.location.href = '/home';
    }
});
