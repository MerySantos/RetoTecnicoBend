import React from 'react';
import Calculator from './Calculadora';
import { connect } from "redux-zero/react";
import { HashRouter, Switch, Route } from 'react-router-dom';

const App = ({list, result, calculation, buttons}) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Calculator list={list} result={result} calculation={calculation} buttons={buttons} />} />
        <Route path="/calculator" render={() => <Calculator list={list} result={result} calculation={calculation} buttons={buttons} />} /> />
      </Switch>
    </HashRouter>
  );
}

const mapToProps = ({list, result, calculation, buttons}) => ({list, result, calculation, buttons});
export default connect(mapToProps)(App);
