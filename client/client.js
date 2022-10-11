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

const handleResult = async (response) => {
  handleResponse(response);
  let results = document.querySelector('#results');
  results.innerHTML = '';

  if (response.status !== 200) {
    results.innerHTML += '<h2>Could not retrieve results</h2>';
  } else {
    let obj = await response.json();
    console.log(obj);
    let result = obj.result;

    results.innerHTML += '<h2>Results:</h2>';
    results.innerHTML += `<h3>${result.question}</h3>`;
    results.innerHTML += `<b>${result.choiceOne.text}: </b>${result.choiceOne.votes}<br>`;
    results.innerHTML += `<b>${result.choiceTwo.text}: </b>${result.choiceTwo.votes}<br>`;
    results.innerHTML += `<b>${result.choiceThree.text}: </b>${result.choiceThree.votes}<br>`;
    results.innerHTML += `<b>${result.choiceFour.text}: </b>${result.choiceFour.votes}<br>`;
  }

}

const submitQuestion = async (form) => {
  const action = form.getAttribute('action');
  const method = form.getAttribute('method');

  const questionField = form.querySelector('#questionField');
  const choiceOneField = form.querySelector('#choiceOneField');
  const choiceTwoField = form.querySelector('#choiceTwoField');
  const choiceThreeField = form.querySelector('#choiceThreeField');
  const choiceFourField = form.querySelector('#choiceFourField');
  const keyField = form.querySelector('#keyField');

  let data = `question=${questionField.value}`;
  data += `&choiceOne=${choiceOneField.value}`;
  data += `&choiceTwo=${choiceTwoField.value}`;
  data += `&choiceThree=${choiceThreeField.value}`;
  data += `&choiceFour=${choiceFourField.value}`;
  data += `&key=${keyField.value}`;

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
  const action = form.getAttribute('action');
  const method = form.getAttribute('method');

  const keyField = form.querySelector('#keyField');

  const data = `key=${keyField.value}`;

  let response = await fetch(action, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: data
  });
  handleResult(response);
};

const init = () => {
  const createPollForm = document.querySelector('#createPollForm');
  const getPollForm = document.querySelector('#getResultsForm');

  //Overrides going directly to a link, 
  //tells form to send data in form as request to server
  const addPoll = (e) => {
    e.preventDefault();
    submitQuestion(createPollForm);
    return false;
  }
  const getResults = (e) => {
    e.preventDefault();
    makeRequest(getPollForm);
    return false;
  }

  //
  if (createPollForm && getPollForm) {
    createPollForm.addEventListener('submit', addPoll);
    getPollForm.addEventListener('submit', getResults);
  }
}
window.onload = init;