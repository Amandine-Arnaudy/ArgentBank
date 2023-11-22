import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserName } from '../redux/reducers/user.reducer';

export default function App() {

    const dispatch = useDispatch();

    // récupération des données de l'utilisateur depuis le store
    const initialUserName = useSelector(state => state.user.user.userName);
    const userFirstName = useSelector(state => state.user.user.firstName);
    const userLastName = useSelector(state => state.user.user.lastName);
    const token = useSelector(state => state.user.user.token);

    // états locaux du composant
    const [isActive, setIsActive] = useState(false);
    const [titleText, setTitleText] = useState('Welcome back');
    const [point, setPoint] = useState('!');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);

    // gestion du clic sur le bouton d'édition
    const handleClick = () => {
        setIsActive(current => !current);
        setTitleText('Edit user name');
        setFirstName('');
        setLastName('');
        setPoint('');
    };


    // gestion du clic sur le bouton d'annulation
    const reverseClick = () => {
        setIsActive(current => !current);
        setTitleText('Welcome back');
        setFirstName(userFirstName);
        setLastName(userLastName);
        setPoint('!');
    };

    // mise à jour du surnom lorsqu'il est changé
    useEffect(() => {
        setUserName(initialUserName)
    },[initialUserName])

  return (
    <div>
        <h1 className='userEdit_title' >{titleText}<br/>{firstName} {lastName} {point}</h1>
        <div className='userName'>
            <form 
                className='userName_form' 
                id="userNameEdit"
                style={{display: isActive ? 'flex' : 'none',}}
            >
                <div className="userName_input">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="userName_input">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={userFirstName} onChange={(e) => e.preventDefault()} disabled/>
                </div>
                <div className="userName_input">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="LastName" value={userLastName} onChange={(e) => e.preventDefault()} disabled/>
                </div>
                <div className='userNameButton_wrapper'>
                    <button 
                        className="userName_button"
                        disabled={!userName}
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(editUserName({ userName:userName, token:token }))
                            dispatch(reverseClick)
                        }}
                    >
                        Save
                    </button>
                    <button 
                        className="userName_button"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(reverseClick)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </ form>
        </div>
        <button
            className="edit-button"
            style={{
            display: isActive ? 'none' : '',
            }}
            onClick={handleClick}
        >
            Edit Name
        </button>
    </div>
  );
}