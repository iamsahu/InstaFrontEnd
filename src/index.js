import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const httpsLink = new HttpLink({
	uri: "https://web3weekendnft.hasura.app/v1/graphql",
	headers: {
		"x-hasura-admin-secret":
			"mTCW3fXzqWToOdVZD9rooIHB6frSJxdAeT1zXD92MmtPjaQleju2Yc6uuxPvhP1t",
	},
});
const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQLURI,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
