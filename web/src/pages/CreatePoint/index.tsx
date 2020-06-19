import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'

// Interfaces
interface Item {
    id: number,
    title: string,
    image: string
}
interface IBGEUFresponse {
    sigla: string
}
// --

const CreatePoint = () => {
    //states 
    const [items, setItems] = useState<Item[]>([]);
    const [states, setStates] = useState<string[]>([]);
    // --

    // Get in items
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])
    // --

    //Get in IBGE API
    useEffect(() => {
        axios.get<IBGEUFresponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setStates(ufInitials);
            });
    }, []);
    // --

    // HTML render
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="logo" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>



                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                            />
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um endereço no mapa</span>
                    </legend>
                    <Map center={[-19.9611657, -44.0484635]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-19.9611657, -44.0484635]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                            {states.map(uf => (
                                
                                    <option value="uf" key={uf}>{uf}</option>
                             
                            ))};
                               </select>

                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">

                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );

}

export default CreatePoint;