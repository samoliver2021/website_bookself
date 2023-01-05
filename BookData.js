const STORAGE_KEY = "BOOKSHELF_APPS";
let bookshelf = [];

function isStorageExist() {
	if (typeof (Storage) === undefined) {
		alert("Your browser don't support local storage");
		return false;
	}
	return true;
}

function saveBookData() {
	const parsed = JSON.stringify(bookshelf);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadBookDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serializedData);

	if (data !== null)
		bookshelf = data;

	document.dispatchEvent(new Event("ondataloaded"));
}

function updateBookDataToStorage() {
	if (isStorageExist()) {
		document.dispatchEvent(new Event("ondataupdate"));
		saveBookData();

	}

}

function composeBookObject(title, author, publisher, year, isFinish) {
	return {
		id: +new Date(),
		title,
		author,
		publisher,
		year,
		isFinish
	};
}

function findBook(bookid) {
	for (bs of bookshelf) {
		if (bs.id === bookid)
			return bs;
	}
	return null;
}

function findBookIndex(bookid) {
	let index = 0
	for (bs of bookshelf) {
		if (bs.id === bookid)
			return index;

		index++;
	}
	return -1;
}

function refreshDataFromBook() {
	const unfin = document.getElementById(UNFINISHED_LIST);
	const fin = document.getElementById(FINISHED_LIST);

	for (bs of bookshelf) {
		const newList = makeList(bs.title, bs.author, bs.publisher, bs.year, bs.isFinish);
		newList[BOOKSHELF_ITEMID] = bs.id;

		if (bs.isFinish) {
			fin.append(newList);
		} else {
			unfin.append(newList);
		}
	}
}