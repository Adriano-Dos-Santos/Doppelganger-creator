const cardContainer = document.querySelector('.card-container');
const form = document.querySelector('.characterForm');

// Tag list implementation
cardContainer.addEventListener('keydown', function (event){
  if (event.key === 'Enter') {
  if (event.target.classList.contains('tags-input')) {

    event.preventDefault();

    let tag = document.createElement('li');
    let tagContent = event.target.value.trim();
    let tagsList = event.target.parentElement.querySelector('.tags');
    if (tagContent) {

    tag.innerText = tagContent;
    tag.innerHTML += `<button class="delete-button">X</button>`;


    tagsList.appendChild(tag);
    event.target.value = '';
    };
  }
  };
});

// tag list delete button
cardContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button')) {
    event.preventDefault();
    let tagElement = event.target.parentElement;
    let tagParent = tagElement.parentElement;
    tagParent.removeChild(tagElement);
  }
});

// name title real time replace
cardContainer.addEventListener('keydown', function (event) {
  if (event.target.classList.contains('name')) {
    let target = event.target;
    let key = event.key;
    const letterRegex = new RegExp('[a-zA-Z]');
    let nameTitle = target.closest('section').querySelector('h2');

    // clear name placeholder
    if (nameTitle.innerText === 'name' && letterRegex.test(key) && key.length === 1) {
      nameTitle.innerText = '';
    }

    // replace name with key input
    if (letterRegex.test(key) && key.length === 1) {
    nameTitle.innerText += key;
    }

    // delete name title in realtime
    if (key === 'Backspace' && nameTitle.innerText !== 'name') {
      let newName = nameTitle.innerText.slice(0,-1);
      nameTitle.innerText = newName;
      console.log(newName);
      if (nameTitle.innerText === '') {
        nameTitle.innerText = 'name';
      }
    }
  }
});
