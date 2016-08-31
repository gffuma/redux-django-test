import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { connect } from 'react-redux';

const rootReducer = (state = { developers: [], coolest: null }, action) => {
  if (action.type === 'SET_COOLEST_DEV') {
    return {
      ...state,
      coolest: action.name,
    };
  }

  return state;
};

const store = createStore(
  rootReducer,
  window.__INITIAL_STATE__,
  applyMiddleware(createLogger())
);

class DevelopersList extends React.Component {
  render() {
    return <div>{this.props.developers.map(developer => (
      <div key={developer.name} style={{ backgroundColor: developer.name === this.props.coolest ? 'purple' : 'white' }}>
        <button onClick={() => this.props.setCool(developer.name)}>Cooool</button>
        {' '}
        {developer.name}
      </div>
    ))}</div>
  }
}

class DeveloperCool extends React.Component {
  render() {
    return <h1>The Most Cool Developer is {this.props.coolest}</h1>;
  }
}

const DeveloperCoolRedux = connect((state) => ({ coolest: state.coolest }))(DeveloperCool);
const DevelopersListRedux = connect(
  (state) => ({ developers: state.developers, coolest: state.coolest }),
  (dispatch) => ({
    setCool: (name) => dispatch({ type: 'SET_COOLEST_DEV', name })
  })
)(DevelopersList);

const renderReduxContainer = (className, componentFactory) => {
  Array.from(document.getElementsByClassName(className))
    .forEach(element => {
      ReactDom.render(
        <Provider store={store}>
          {componentFactory()}
        </Provider>,
        element
      );
    });
};

renderReduxContainer('developers-list', () => <DevelopersListRedux />);
renderReduxContainer('developer-cool', () => <DeveloperCoolRedux />);

console.log(store.getState());
store.dispatch({ type: 'YEAH' })
