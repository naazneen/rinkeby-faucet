import { useEffect, useState } from "react";

import { TextField, Button, Typography, Divider } from "@material-ui/core";

import EthereumFaucet from "../abis/EthereumFaucet.json";
import FaucetContract from "../abis/contract-address.json";

import { getEther, donateEther, getBalance } from "../utils";

function RequestForm() {
	const [walletAddr, setWalletAddr] = useState();
	const [etherReq, setEtherReq] = useState();
	const [etherToDonate, setEtherDonate] = useState();
	const [requestLoading, setRequestLoading] = useState(false);
	const [donateLoading, setDonateLoading] = useState(false);
	const [faucetBalance, setFaucetBalance] = useState('');

	useEffect(()=>{
		getBalance(
			FaucetContract.FaucetContractAddr,
			EthereumFaucet).then((res)=>{
				setFaucetBalance(res)
			})

	},[donateLoading,requestLoading])

	async function handleGetEther() {
		setRequestLoading(true);
		await getEther(
			FaucetContract.FaucetContractAddr,
			EthereumFaucet,
			etherReq,
			walletAddr
		);
		setRequestLoading(false);
	}

	async function handleDonateEther() {
		setDonateLoading(true);
		await donateEther(
			FaucetContract.FaucetContractAddr,
			EthereumFaucet,
			etherToDonate
		);
		setDonateLoading(false);
	}

	async function handleShowBalance(){
		getBalance(
			FaucetContract.FaucetContractAddr,
			EthereumFaucet).then((res)=>{
				setFaucetBalance(res)
			})
		// console.log('faucet', faucetBalance)
	
	}

	return (
		<div className="App" style={{ padding: "50px" }}>
			<Typography variant="h4">Rinkeby Faucet</Typography>
			<span>Current Balance in Faucet {faucetBalance}</span>
			<TextField
				fullWidth
				onChange={(e) => setWalletAddr(e.target.value)}
				label="Wallet Address"
			/>
			<br />
			<br />
			<TextField
				fullWidth
				onChange={(e) => setEtherReq(e.target.value)}
				type="number"
				label="Ethers Required"
			/>
			<br />
			<br />

			{requestLoading && (
				<div>
					<p>Loading...</p>
					<br />
				</div>
			)}
			<Button
				onClick={handleGetEther}
				variant="contained"
				color="primary"
			>
				Submit
			</Button>
			<br />
			<br />
			<br />

			<Divider light />
			<br />
			<br />

			<TextField
				fullWidth
				onChange={(e) => setEtherDonate(e.target.value)}
				type="number"
				label="Ethers to donate"
			/>
			<br />
			<br />
			{donateLoading && (
				<div>
					<p>Loading...</p>
					<br />
				</div>
			)}
			<Button
				onClick={handleDonateEther}
				variant="contained"
				color="primary"
			>
				Submit
			</Button>
			<br />
			<br />
			<Button
				onClick={handleShowBalance}
				variant="contained"
				color="primary"
			>
				Update Balance
			</Button>
			
		</div>
	);
}

export default RequestForm;
