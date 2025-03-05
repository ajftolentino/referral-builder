import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReduxHooksProvider } from 'hooks';
import { AppBase, Loader } from 'components/core';
import { initializeStore } from 'store';

const App: React.FC = () => {
  const configuredStore = initializeStore();
  const { persistor, store, useReduxDispatch, useReduxSelector } =
    configuredStore;

  if (!store || !persistor) {
    return <Loader type="screen" />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader type="screen" />}>
        <ReduxHooksProvider value={{ useReduxDispatch, useReduxSelector }}>
          <Router basename="/">
            <AppBase />
          </Router>
        </ReduxHooksProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
