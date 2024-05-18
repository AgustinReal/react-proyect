import './App.css'
import { TwitterFollowCard } from './TwitterFolloowCard'

const users = [
    {
        key: 1,
        userName: 'midudev',
        name:"Miguel Ángel Durán",
        isFollowing: true
    },
    {
        key: 2,
        userName: 'pheralb',
        name:"Pablo H.",
        isFollowing: false
    },
    {
        key: 3,
        userName: 'PacoHdezs',
        name:"Paco Hdez",
        isFollowing: true
    }
]

export function App ()
{
    return (
        <section className='App'>
            {
            users.map( user => {
                const { key, userName, name, isFollowing } = user;

                return (
                    <TwitterFollowCard
                        key = {key}
                        userName = {userName}
                        initialIsFollowing = {isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                )
            })
            }
        </section>

    )
}