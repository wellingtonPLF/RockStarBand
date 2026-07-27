import { useState } from 'react';
import styles from "./cookiePreferencesStyle.module.css"

const categories = [
    {
        id: 'privacy',
        label: 'A sua privacidade',
        title: 'A sua privacidade',
        description: 'Quando visita este website, ele pode armazenar ou recolher informações no seu navegador, principalmente na forma de cookies. Esta informação pode ser sobre si, as suas preferências ou o seu dispositivo, e é utilizada principalmente para fazer o website funcionar conforme o esperado. A informação normalmente não o identifica diretamente, mas pode dar-lhe uma experiência web mais personalizada. Uma vez que respeitamos o seu direito à privacidade, pode optar por não permitir alguns tipos de cookies. Clique nos cabeçalhos das diferentes categorias para saber mais e alterar as nossas configurações predefinidas. No entanto, o bloqueio de alguns tipos de cookies pode afetar a sua experiência no website.',
    },
    {
        id: 'essential',
        label: 'Cookies obrigatórios',
        title: 'Cookies obrigatórios',
        description: 'Estes cookies são necessários para o funcionamento do website e não podem ser desligados. São geralmente definidos apenas em resposta a ações levadas a cabo por si, como preferências de privacidade, início de sessão ou preenchimento de formulários.',
        toggle: 'essential',
        locked: true
    },
    {
        id: 'performance',
        label: 'Cookies de desempenho',
        title: 'Cookies de desempenho',
        description: 'Estes cookies permitem-nos contar visitas e fontes de tráfego, para que possamos medir e melhorar o desempenho do nosso website. Ajudam-nos a saber quais são as páginas mais e menos populares.',
        toggle: 'performance'
    },
    {
        id: 'functional',
        label: 'Cookies funcionais',
        title: 'Cookies funcionais',
        description: 'Estes cookies permitem que o website ofereça uma funcionalidade e personalização melhoradas, como lembrar as suas preferências.',
        toggle: 'functional'
    },
    {
        id: 'advertising',
        label: 'Cookies de publicidade',
        title: 'Cookies de publicidade',
        description: 'Estes cookies podem ser usados para tornar as mensagens publicitárias mais relevantes para si e para os seus interesses.',
        toggle: 'advertising'
    },
    {
        id: 'social',
        label: 'Cookies das redes sociais',
        title: 'Cookies das redes sociais',
        description: 'Estes cookies são definidos por diversos serviços de redes sociais que adicionámos ao website, para lhe permitir partilhar o nosso conteúdo com os seus amigos e redes.',
        toggle: 'social'
    }
];

const CookiePreferencesView = ({ open, preferences, onTogglePreference, onClose, onConfirm, onAllowAll }) => {
    const [activeId, setActiveId] = useState('privacy');

    if (!open) return null;

    const active = categories.find((c) => c.id === activeId) ?? categories[0];

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} min-h-[45vh]`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div style={{
                            backgroundColor: 'unset !important'
                            }} className={styles.footerLogo}>
                            <img style={{
                            width: '40px',
                            }} src="./imgs/logo.png" />
                        </div>
                        <h2>Centro de preferências de privacidade</h2>
                    </div>
                    <button className={styles.close} onClick={onClose} aria-label="Fechar">×</button>
                </div>
                <div className={styles.body}>
                    <ul className={styles.tabs}>
                        {categories.map((c) => (
                            <li key={c.id}>
                                <button
                                    className={c.id === activeId ? styles.tabActive : ""}
                                    onClick={() => setActiveId(c.id)}
                                >
                                    {c.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <h3>{active.title}</h3>
                            {
                                active.toggle && (
                                    <label className={`${styles.toggle} ${active.locked ? styles.toggleLocked : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={active.locked ? true : preferences[active.toggle]}
                                            disabled={active.locked}
                                            onChange={() => onTogglePreference(active.toggle)}
                                        />
                                        <span></span>
                                    </label>
                                )
                            }
                        </div>
                        <p>{active.description}</p>
                        
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.secondary} onClick={onConfirm}>Confirmar as minhas escolhas</button>
                    <button className={styles.primary} onClick={onAllowAll}>Permitir todos</button>
                </div>
            </div>
        </div>
    );
};

export default CookiePreferencesView;
