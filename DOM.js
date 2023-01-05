const UNFINISHED_LIST = "unfinished";
const FINISHED_LIST = "finished";
const BOOKSHELF_ITEMID = "itemId";

function addBookData() {
    const inputTitle = document.getElementById("booktitle").value;
    const inputAuthor = document.getElementById("bookauthor").value;
    const inputPublisher = document.getElementById("bookpublisher").value;
    const inputYear = document.getElementById("bookyear").value;
    const inputCheckbox = document.getElementById("cbdone").checked;

    const bs = makeList(inputTitle, inputAuthor, inputPublisher, inputYear, inputCheckbox);
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputPublisher, inputYear, inputCheckbox);

    bs[BOOKSHELF_ITEMID] = bookObject.id;
    bookshelf.push(bookObject);

    if (inputCheckbox) {
        document.getElementById(FINISHED_LIST).append(bs);
    }
    else {
        document.getElementById(UNFINISHED_LIST).append(bs);
    }
    updateBookDataToStorage();
}


function makeList(title, author, publisher, year, inputCheckbox) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerHTML = title;
    bookTitle.classList.add("judul");

    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = 'Author : ' + author;
    bookAuthor.classList.add("isi");

    const bookPublisher = document.createElement("p");
    bookPublisher.innerHTML = 'Publisher: ' + publisher;
    bookPublisher.classList.add("isi");

    const bookYear = document.createElement("p");
    bookYear.innerHTML = 'Year : ' + year;
    bookYear.classList.add("isi");

    const button = document.createElement('div');
    button.classList.add('action_card');
    button.append(btnEdit(), btnDelete(), btnDone(inputCheckbox));

    const container = document.createElement("div");
    container.classList.add("container")
    container.append(bookTitle, bookAuthor, bookPublisher, bookYear, button);

    return container;
}

function createButton(buttonType, buttonText, eventListener) {
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.classList.add(buttonType);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function btnDone(status) {
    return createButton('done-button', (status ? 'Unfinished' : 'Finished'), function (event) {
        if (status) {
            undoBookData(event.target.parentElement.parentElement);
        }

        else {
            finishBookData(event.target.parentElement.parentElement);
        }
    });
}

function btnEdit() {
    return createButton("edit-button", 'Edit', function (event) {
        editBookData(event.target.parentElement.parentElement);
    });
}

function btnDelete() {
    return createButton("delete-button", 'Delete', function (event) {
        removeBookData(event.target.parentElement.parentElement);
    });
}



function finishBookData(taskElement) {
    const bs = findBook(taskElement[BOOKSHELF_ITEMID]);
    bs.isFinish = true;

    const newBook = makeList(bs.title, bs.author, bs.publisher, bs.year, inputCheckbox = true);
    newBook[BOOKSHELF_ITEMID] = bs.id;

    const bookCompleted = document.getElementById(FINISHED_LIST);
    bookCompleted.append(newBook);

    taskElement.remove();
    updateBookDataToStorage();

}

function removeBookData(taskElement) {
    var result = confirm("Are you sure want to delete this nbook ?");
    if (result == false) {
        event.preventDefault();
    }

    else {
        const bookDataPosition = findBookIndex(taskElement[BOOKSHELF_ITEMID]);
        bookshelf.splice(bookDataPosition, 1);
        taskElement.remove();
        updateBookDataToStorage();
    }

}

function undoBookData(taskElement) {
    const bs = findBook(taskElement[BOOKSHELF_ITEMID]);
    bs.isFinish = false;

    const newBook = makeList(bs.title, bs.author, bs.publisher, bs.year, bs.isFinish);
    newBook[BOOKSHELF_ITEMID] = bs.id;

    const unFinished = document.getElementById(UNFINISHED_LIST);
    unFinished.append(newBook);

    taskElement.remove();
    updateBookDataToStorage();
}

function editBookData(taskElement) {
    const edit = document.querySelector('.editbookdata');
    edit.removeAttribute("hidden");

    const bs = findBook(taskElement[BOOKSHELF_ITEMID]);

    const editTitle = document.getElementById("e_booktitle");
    editTitle.value = bs.title;

    const editAuthor = document.getElementById("e_bookauthor");
    editAuthor.value = bs.author;

    const editPublisher = document.getElementById("e_bookpublisher");
    editPublisher.value = bs.publisher;

    const editYear = document.getElementById("e_bookyear");
    editYear.value = bs.year;

    const editFinish = document.getElementById("e_cbdone");
    editFinish.checked = bs.isFinish;

    const submitEdit = document.getElementById("e_btn_submit");
    submitEdit.addEventListener('click', function (event) {
        updateEditBook(editTitle.value, editAuthor.value, editPublisher.value, editYear.value, editFinish.checked, bs.id)

        const edit = document.querySelector('editbookdata');
        edit.setAttribute("hidden", '');
    });
}

function updateEditBook(updatetitle, updateauthor, updatepublisher, updateyear, updatefinsih, id) {
    const bookStorage = JSON.parse(localStorage[STORAGE_KEY]);
    const bookIndex = findBookIndex(id);

    bookStorage[bookIndex] = {
        id: id,
        title: updatetitle,
        author: updateauthor,
        publisher: updatepublisher,
        year: updateyear,
        isFinish: updatefinsih
    };

    const parsed = JSON.stringify(bookStorage);
    localStorage.setItem(STORAGE_KEY, parsed);

}