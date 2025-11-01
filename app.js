
document.addEventListener('DOMContentLoaded', () => {
  // Use the data directly (no JSON.parse)
  const stocksData = stocks;
  const userData = users;

  generateUserList(userData, stocksData);

  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  // DELETE USER
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const userId = document.querySelector('#userID').value;

    const userIndex = userData.findIndex(user => user.id == userId);
    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);

      document.querySelector('.portfolio-list').innerHTML = '';
      document.querySelector('#userForm').reset();
    }
  });

  // SAVE USER UPDATES
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userData[i].user.firstname = document.querySelector('#firstname').value;
        userData[i].user.lastname = document.querySelector('#lastname').value;
        userData[i].user.address = document.querySelector('#address').value;
        userData[i].user.city = document.querySelector('#city').value;
        userData[i].user.email = document.querySelector('#email').value;

        generateUserList(userData, stocksData);
      }
    }
  });
});



function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${user.lastname}, ${user.firstname}`;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const user = users.find(u => u.id == userId);
  populateForm(user);
  renderPortfolio(user, stocks);
}

function populateForm(data) {
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';

  portfolio.forEach(({ symbol, owned }) => {
    const container = document.createElement('div');
    container.classList.add('portfolio-item');

    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = `Shares: ${owned}`;
    actionEl.innerText = 'View';
    actionEl.setAttribute('id', symbol);

    container.appendChild(symbolEl);
    container.appendChild(sharesEl);
    container.appendChild(actionEl);
    portfolioDetails.appendChild(container);
  });

  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}

function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);
  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;
  document.querySelector('#logo').src = `logos/${symbol}.svg`;
}

