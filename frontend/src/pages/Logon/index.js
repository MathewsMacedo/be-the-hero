import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'




export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        try{
            const response = await api.post('session',{id});
            localStorage.setItem('ong_id',id);
            localStorage.setItem('ong_name',response.data.name);
            history.push('/profile');

        }catch(err){
            alert('Erro para realizar login, tente novamente')
        }


    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="logo"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link"> <FiLogIn size={16} color="#E02041"></FiLogIn>Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
  
    );


}