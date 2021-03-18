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
            editMode: false,
            checked: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
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
        this.setState({ 
            [event.target.name] : event.target.value 
        });
    }
    
    handleStatusChange(checked) {
        let statusValue = checked ? 1: 0;
        this.setState({ status_id: statusValue });
    }

    changeEditMode(event) {
        event.preventDefault();
        this.setState({editMode: !this.state.editMode});
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
                                <div className={(this.state.editMode ? "d-none" : "")} >
                                    <button
                                        className='btn btn-primary btn-sm'
                                        onClick={this.changeEditMode}
                                    >
                                        Editar
                                    </button>

                                    <hr />
                                </div>
                                <form onSubmit={this.handleUpdateIncident}>

                                    <label htmlFor="title">Título</label><br />
                                    <input
                                        type='text'
                                        name='title'
                                        className={'form-control'}
                                        id="title"
                                        placeholder='Título do incidente'
                                        value={this.state.title}
                                        onChange={this.handleFieldChange}
                                        disabled={(this.state.editMode) ? false : true}
                                    />

                                    <label htmlFor="description">Descrição</label>
                                    <input
                                        type='text'
                                        name='description'
                                        className={'form-control'}
                                        id="description"
                                        placeholder='Descrição do incidente'
                                        value={this.state.description}
                                        onChange={this.handleFieldChange}
                                        disabled={(this.state.editMode) ? false : true}
                                    />
                                    
                                    <label htmlFor="criticality_id">Criticidade</label><br />
                                    <select name="criticality_id"
                                        value={this.state.criticality_id} 
                                        id="criticality_id"
                                        onChange={this.handleFieldChange} 
                                        disabled={(this.state.editMode) ? false : true}
                                    >
                                        <option value="0">Selecione</option>
                                        <option value="1">Baixa</option>
                                        <option value="2">Média</option>
                                        <option value="3">Alta</option>
                                    </select>
                                
                                    <div>
                                        <label htmlFor="type_id">Tipo</label><br />
                                        <select name="type_id" 
                                            value={this.state.type_id} 
                                            onChange={this.handleFieldChange}
                                            id="type_id"
                                            disabled={(this.state.editMode) ? false : true}
                                        >
                                            <option value="0">Selecione</option>
                                            <option value="1">Alarme</option>
                                            <option value="2">Incidente</option>
                                            <option value="3">Outros</option>
                                        </select>
                                    </div>
                                
                                    <div>
                                        <label htmlFor="status">Status</label><br />
                                        <Switch name="status_id" 
                                            onChange={this.handleStatusChange} 
                                            id="status_id"
                                            checked={this.state.status_id == 1 ? true : false} 
                                            disabled={(this.state.editMode) ? false : true} 
                                        />
                                    </div>
                                    
                                    <div className={(this.state.editMode ? "" : "d-none")}>
                                        <hr />
                                        <button
                                            className={"btn btn-danger btn-sm pull-right cancel-edit-mode"}
                                            onClick={this.changeEditMode}
                                        >
                                            Cancelar
                                        </button>                                         
                                        <button
                                            className={"btn btn-success btn-sm pull-right "}
                                            onClick={this.handleUpdate}
                                        >
                                            Salvar
                                        </button>                                 
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