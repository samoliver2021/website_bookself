function resetalert() {
  alert("Book data has been reset successfully");
}

const closeForm = document.getElementById('close');
closeForm.addEventListener('click', function () {
  const editForm = document.querySelector('.editbookdata');
  editForm.setAttribute("hidden", '');
})

const closeAddForm = document.getElementById('btn_close');
closeAddForm.addEventListener('click', function () {
  const addForm = document.querySelector('.addformdata');
  addForm.setAttribute("hidden", "");
})

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("addform");
  submitForm.addEventListener("submit", function () {
    addBookData();
    alert("Book data has been recorded, enjoy the book ! ");

  });

  if (isStorageExist()) {
    loadBookDataFromStorage();

  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data saved successfully.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBook();
});

document.addEventListener("onupdatedata", () => {
});

function filter() {
  var value, name, profile, i;
  value = document.getElementById("search").value.toUpperCase();
  profile = document.getElementsByClassName("container");

  for (i = 0; i < profile.length; i++) {
    name = profile[i].getElementsByTagName("h3");
    if (name[0].innerHTML.toUpperCase().indexOf(value) > -1) {
      profile[i].style.display = "flex";
    } else {
      profile[i].style.display = "none";
    }
  }
}

function openaddform() {
  const open = document.querySelector('.addformdata');
  open.removeAttribute("hidden");
}