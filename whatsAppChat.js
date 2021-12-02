
function createLink() {
  const p = phone.value;
  wlink.href = `https://wa.me/${p}`;
}
function handleKeyPress(e) {
  if (e.key === 'Enter') {
    document.getElementById('wlink').focus();
  }
}

function showAddBox(e) {
  e?.preventDefault();
  console.log('clicked');
    addForm.style.display = 'block'
};

function addToPhoneBook(e) {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');

  const phoneBook = JSON.parse(localStorage.getItem('phone-book') || "[]");
  phoneBook.push({
    name:nameInput.value,
    phone:phoneInput.value,
  })
  localStorage.setItem("phone-book", JSON.stringify(phoneBook));

  refreshPhoneList();
};

function deleteContact(e){
  const phone = e.dataset.phone;
  const phoneBook = JSON.parse(localStorage.getItem('phone-book') || "[]");
  const newPhoneBook = phoneBook.filter( c => c.phone !== phone);
  localStorage.setItem("phone-book", JSON.stringify(newPhoneBook));

  refreshPhoneList();
}

function refreshPhoneList(){
  const list = document.getElementById('phone-list');
  list.innerHTML = "";

  const phoneBook = JSON.parse(localStorage.getItem('phone-book') || "[]");

  for(let i = 0; i < phoneBook.length; i++){
    const contact = phoneBook[i];
    const row = document.createElement('div');
    row.classList.add('phoneList');
    row.innerHTML = `
      <span>${contact.name}</span>
      <span>${contact.phone}</span>
      <button class="deleteBlock" data-phone="${contact.phone}" onclick="deleteContact(this)"><img class="btnDelete" src="images/delete.png"></button>
      <button class="deleteBlock"><a href="https://wa.me/${contact.phone}" id='startChat' ><img class="btnDelete" src="images/whatsapp_32.png"></a></button>
    `;
  
    list.appendChild(row);
  }
  const phoneBookContainer = document.getElementById('phoneBookContainer');
  
  if (phoneBook.length === 0) {
    phoneBookContainer.style.display = 'none';
  } else {
    phoneBookContainer.style.display = "block";
  }
}



function handleLoaded(){
  document.getElementById('phone').addEventListener("keypress", handleKeyPress);

  const phoneInput = document.getElementById('phone');
  const addButton = document.getElementById('btn');
  const isOutput = document.getElementById('isOutput');
  const addToList = document.getElementById('addToList');
  const nameInput = document.getElementById('name');
  const addPhoneBtn = document.getElementById('addPhoneBtn');
  const addForm = document.getElementById('addForm');
  

  addToList.addEventListener("click",  showAddBox);

  addPhoneBtn.addEventListener("click", addToPhoneBook);

  refreshPhoneList();
}

window.onload = handleLoaded;