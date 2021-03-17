import axios from 'axios'
import React, { Component } from 'react'
import Switch from "react-switch";
import Select from 'react-select';

class SingleIncident extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            status_id: false,
            type_id: 0,
            criticality_id: 0,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    componentDidMount() {
        const incidentId = this.props.match.params.id

        axios.get(`/api/incident/${incidentId}`).then(response => {
            this.setState({
                ...response.data
            })
        })

    }

    handleFieldChange(event) {
        console.log([event.target.name]);
        console.log(event.target.value );
        this.setState({ 
            [event.target.name] : event.target.value 
        });
    }

    handleUpdate() {
        const { history } = this.props

        axios.patch(`/api/incident/${this.state.incident.id}`)
            .then(response => history.push('/'))
    }

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Incidente: {this.state.title}</div>
                            <div className='card-body'>
                                <button
                                    className='btn btn-primary btn-sm'
                                    onClick={this.handleUpdate}
                                >
                                    Editar
                                </button>

                                <hr />
                                <form onSubmit={this.handleUpdateIncident}>

                                    <label for="title">Título</label><br />
                                    <input
                                        type='text'
                                        name='title'
                                        className={'form-control'}
                                        placeholder='Título do incidente'
                                        value={this.state.title}
                                        onChange={this.handleFieldChange}
                                        
                                    />

                                    <label for="description">Descrição</label>
                                    <input
                                        type='text'
                                        name='description'
                                        className={'form-control'}
                                        placeholder='Descrição do incidente'
                                        value={this.state.description}
                                        onChange={this.handleFieldChange}
                                        
                                    />
                                    
                                    <label for="criticality_id">Criticidade</label><br />
                                    <select name="criticality_id" value={this.state.criticality_id} onChange={this.handleFieldChange}>
                                        <option value="0">Selecione</option>
                                        <option value="1">Baixa</option>
                                        <option value="2">Média</option>
                                        <option value="3">Alta</option>
                                    </select>
                                
                                    <div>
                                    <label for="type">Tipo</label><br />
                                    <select name="type_id" value={this.state.type_id} onChange={this.handleFieldChange}>
                                        <option value="0">Selecione</option>
                                        <option value="1">Alarme</option>
                                        <option value="2">Incidente</option>
                                        <option value="3">Outros</option>
                                    </select>
                                    </div>
                                
                                    <div>
                                    <label for="status">Status</label><br />
                                    <Switch name="status_id" onChange={this.handleFieldChange} checked={this.state.status_id == 1 ? true : false} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleIncident