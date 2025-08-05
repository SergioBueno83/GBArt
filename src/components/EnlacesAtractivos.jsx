import React from 'react';
import '../EnlacesAtractivos.css';

const enlaces = [
    {
        nombre: 'Instagram',
        url: 'https://www.instagram.com/gabrielalopez185.art/',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg'
    },
    {
        nombre: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?phone=59898910659&text=Hola%20quiero%20m%C3%A1s%20informaci%C3%B3n%20del%20cuadro%20a%20la%20venta%20',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg'
    },
    {
        nombre: 'Pagina Web',
        url: 'https://arteparaelalma.mypixieset.com/',
        logo: 'https://cdn-icons-png.flaticon.com/512/841/841364.png'
    },
];

const EnlacesAtractivos = () => (
    <div className="enlaces-container">
        <h2>Gabriela Lopez Art</h2>
        <ul className="enlaces-list">
            {enlaces.map((enlace, index) => (
                <li key={index}>
                    <a
                        className="enlace-boton"
                        href={enlace.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={enlace.logo}
                            alt={enlace.nombre + " logo"}
                            className="enlace-logo"
                            style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }}
                        />
                        {enlace.nombre}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

export default EnlacesAtractivos;