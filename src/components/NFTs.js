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
	if (error) return <p>Error</p>;
	if (!loading && !error) {
		console.log(data);
		// return <h1>Hello !</h1>;
		return (
			<div class="grid grid-cols-3 gap-4 bg-green-300 px-4 py-4">
				{/* <div class="flex justify-between items-center"> */}
				{data.test_schema_test_data.map((val) => (
					<div class="blogs bg-white mr-5 " key={val.id}>
						<img src={val.fileURL} class="" />
						<div class="p-5 ">
							<h1 class="text-2xl font-bold text-green-800 py-2 truncate">
								{val.name}
							</h1>
							<p class="bg-white text-sm text-black truncate">{val.caption}</p>
						</div>
					</div>
				))}
				{/* </div> */}
			</div>
		);
	}
	return <div></div>;
}

export default NFTs;
{
	/* <div class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8">
								<img src={val.fileURL} alt="" class="overflow-hidden" />

								<div class="p-4">
									<h3 class="font-medium text-gray-600 text-lg my-2 uppercase">
										{val.name}
									</h3>
									<p class="text-justify">{val.caption}</p>
								</div>
							</div> */
}
