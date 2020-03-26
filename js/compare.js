class CompanyCompare {
	constructor(company, element) {
		this.company = company;
		this.element = element;
	}

	createCompareButton() {
		const compBtn = document.createElement("a");
		compBtn.textContent = "Compare companies";
		compBtn.classList.add("run-compare", "btn");
		this.element.insertAdjacentElement("beforeend", compBtn);
		this.compBtn = compBtn;
		return compBtn;
	}

	clearPage() {
		const elements = compareBar.getElementsByClassName("deleteme");

		while (elements[0]) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}

	showError() {
		const error = document.createElement("div");
		error.textContent = "MAX 3";
		error.classList.add("warning", "deleteme");
		this.element.insertAdjacentElement("beforeend", error);
	}

	addButton() {
		const newBtn = document.createElement("button");
		newBtn.classList.add("company-compare-btn", "deleteme", "btn");
		newBtn.textContent = this.company.symbol;
		const quitBtn = document.createElement("button");
		quitBtn.classList.add("quit-btn", "btn");
		quitBtn.textContent = "X";
		newBtn.appendChild(quitBtn);
		this.element.insertAdjacentElement("afterbegin", newBtn);
		this.quitBtn = quitBtn;
		this.newBtn = newBtn;
		return this.quitBtn;
	}

	removeButton() {
		this.newBtn.remove();
	}
}
