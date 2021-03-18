import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

class IncidentsList extends Component {
  constructor () {
    super()
    this.state = {
      incidents: [],
      isVisible: true
    }
  }

  componentDidMount () {
    axios.get('/api/incidents').then(response => {
      this.setState({
        incidents: response.data,
        isVisible: false
      })
    })
  }

  render () {
    const { incidents } = this.state
    return (
      <div className='container py-12'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>Lista de incidentes</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                  Novo incidente
                </Link>
                <p> Selecione o incidente:</p>
                <Loading isVisible={this.state.isVisible}/>
                  {incidents.map(incident => (
                    <div key={incident.id}>
                      <Link
                        className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                        to={`/${incident.id}`}
                      >
                        <p>
                          <b>Título</b>: {incident.title}<br />
                          <b>Descrição</b>: {incident.description}
                        </p>
                      </Link>        
                    </div>
                  ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IncidentsList