import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import DepositBox from "./contracts/DepositBox.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState, useEffect, useRef, useMemo } from "react";
import Web3 from "web3";
import NFTs from "./components/NFTs";

import "./App.css";

function App() {
	const [metamaskConnected, setMetamaskConnected] = useState(false);
	const [metamaskInstalled, setMetamaskInstalled] = useState(false);
	// const [account, setAccount] = useState("");
	const account = useRef("");

	var ethereum, web3;

	// const provider = await detectEthereumProvider();

	useEffect(() => {
		// if (provider)
		if (typeof window.ethereum !== "undefined") {
			setMetamaskInstalled(true);
			ethereum = window.ethereum;
			web3 = new Web3(ethereum);
			ethereum.on("accountsChanged", (accounts) => {
				// Handle the new accounts, or lack thereof.
				// "accounts" will always be an array, but it can be empty.
				account.current = accounts[0];
				console.log(accounts);
			});

			ethereum.on("chainChanged", (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			});

			ethereum.on("connect", (chainId) => {
				console.log(chainId);
				if (ethereum.isConnected()) setMetamaskConnected(true);
			});
		}
	});

	// 1000, 000, 000, 000, 000, 000;
	async function ConnectWallet() {
		// ethereum.request({ method: "eth_requestAccounts" });
		const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		// const account = accounts[0];
		account.current = accounts[0];
		console.log(accounts);
		setMetamaskConnected(true);
	}

	async function Store() {
		// const { accounts, contract } = this.state;
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = SimpleStorageContract.networks[networkId];
		const instance = new web3.eth.Contract(
			SimpleStorageContract.abi,
			deployedNetwork && deployedNetwork.address
		);
		// Stores a given value, 5 by default.
		await instance.methods.set(5).send({ from: account.current });

		// Get the value from the contract to prove it worked.
		const response = await instance.methods.get().call();
		console.log(response);
		// return <div>{response}</div>;
	}

	async function Value() {
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = SimpleStorageContract.networks[networkId];
		const contract = new web3.eth.Contract(
			SimpleStorageContract.abi,
			deployedNetwork && deployedNetwork.address
		);
		const response = await contract.methods.get().call();
		console.log(response);
	}

	async function Deposit() {
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = DepositBox.networks[networkId];
		const contract = new web3.eth.Contract(
			DepositBox.abi,
			deployedNetwork && deployedNetwork.address
		);
		const response = await contract.methods
			.deposit()
			.send({ from: account.current, value: web3.utils.toWei("0.1", "ether") });
		console.log(response);
	}

	async function GetBalance() {
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = DepositBox.networks[networkId];
		const contract = new web3.eth.Contract(
			DepositBox.abi,
			deployedNetwork && deployedNetwork.address
		);
		const response = await contract.methods.balanceOf(account.current).call();
		// .send({ from: account.current, value: web3.utils.toWei("0.1", "ether") });
		console.log(response);
	}

	async function Withdraw() {
		try {
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = DepositBox.networks[networkId];
			const contract = new web3.eth.Contract(
				DepositBox.abi,
				deployedNetwork && deployedNetwork.address
			);
			console.log(web3.utils.toWei("0.8", "ether"));
			// const response = await contract.methods.withDraw().send({
			// 	from: account.current,
			// 	value: web3.utils.toWei("0.1", "ether"),
			// });
			const response = await contract.methods
				.withDraw2(web3.utils.toWei("0.1", "ether"))
				.send({
					from: account.current,
				});
			// .send({ from: account.current, value: web3.utils.toWei("0.1", "ether") });
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="flex p-2 flex-col justify-center">
			<div className="grid grid-cols-3">
				<div className="col-start-1 col-span-4">
					<div className="flex flex-col justify-center">
						<h1 className="flex justify-center">
							Donate crypto to assist India's fight against covid.
						</h1>
						<h1 className="flex justify-center">Current donations ETH</h1>
					</div>
					<br />
					{/* <TwitterTweetEmbed tweetId={"1385968552679727113"} /> */}
					<div className="flex justify-center">
						{metamaskInstalled ? (
							metamaskConnected ? (
								<div>
									<div>Connected!</div>
									<div>
										<button onClick={Store}>Store</button>
										<button onClick={Value}>Value</button>
										<button onClick={Deposit}>Deposit</button>
										<button onClick={GetBalance}>GetBalance</button>
										<button onClick={Withdraw}>Withdraw</button>
										<br />
										<NFTs address={account.current} />
									</div>
								</div>
							) : (
								// "Your account is connected"
								<button
									onClick={ConnectWallet}
									className="hover:bg-blue-dark text-white font-bold py-2 px-4 rounded bg-blue-500"
								>
									Connect Wallet to donate!
								</button>
							)
						) : (
							"Please Install Metamask"
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
