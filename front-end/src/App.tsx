import { Routes, Route } from 'react-router-dom';

import './scss/generic.scss';
import { publicPages, privatePages, defaultPages } from 'pages';
import Protected from 'components/Protected';

const App = () => {
  return (
    <Routes>
      {publicPages.map(({ path, Page, Layout }, index) => <Route
        path={path} key={index} element={<Layout><Page /></Layout>}
      />)}

      {privatePages.map(({ path, Page, Layout }, index) => <Route
        path={path} key={index} element={<Protected><Layout><Page /></Layout></Protected>}
      />)}

      {defaultPages.map(({ path, Page, Layout }, index) => <Route
        path={path} key={index} element={<Layout><Page /></Layout>}
      />)}
    </Routes>
  );
}

export default App;
