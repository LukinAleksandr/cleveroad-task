import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './containers/AuthPage'
import ProductPage from './containers/ProductPage'
import CreatePage from './containers/CreatePage'
import DetalingPage from './containers/DetalingPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/products" exect>
          <ProductPage></ProductPage>
        </Route>
        <Route path="/create" exect>
          <CreatePage></CreatePage>
        </Route>
        <Route path="/detail/:id" exect>
          <DetalingPage></DetalingPage>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exect>
        <AuthPage></AuthPage>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  )
}
