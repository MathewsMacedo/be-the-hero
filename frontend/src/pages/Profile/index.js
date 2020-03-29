import React, {useEffect, useState}from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'
import logo from '../../assets/logo.svg'

import api from '../../services/api';

export default function Profile(){

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ong_name = localStorage.getItem('ong_name');
    const ong_id = localStorage.getItem('ong_id');

    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ong_id,
            }
        }).then(response => {
                setIncidents(response.data)
        });
    },[ong_id]);


    async function handleDeleteIncidents(id){
        try{
            await api.delete(`incidents/${id}`, {
            headers:{
                Authorization: ong_id,
                }
            });
            setIncidents(incidents.filter(incidents => incidents.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return(
        <div className="profile-content">
            <header>
                <img src={logo} alt="Be The Hero"/>
                <span>Bem vinda, {ong_name}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={() => handleLogout()} size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incidents.value)}</p>

                    <button type="button">
                        <FiTrash2 onClick={() => handleDeleteIncidents(incidents.id)} size={20} color="#a8a8b3"></FiTrash2>
                    </button>
                </li>
                ))}
                
            </ul>
        </div>
        
    );


}