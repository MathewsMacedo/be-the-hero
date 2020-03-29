import React, {useState}from 'react';
import logo from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom'
import api  from '../../services/api'
import './styles.css';

export default function NewIncidents(){
    const ong_id = localStorage.getItem('ong_id');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    async function handleNewIncidents(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
       

        try{
           await api.post('incidents',data, {
               headers: {
                   Authorization:ong_id
                }
            });

            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente');

        }

    }

    return(
        <div className="newIncidents-container">
        <div className="content">
            <section>
              <img src={logo} alt="logo"/>
              <h1>Cadastrar novo caso</h1>
              <p>Descreva o caso detalhadamente para encontrar o héroi para resolver isso.</p>

              <Link to="/profile" className="back-link"> <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>Voltar para home</Link>
             

            </section>
            <form onSubmit={handleNewIncidents}>
                    <input 
                    placeholder="Titulo do Caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
                    
                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>

                    <input placeholder="Valor em reais"
                    value={value}
                    onChange={e=> setValue(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>
    </div>

    );

}