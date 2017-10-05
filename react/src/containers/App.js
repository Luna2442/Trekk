import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TrailSearchContainer from './TrailSearchContainer';
import JournalContainer from './JournalContainer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/trails" component={TrailSearchContainer} />
            <Route exact path="/users/:id" component={JournalContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
