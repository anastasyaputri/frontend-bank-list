import React from "react";
import { Route, Switch } from "react-router-dom";
import TransactionListView from "./View/Transaction/TransactionListView";
import TransactionDetailView from "./View/Transaction/TransactionDetailView";


function App() {
    return (
      <Switch>
          <Route path="/detail" 
          component={TransactionDetailView} 
          />
          <Route path="/" 
          component={TransactionListView} 
          />
      </Switch>
    )
}

export default App
