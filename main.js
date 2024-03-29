const cardContainer = document.querySelector('.card-container');

// Tag list implementation
cardContainer.addEventListener('keydown', function(event) {
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

// tag element delete button implementation
cardContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    event.preventDefault();
    let tagElement = event.target.parentElement;
    let tagParent = tagElement.parentElement;
    tagParent.removeChild(tagElement);
  }
});

// name title real time replace
cardContainer.addEventListener('keydown', function(event) {
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
      let newName = nameTitle.innerText.slice(0, -1);
      nameTitle.innerText = newName;
      if (nameTitle.innerText === '') {
        nameTitle.innerText = 'name';
      }
    }
  }
});

// FORM DATA RETRIVAL

const formsContainer = document.querySelector('.card-container');
const characterData = [];

// send button confirm style
formsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('send-character-button')) {
    event.preventDefault();
    const button = event.target;
    button.style.backgroundColor = 'green';
  }
});

// get form data


formsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('send-character-button')) {
    event.preventDefault();
    const button = event.target;
    const form = button.parentElement;
    const elements = form.elements;

    let nameValue = elements.name.value;
    let ageValue = elements.age.value;
    let classValue = elements.class.value;
    const skillList = form.querySelector('.tags').children;
    let skillsValue = [];
    for (let child of skillList) {
      const value = child.childNodes[0].nodeValue.trim();
      skillsValue.push(value);
    }


    const formsCollection = Array.from(document.forms);
    const formIndex = formsCollection.indexOf(form);
    characterData.splice(formIndex, 0, {
      characterName: nameValue,
      age: ageValue,
      class: classValue,
      skills: skillsValue,
    });

    button.style.pointerEvents = 'none';
    console.log(`character ${formIndex + 1} saved`);
  }
});

// create doppelganger

const doppelganger = {};
const generateButton = document.querySelector('#generateButton');

function confirmCharacterData(data) {
  let status = true;
  for (let character of data) {
       if (!character) {
         status = false;
       };
    };
  if (data.length !== 3) {
      status = false;
  };

  console.log(status);
  console.log(`confirmation ended`);
  return status;
};

function errorWarning(status) {
  if (status) {
    return true;
  } else {
    const label = document.querySelector('.generate-button-label');
    label.style.display = 'block';
    label.textContent = 'please send all characters';
    return false;
  }

};



generateButton.addEventListener('click', () => {
  console.log(`button clicked`);
  if (errorWarning(confirmCharacterData(characterData))) {
    const doppelgangerContainer = document.querySelector('.doppelganger-container');
    doppelgangerContainer.style.display = 'flex';
  };

});
