import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class IncidentsList extends Component {
  constructor () {
    super()
    this.state = {
      incidents: []
    }
  }

  componentDidMount () {
    axios.get('/api/incidents').then(response => {
      this.setState({
        incidents: response.data
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
                <ul className='list-group list-group-flush'>
                  {incidents.map(incident => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/${incident.id}`}
                      key={incident.id}
                    >
                      <p>
                        Título: {incident.title}<br />
                        Descrição: {incident.description}
                      </p>
                    </Link>        
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IncidentsList