const getPricesByCoinApiIdsAndCurrency = async (identifiers: string[], currency: string): Promise<any> => {
	const identifiersQuery = Object(identifiers).join(',')
	return await (await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${identifiersQuery}&vs_currencies=usd`)).json()
}

export default { getPricesByCoinApiIdsAndCurrency }
