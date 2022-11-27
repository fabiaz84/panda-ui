const getBscTokenList = async (): Promise<any> => {
	return await (await fetch(`https://raw.githubusercontent.com/baofinance/tokenlists/main/bsc.json`)).json()
}

export default { getBscTokenList }
