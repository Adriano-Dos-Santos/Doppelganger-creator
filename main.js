const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('keydown', function (event){
  if (event.key === 'Enter') {
  if (event.target.classList.contains('tags-input')) {
    console.log(event.target);

    event.preventDefault();

    let skill = document.createElement('li');
    let tagContent = event.target.value.trim();

    skill.innerText = tagContent;
    skill.innerHTML += `<button class="delete-button">X</button>`;

    console.log(skill);

    event.target.previousElementSibling.appendChild(skill);
    event.target.value = '';
  }
  };
});
