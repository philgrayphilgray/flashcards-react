import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Deck from "./containers/Deck/Deck";
import Decks from "./containers/Decks/Decks";
import DeckEdit from "./containers/DeckEdit/DeckEdit";

class App extends Component {
  render() {
    return (
      <div className="App-layout">
        <Switch>
          <Route exact path="/" component={Decks} />
          <Route path="/editor/:id" component={DeckEdit} />
          <Route path="/player/:id" component={Deck} />
          <Route component={Decks} />
        </Switch>
      </div>
    );
  }
}

export default App;
