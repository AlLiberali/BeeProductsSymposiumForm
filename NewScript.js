const DEBUG = true;
const BASE_URL = "https://symposium.modsec.uk.eu.org/";
function init() {
	isAlive();
	initButtons();
}
function isAlive() {
	const func = (i) => {
		switch (i) {
			case 0:
				document.body.removeChild(document.getElementById("warning"));
				document.body.firstElementChild.style["display"] = "flex";
				break;
		}
	};
	if (DEBUG)
		func(0);
	else
		fetch(BASE_URL + "isAlive", { mode: "no-cors" })
			.then(response => response.status === 200 ? response.text() : "127", null)
			.then(t => parseInt(t), null)
			.then(func, null);
}
function initButtons() {
	if (document.getElementById("authorSet").children.length == 1)
		document.getElementById("removeAuthor").setAttribute("disabled", "");
	if (document.getElementById("keywordSet").children.length == 1)
		document.getElementById("removeKeyword").setAttribute("disabled", "");
}
function addAuthorListener() {
	let set = document.getElementById("authorSet");
	let clone = set.lastElementChild.cloneNode(true);
	document.getElementById("removeAuthor").removeAttribute("disabled");
	let index = parseInt(clone.lastElementChild.lastElementChild.value);
	clone.lastElementChild.lastElementChild.checked = false;
	let inserted = set.appendChild(clone);
	inserted.removeAttribute("id");
	index++;
	inserted.lastElementChild.lastElementChild.value = index;
	inserted.firstElementChild.innerText = index.toString().replaceAll('1', '\u06F1')
		.replaceAll('2', '\u06F2')
		.replaceAll('3', '\u06F3')
		.replaceAll('4', '\u06F4')
		.replaceAll('5', '\u06F5')
		.replaceAll('6', '\u06F6')
		.replaceAll('7', '\u06F7')
		.replaceAll('8', '\u06F8')
		.replaceAll('9', '\u06F9')
		.replaceAll('0', '\u06F0');
	inserted.children[1].children[0].value = "";
	inserted.children[1].children[1].value = "";
}
function removeAuthorListener() {
	let set = document.getElementById("authorSet");
	if (set.children.length == 2) {
		document.getElementById("removeAuthor").setAttribute("disabled", "");
	}
	set.removeChild(set.lastElementChild);
}
function addKeywordListener() {
	let set = document.getElementById("keywordSet");
	let clone = document.getElementById("keywordInit").cloneNode(true);
	document.getElementById("removeKeyword").removeAttribute("disabled");
	let inserted = set.appendChild(clone);
	inserted.removeAttribute("id");
	inserted.children[0].value = "";
}
function removeKeywordListener() {
	let set = document.getElementById("keywordSet");
	if (set.children.length == 2) {
		document.getElementById("removeKeyword").setAttribute("disabled", "");
	}
	set.removeChild(set.lastElementChild);
}
function send() {
	let title = document.getElementById("title").value;
	let abstract = document.getElementById("abstract").value;
	let email = document.getElementById("email").value;
	let telephone = document.getElementById("telephone").value;
	let keywords = document.getElementsByClassName("keyword");
	let affiliations = document.getElementsByClassName("affiliation");
	let names = document.getElementsByClassName("name");
	let respondant = parseInt(document.querySelector("input[name=respondant]:checked")?.value);
	let empty = title === "" || abstract === "" || email === "" || telephone === "" || isNaN(respondant);
	let authorNames = [];
	for (let i = 0; i < names.length; i++) {
		if (names[i].value === "") {
			empty = true;
			break;
		}
		authorNames.push(names[i].value);
	}
	let authorAffiliations = [];
	for (let i = 0; i < affiliations.length; i++) {
		if (affiliations[i].value === "") {
			empty = true;
			break;
		}
		authorAffiliations.push(affiliations[i].value);
	}
	let keywordArray = [];
	for (let i = 0; i < keywords.length; i++) {
		if (keywords[i].value === "") {
			empty = true;
			break;
		}
		keywordArray.push(keywords[i].value);
	}
	if (empty) {
		alert("همه موارد الزامی است. لطفا فرم را تکمیل کنید.\nدر صورت اضافی بودن ورودی برای اسامی نویسندگان یا کلمات کلیدی می\u200Cتوانید از دکمه منفی مربوطه استفاده کنید.");
		return;
	}
	let obj = {
		Title: title,
		Respondant: respondant - 1,
		Authors: authorNames,
		Affiliations: authorAffiliations,
		Email: email,
		Telephone: telephone,
		Abstract: abstract,
		Keywords: keywordArray
	};
	
}