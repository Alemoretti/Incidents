import axios from 'axios'
import React, { Component } from 'react'

class SingleIncident extends Component {
  constructor (props) {
    super(props)
    this.state = {
        incident: {}
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    const incidentId = this.props.match.params.id

    axios.get(`/api/incident/${incidentId}`).then(response => {
      this.setState({
        incident: response.data
      })
    })
  }

  handleUpdate () {
    const { history } = this.props

    axios.patch(`/api/incident/${this.state.incident.id}`)
      .then(response => history.push('/'))
  }

  render () {
    const { incident } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{incident.title}</div>
              <div className='card-body'>
                <p>{incident.description}</p>

                <button
                    className='btn btn-primary btn-sm'
                    onClick={this.handleUpdate}
                >
                    Atualizar
                </button>

                <hr />

                <ul className='list-group mt-3'>
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={incident.id}
                    >
                      {incident.title}
                    </li>
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={incident.id}
                    >
                      {incident.description}
                    </li>
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={incident.id}
                    >
                      {incident.criticality_id}
                    </li>
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={incident.id}
                    >
                      {incident.type}
                    </li>           
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={incident.id}
                    >
                      {incident.status}
                    </li>                                                                     
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleIncident