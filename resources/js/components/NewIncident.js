import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NewIncident extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      type: '',
      status: '',
      criticality: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewIncident = this.handleCreateNewIncident.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewIncident (event) {
    event.preventDefault()

    const { history } = this.props

    const incident = {
      title: this.state.title,
      description: this.state.description,
      criticality: this.state.criticality,
      status: this.state.status,
      type: this.state.type
    }

    axios.post('/api/incident/create', incident)
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
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
                      className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                      name='title'
                      value={this.state.title}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('title')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='description'>Descrição</label>
                    <textarea
                      id='description'
                      className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                      name='description'
                      rows='10'
                      value={this.state.description}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('description')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='criticality'>Criticidade</label>
                    <input
                      id='criticality'
                      type='text'
                      className={`form-control ${this.hasErrorFor('criticality') ? 'is-invalid' : ''}`}
                      name='criticality'
                      value={this.state.criticality}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('criticality')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='type'>Título</label>
                    <input
                      id='type'
                      type='text'
                      className={`form-control ${this.hasErrorFor('type') ? 'is-invalid' : ''}`}
                      name='type'
                      value={this.state.type}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('type')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='status'>Título</label>
                    <input
                      id='status'
                      type='text'
                      className={`form-control ${this.hasErrorFor('status') ? 'is-invalid' : ''}`}
                      name='status'
                      value={this.state.status}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('status')}
                  </div>                                            
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