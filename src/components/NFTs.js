import React, { Component } from "react";
import { gql, useQuery } from "@apollo/client";

const GETNFTs = gql`
	query MyQuery($address: String) {
		test_schema_test_data(where: { userAddress: { _eq: $address } }) {
			caption
			fileIPFS
			fileURL
			id
			name
			userAddress
		}
	}
`;

function NFTs(props) {
	console.log(props);
	const { loading, error, data } = useQuery(GETNFTs, {
		variables: { address: props.address },
	});
	if (loading) return <p>Loading ...</p>;
	return <h1>Hello !</h1>;
	return <div></div>;
}

export default NFTs;
