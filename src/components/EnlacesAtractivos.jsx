import React, { useEffect, useState } from 'react';
import '../EnlacesAtractivos.css';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const instagramUrl = import.meta.env.VITE_API_INSTAGRAM_URL;
const whatsappUrl = import.meta.env.VITE_API_WHATSAPP_URL;
const paginaWebUrl = import.meta.env.VITE_API_WEB_URL;




const enlaces = [
        {
        nombre: 'Pagina Web',
        url: `${paginaWebUrl}`,
        logo: 'https://cdn-icons-png.flaticon.com/512/841/841364.png',
        key: 'paginaweb'
    },
        {
        nombre: 'WhatsApp',
        url: `${whatsappUrl}`,
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg',
        key: 'whatsapp'
    },
        {
        nombre: 'Instagram',
        url: `${instagramUrl}`,
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
        key: 'instagram'
    },

];

const EnlacesAtractivos = () => {
    const [visitas, setVisitas] = useState(0);
    const [likes, setLikes] = useState(0);
    const [clicks, setClicks] = useState({});

    useEffect(() => {
        // Contador de visitas
        fetch(`${baseUrl}visitas`, { method: 'POST' })
            .then(res => res.json())
            .then(data => setVisitas(data.valor));

        // Obtener contador de likes
        fetch(`${baseUrl}likes`)
            .then(res => res.json())
            .then(data => setLikes(data.valor));

        // Obtener contador de clicks por enlace
        enlaces.forEach(enlace => {
            fetch(`${baseUrl}clicks/${enlace.key}`)
                .then(res => res.json())
                .then(data => {
                    setClicks(prev => ({ ...prev, [enlace.key]: data.valor }));
                });
        });
    }, []);

    const handleLike = () => {
        fetch(`${baseUrl}likes`, { method: 'POST' })
            .then(res => res.json())
            .then(data => setLikes(data.valor));
    };

    const handleLinkClick = (key) => {
        fetch(`${baseUrl}clicks/${key}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                setClicks(prev => ({ ...prev, [key]: data.valor }));
            });
    };

    return (
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
                            onClick={() => handleLinkClick(enlace.key)}
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
            <button onClick={handleLike} className="like-button">
                ❤️ Me gusta ({likes})
            </button>
            <div className="footer">
                <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #b8c1ec' }} />
                <p className="footer-title">¡Gracias por visitar mi página!</p>
                <p className="footer-desc">
                    Si te gusta mi trabajo, sígueme en <a href={enlaces[0].url} target="_blank" rel="noopener noreferrer">Instagram</a> o escríbeme por <a href={enlaces[1].url} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                </p>
                <p className="footer-copy">&copy; {new Date().getFullYear()} Gabriela Lopez Art</p>
            </div>
            
        </div>
    );
};

export default EnlacesAtractivos;
