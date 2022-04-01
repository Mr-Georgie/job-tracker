import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
// import Popper from '@popperjs/core';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './mediaQueries.css'
import './styles.css'

import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
// import { WebSocketLink } from "@apollo/link-ws";
import { WebSocketLink } from '@apollo/client/link/ws'

import App from './App'

const GRAPHQL_ENDPOINT = 'job-tracker.hasura.app/v1/graphql'

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
  headers: {
    'x-hasura-admin-secret':
      'nLyFaUUmnoF0UVlA6naO9bE27ZwyGFymEx4TU08R73hStqEpCIopxIVl3s8CHBAU',
    'x-hasura-jwt-secret': `{"jwk_url":"https://${GRAPHQL_ENDPOINT}/.well-known/jwks.json"}`,
  },
})

const wsLink = new WebSocketLink({
  uri: `wss://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret':
          'nLyFaUUmnoF0UVlA6naO9bE27ZwyGFymEx4TU08R73hStqEpCIopxIVl3s8CHBAU',
        'x-hasura-jwt-secret': `{"jwk_url":"https://${GRAPHQL_ENDPOINT}/.well-known/jwks.json"}`,
      },
    },
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)


