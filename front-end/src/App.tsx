import { Routes, Route } from 'react-router-dom';

import './scss/generic.scss';
import { publicPages, privatePages, defaultPages } from 'pages';
import Protected from 'components/Protected';

const App = () => {
  return (
    <Routes>
      {publicPages.map(({ path, Page }, index) => <Route
        path={path} key={index} element={<Page />}
      />)}

      {privatePages.map(({ path, Page }, index) => <Route
        path={path} key={index} element={<Protected><Page /></Protected>}
      />)}

      {defaultPages.map(({ path, Page }, index) => <Route
        path={path} key={index} element={<Page />}
      />)}
    </Routes>
  );
}

export default App;
