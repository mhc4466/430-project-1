const handleResponse = async (response, doParse) => {
    const content = document.querySelector('#content');
    content.innerHTML = "";
    
    switch (response.status) {
      case 200:
        content.innerHTML = '<b>Success</b>';
        break;
      case 201: 
        content.innerHTML = '<b>Created</b>';
        break;
      case 204:
        content.innerHTML = '<b>Updated (No content)</b>';
        break;
      case 400:
        content.innerHTML = '<b>Bad request</b>';
        break;
      case 404:
        content.innerHTML = '<b>Not found</b>';
        break;
      default:
        content.innerHTML = '<b>Unexpected Error</b>';
        break;
    }
    
    if (doParse && response.status !== 204) {
      let obj = await response.json();
      console.log(obj);
      
      if (response.status === 200) {
        content.innerHTML += `<p>${JSON.stringify(obj["users"])}</p>`;
      } else if (response.status !== 204) {
        content.innerHTML += `<p>Message: ${obj.message}</p>`;
      }
    } 
};
const makePOSTRequest = async (form) => {
  const action = form.getAttribute('action');
  const method = form.getAttribute('method');
  const nameField = form.querySelector('#nameField');
  const ageField = form.querySelector('#ageField');
  const data = `name=${nameField.value}&age=${ageField.value}`;
  let response = await fetch(action, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: data
  });
  handleResponse(response, true);
};
const makeRequest = async (form) => {
  const urlField = form.querySelector('#urlField');
  const methodField = form.querySelector('#methodSelect');
  let action = urlField.value;
  let method = methodField.value;
  let response = await fetch(action, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  });
  handleResponse(response, method === 'get');
};
const init = () => {
  const nameForm = document.querySelector('#nameForm');
  const userForm = document.querySelector('#userForm');
  const addUser = (e) => {
    e.preventDefault();
    makePOSTRequest(nameForm);
    return false;
  }
  const requestUser = (e) => {
    e.preventDefault();
    makeRequest(userForm);
    return false;
  }
  nameForm.addEventListener('submit', addUser);
  userForm.addEventListener('submit', requestUser);
}
window.onload = init;