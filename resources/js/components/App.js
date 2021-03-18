import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import IncidentsList from './IncidentsList'
import NewIncident from './NewIncident'
import SingleIncident from './SingleIncident'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={IncidentsList} />
            <Route path='/create' component={NewIncident} />
            <Route path='/:id' component={SingleIncident} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))