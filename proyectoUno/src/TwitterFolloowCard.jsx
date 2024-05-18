import { useState } from "react";

export function TwitterFollowCard ({userName, name})
{
    const imageSrc = `https://unavatar.io/${userName}`

    const [isFollowing, setIsFollowing] = useState(false)

    const text = isFollowing ? 'Siguiendo' : 'seguir';
    const buttonClassName = isFollowing
    ? 'tw-followCrad-button is-following'
    : 'tw-followCrad-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <article className="tw-followCrad">
            <header className="tw-followCrad-header">
                <img 
                className="tw-followCrad-header-avatar"
                
                src={imageSrc}
                alt="El avatar de midudev" />
                <div className="tw-followCrad-info">
                    <strong>{name}</strong>
                    <span className="tw-followCrad-infoUserName">@{userName}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCrad-text'>{text}</span>
                    <span className='tw-followCrad-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}