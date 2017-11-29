import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TrailSearchContainer from './TrailSearchContainer';
import JournalContainer from './JournalContainer';
import {Provider} from 'react-redux';
import store from '../../redux/store';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/trails" component={TrailSearchContainer} />
            <Route exact path="/users/:id" component={JournalContainer} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
