import React, { useEffect, useState } from 'react';
import '../EnlacesAtractivos.css';

const enlaces = [
    {
        nombre: 'Instagram',
        url: 'https://www.instagram.com/gabrielalopez185.art/',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
        key: 'instagram'
    },
    {
        nombre: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?phone=59898910659&text=Hola%20quiero%20m%C3%A1s%20informaci%C3%B3n%20del%20cuadro%20a%20la%20venta%20',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg',
        key: 'whatsapp'
    },
    {
        nombre: 'Pagina Web',
        url: 'https://arteparaelalma.mypixieset.com/',
        logo: 'https://cdn-icons-png.flaticon.com/512/841/841364.png',
        key: 'paginaweb'
    },
];

const SIMPLECOUNTER_VISITAS = "gabrielalopezart-visitas";
const SIMPLECOUNTER_LIKES = "gabrielalopezart-likes";

const EnlacesAtractivos = () => {
    const [visitas, setVisitas] = useState(0);
    const [likes, setLikes] = useState(0);
    const [clicks, setClicks] = useState({});

    useEffect(() => {
        // Contador de visitas global
        fetch(`https://api.simplecounter.io/v1/count?key=${SIMPLECOUNTER_VISITAS}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => setVisitas(data.count));

        // Obtener contador de likes
        fetch(`https://api.simplecounter.io/v1/get?key=${SIMPLECOUNTER_LIKES}`)
            .then(res => res.json())
            .then(data => setLikes(data.count || 0));

        // Obtener contador de clicks por enlace
        enlaces.forEach(enlace => {
            fetch(`https://api.simplecounter.io/v1/get?key=${SIMPLECOUNTER_VISITAS}-${enlace.key}`)
                .then(res => res.json())
                .then(data => {
                    setClicks(prev => ({ ...prev, [enlace.key]: data.count || 0 }));
                });
        });
    }, []);

    const handleLike = () => {
        fetch(`https://api.simplecounter.io/v1/count?key=${SIMPLECOUNTER_LIKES}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => setLikes(data.count));
    };

    const handleLinkClick = (key) => {
        fetch(`https://api.simplecounter.io/v1/count?key=${SIMPLECOUNTER_VISITAS}-${key}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                setClicks(prev => ({ ...prev, [key]: data.count }));
            });
    };

    return (
        <div className="enlaces-container">
            <h2>Gabriela Lopez Art</h2>
            <p>Visitas a esta página: {visitas}</p>

            <button onClick={handleLike} className="like-button">
                ❤️ Me gusta ({likes})
            </button>

            <ul className="enlaces-list">
                {enlaces.map((enlace, index) => (
                    <li key={index}>
                        <a
                            className="enlace-boton"
                            href={enlace.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick(enlace.key)}
                        >
                            <img
                                src={enlace.logo}
                                alt={enlace.nombre + " logo"}
                                className="enlace-logo"
                                style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }}
                            />
                            {enlace.nombre} ({clicks[enlace.key] || 0})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EnlacesAtractivos;
