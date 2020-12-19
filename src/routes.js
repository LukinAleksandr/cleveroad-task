import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './containers/AuthPage'
import ProductPage from './containers/ProductPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/products" exect>
          <ProductPage></ProductPage>
        </Route>
        {/* <Route path="/create" exect>
          <CreatePage></CreatePage>
        </Route>
        <Route path="/detail/:id" exect>
          <DetalingPage></DetalingPage>
        </Route> */}
        <Redirect to="/products"></Redirect>
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
