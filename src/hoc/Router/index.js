import React, { useContext, useEffect } from 'react';
import { Router as BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import history from './history';
import { requireLogin, requireResult } from './guards';
import { AuthPage, TaskListPage, NotFoundPage, TaskInfoPage, HistoryPage, RegisterPage, ProPage } from '../../pages';
import Loading from '../../components/Loading';
import { AuthContainer, DefaultContainer } from '../Containers';
import AutoSignupPage from "../../pages/AutoSignupPage";
import RegisterNewPage from '../../pages/AutoSignupPage';
const Router = ({children}) => {
  
  return (
    <BrowserRouter history={history}>
      <GuardProvider guards={[requireLogin]} loading={Loading} error={NotFoundPage}>
        {children(
          <Switch>
              <GuardedRoute
                  path="/signup"
                  exact
                  component={() => AuthContainer({children: AutoSignupPage()})}
                  meta={{ auth: false }}
              />
            <GuardedRoute
              path="/register"
              exact
              component={() => AuthContainer({children: RegisterPage()})}
              meta={{ auth: false }}
            />
            <GuardedRoute
              path="/signup"
              exact
              component={() => AuthContainer({children: RegisterNewPage()})}
              meta={{ auth: false }}
              guards={[]}
            />
            <GuardedRoute
              path="/login"
              exact
              component={() => AuthContainer({children: AuthPage()})}
              meta={{ auth: false }}
            />
            <GuardedRoute path="/pro" exact component={() => DefaultContainer({children: ProPage(), classes: 'page-pro'})} meta={{ auth: true }} />

            <GuardedRoute path="/" exact component={() => DefaultContainer({children: TaskListPage()})} meta={{ auth: true }} />
            <GuardedRoute path="/task/:id" exact component={() => DefaultContainer({children: TaskInfoPage()})} meta={{ auth: true }} />
            <GuardedRoute path="/history" exact component={() => DefaultContainer({children: HistoryPage()})} meta={{ auth: true }} />
            <GuardedRoute path="*" component={() => DefaultContainer({children: NotFoundPage()})} />
          </Switch>
        )}
      </GuardProvider>
      
    </BrowserRouter>
  )
}

export default Router;