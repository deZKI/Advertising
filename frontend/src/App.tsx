import React, {Suspense, lazy} from 'react';
import 'leaflet/dist/leaflet.css'
import './main.global.css';
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from './store/reducer';
import thunk from "redux-thunk";
import LoaderPage from './pages/LoaderPage/LoaderPage';

const middleware = [thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage'));

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoaderPage />}>
        <LazyHomePage />
      </Suspense>
    </Provider>
  );
}
