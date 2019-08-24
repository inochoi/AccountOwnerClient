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
import AccountDetails from '../containers/Account/AccountDetails/AccountDetails';
import CreateAccount from './Account/CreateAccount/CreateAccount';
import UpdateOwner from './Owner/UpdateOwner/UpdateOwner';
import UpdateAccount from './Account/UpdateAccount/UpdateAccount';
import DeleteOwner from './Owner/DeleteOwner/DeleteOwner';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/owner-list" component={OwnerList} />
          <Route path="/account-list" component={AccountList} />
          <Route path="/ownerDetails/:id" component={OwnerDetails} />
          <Route path="/accountDetails/:id" component={AccountDetails} />
          <Route path="/createOwner" component={CreateOwner} />
          <Route path="/createAccount" component={CreateAccount} />
          <Route path="/updateOwner/:id" component={UpdateOwner} />
          <Route path="/updateAccount/:id" component={UpdateAccount} />
          <Route path="/deleteOwner/:id" component={DeleteOwner} />
          <Route path="/500" component={InternalServer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
