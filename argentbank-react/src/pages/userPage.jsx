import Account from '../components/account'
import HeaderUser from '../containers/headerUser'
import EditName from '../containers/editName';
import SignIn from './signInPage'

import { useSelector } from 'react-redux';

const Data = [
    {
        title: 'Argent Bank Checking (x8349)',
        amount: '$2,082.79',
        description: 'Available Balance'
    },
    {
        title: 'Argent Bank Savings (x6712)',
        amount: '$10,928.42',
        description: 'Available Balance'
    },
    {
        title: 'Argent Bank Credit Card (x8349)',
        amount: '$184.30',
        description: 'Current Balance'
    }
]

function App() {

    // hook pour obtenir le token depuis le store
    const token = useSelector(state => state.user.user.token);

    // redirection vers la page de connexion si l'utilisateur n'est pas connecté
    if (token === '') {
        return (
            <SignIn />
        )
    }

    return (
        <>
            <HeaderUser />
            <div className="user_container">
                <main className="main">
                    <div className="header">
                        <EditName />
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    {Data.map(account => (
                        <Account
                            key={account.title}
                            title={account.title}
                            amount={account.amount}
                            description={account.description}
                        />
                    ))}
                </main>
            </div>
        </>
    )
}

export default App