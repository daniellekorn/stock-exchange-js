class SearchFunctions {
	async searchNasdaq(query) {
		let response = await fetch(
			`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`
		);
		let data = await response.json();
		return data;
	}

	async optimizedSearch(query) {
		const data = await this.searchNasdaq(query);
		let triplets = [];
		triplets.push([]);
		let j = 0;
		for (let i = 1; i < data.length; i++) {
			triplets[j].push(data[i - 1].symbol);
			// as soon as there are 3 symbols in an array,
			// push new empty array and increment j to begin pushing to new "triplet"
			if (i % 3 == 0) {
				triplets.push([]);
				j++;
			}
		}
		const tripletStrings = triplets.map((triple) => {
			return triple.join();
		});

		try {
			let profileData = await Promise.all(
				tripletStrings.map((item) =>
					fetch(
						`https://financialmodelingprep.com/api/v3/company/profile/${item}`
					)
						.then((r) => r.json())
						.catch((error) => ({ error, url }))
				)
			);
			/*account for differences in API index names*/
			let allTogether = [];
			for (let i = 0; i < profileData.length; i++) {
				/*mult. req at once vs. single req*/
				if (i < profileData.length - 1) {
					allTogether.push(profileData[i].companyProfiles);
				} else {
					allTogether.push(profileData[i]);
				}
			}
			let merged = [].concat.apply([], allTogether);
			return merged;
		} catch (err) {
			console.log(err);
		}
	}
}