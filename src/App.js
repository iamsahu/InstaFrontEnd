import React from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import DepositBox from "./contracts/DepositBox.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState, useEffect, useRef, useMemo } from "react";
import Web3 from "web3";
import NFTs from "./components/NFTs";

import "./App.css";
import { supportsResultCaching } from "@apollo/client/cache/inmemory/entityStore";

function App() {
	const [metamaskConnected, setMetamaskConnected] = useState(false);
	const [metamaskInstalled, setMetamaskInstalled] = useState(false);
	// const [account, setAccount] = useState("");
	const account = useRef("");

	var ethereum, web3;

	// const provider = await detectEthereumProvider();
	if (typeof window.ethereum !== "undefined") {
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
	useEffect(() => {
		// if (provider)
		setMetamaskInstalled(true);
		account.current = ethereum.selectedAddress;
		if (typeof window.ethereum !== "undefined") {
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
		return <h6>{response}</h6>;
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
		<div className="row-auto font-mono">
			<div className="h-96 flex bg-gradient-to-r from-purple-800 via-green-600 to-green-300 flex-wrap place-content-center">
				<h1 className="text-8xl font-semibold text-white">
					Welcome to InstaNFT!
				</h1>
			</div>
			{metamaskInstalled ? (
				metamaskConnected ? (
					<div className="row-auto">
						<div>Balance:{GetBalance}</div>
						<div className="bg-green-900 text-white font-medium text-6xl p-2">
							Here are your minted NFTs!
						</div>
						<NFTs address={ethereum.selectedAddress} />
					</div>
				) : (
					// "Your account is connected"
					<div className="p-2 flex flex-wrap place-content-center">
						<button
							onClick={ConnectWallet}
							className="hover:bg-blue-dark text-white font-bold py-2 px-4 rounded bg-blue-500 "
						>
							Connect Wallet to see your NFTs!
						</button>
					</div>
				)
			) : (
				"Please Install Metamask"
			)}
			<div className="flex bg-green-900 flex-wrap place-content-center p-4">
				<h1 className="text-6xl font-semibold text-white">How it works!</h1>
			</div>
			<div className="flex bg-green-300 flex-wrap place-content-center p-4">
				<div className="grid grid-cols-3 gap-4 bg-green-300 px-4 py-6">
					<div className="blogs bg-white mr-5" key="1">
						<img
							src="https://i.imgur.com/YQxI6cK.png"
							alt="sda"
							className="h-96 object-contain object-center"
						/>
						<div className="p-5">
							<p className="bg-white text-sm text-black overflow-ellipsis font-semibold">
								Step 1
							</p>
							<p className="bg-white text-sm text-black overflow-ellipsis">
								Create an applet on IFTTT connecting instagram to a web request!
							</p>
						</div>
					</div>
					<div className="blogs bg-white mr-5" key="2">
						<img
							src="https://i.imgur.com/IrptDRt.png"
							alt="sda"
							className="h-96 object-contain object-center"
						/>
						<div className="p-5">
							<p className="bg-white text-sm text-black overflow-ellipsis font-semibold">
								Step 2
							</p>
							<p className="bg-white text-sm text-black overflow-ellipsis">
								Choose tag as a trigger in instagram and add nft as the tag
							</p>
						</div>
					</div>
					<div className="blogs bg-white mr-5" key="3">
						<img
							src="https://imgur.com/Hab1pvy.png"
							alt="sda"
							className="h-96 object-contain object-center"
						/>
						<div className="p-5">
							<p className="bg-white text-sm text-black overflow-ellipsis font-semibold">
								Step 3
							</p>
							<p className="bg-white text-sm text-black overflow-ellipsis">
								Configure the webhook as shown in the image. Just provide your
								wallet address in the appropriate location! Please find the text
								below
							</p>
							<br />
							<p className="truncate text-xs">
								URL:https://xlfyb84p9j.execute-api.ap-south-1.amazonaws.com/default/createNFT
								<br />
								Body:
								<br />
								&#123;
								<br /> "caption":&#123;&#123;Caption&#125;&#125;,
								<br />
								"url":&#123;&#123;Url&#125;&#125;, <br />
								"SourceUrl":&#123;&#123;SourceUrl&#125;&#125;,
								<br />
								"CreatedAt":&#123;&#123;CreatedAt&#125;&#125;,
								<br />
								"address":"0x4033Fa14e9c72b8ab023911848B4041676D6f279"
								<br />
								&#125;
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
{
	/* <div>
 <button onClick={Store}>Store</button>
			<button onClick={Value}>Value</button>
			<button onClick={Deposit}>Deposit</button>
			<button onClick={GetBalance}>GetBalance</button>
			<button onClick={Withdraw}>Withdraw</button> 
<br />
</div> */
}
