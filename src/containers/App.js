import React from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
import OwnerList from '../containers/Owner/OwnerList/OwnerList';
import OwnerDetails from '../containers/Owner/OwnerDetails/OwnerDetails';
import InternalServer from '../components/ErrorPages/InternalServer/InternalServer';
import CreateOwner from './Owner/CreateOwner/CreateOwner';
import AccountList from '../containers/Account/AccountList/AccountList';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/owner-list" component={OwnerList} />
          <Route path="/account-list" component={AccountList} />
          <Route path="/ownerDetails/:id" component={OwnerDetails} />
          <Route path="/createOwner" component={CreateOwner} />
          <Route path="/500" component={InternalServer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
