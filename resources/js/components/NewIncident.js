import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Switch from "react-switch"

class NewIncident extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      type_id: '',
      status_id: 2,
      criticality_id: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewIncident = this.handleCreateNewIncident.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleStatusChange(checked) {
    let statusValue = checked ? 1: 2;
    this.setState({ status_id: statusValue });
  }

  handleCreateNewIncident (event) {
    event.preventDefault()

    const { history } = this.props

    const incident = {
      title: this.state.title,
      description: this.state.description,
      criticality_id: this.state.criticality_id,
      status_id: this.state.status_id,
      type_id: this.state.type_id
    }

    axios.post('/api/incident/create', incident)
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })
      .catch(error => {
          console.log(errors);
      })
  }


  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new incident</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewIncident}>
                  <div className='form-group'>
                    <label htmlFor='title'>Título</label>
                    <input
                      id='title'
                      type='text'
                      className={`form-control`}
                      name='title'
                      value={this.state.title}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='description'>Descrição</label>
                    <textarea
                      id='description'
                      className={`form-control`}
                      name='description'
                      rows='4'
                      value={this.state.description}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <label htmlFor="criticality_id">Criticidade</label><br />
                    <select name="criticality_id"
                        value={this.state.criticality_id} 
                        id="criticality_id"
                        onChange={this.handleFieldChange} 
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
                        />
                    </div>  
                    <hr />                                         
                    <Link className='btn btn-secondary' to='/'>
                        Voltar
                    </Link>                              
                  <button className='btn btn-success'>Criar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewIncident