import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './containers/AuthPage'
import ProductsPage from './containers/ProductsPage'
import CreatePage from './containers/CreatePage'
import EditPage from './containers/EditPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/edit/:id">
          <EditPage />
        </Route>
        <Redirect to="/products" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
