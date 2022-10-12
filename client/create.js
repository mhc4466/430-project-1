//Gives user feedback as to what happened with their request
const handleResponse = async (response) => {
  const submit = document.querySelector("#submitButton");
  submit.classList.remove("is-success");
  submit.classList.remove("is-warning");
    
  switch (response.status) {
    case 201:
      submit.value = "Successfully Created!";
      submit.classList.add("is-success");
      break;
    case 204:
      submit.value = "Poll Updated";
      submit.classList.add("is-success");
      break;
    case 400:
      submit.value = 'Bad Request';
      submit.classList.add("is-warning");
      break;
    case 404:
      submit.value = 'Poll Not Found';
      submit.classList.add("is-warning");
      break;
    default:
      submit.value = 'Unexpected Response';
      break;
  }
};

//Takes filled data from the form and attempts to send it to the server
//Checks that all fields are filled first
const submitQuestion = async (form) => {
  const action = form.getAttribute('action');
  const method = form.getAttribute('method');

  const questionField = form.querySelector('#questionField');
  const choiceOneField = form.querySelector('#choiceOneField');
  const choiceTwoField = form.querySelector('#choiceTwoField');
  const choiceThreeField = form.querySelector('#choiceThreeField');
  const choiceFourField = form.querySelector('#choiceFourField');
  const url = window.location.href;
  const id = url.substring(url.indexOf('create?id=') + 10);
  const keyField = form.querySelector('#keyField');

  //If anything is missing, stop this function
  if (!questionField.value || 
    !choiceOneField.value || 
    !choiceTwoField.value || 
    !choiceThreeField.value || 
    !choiceFourField.value || 
    !keyField.value) {
      const submit = document.querySelector("#submitButton");
      submit.value = "Please Fill All Fields";
      submit.classList.remove("is-success");
      submit.classList.add("is-warning");
      return false;
    }

  let data = `question=${questionField.value}`;
  data += `&choiceOne=${choiceOneField.value}`;
  data += `&choiceTwo=${choiceTwoField.value}`;
  data += `&choiceThree=${choiceThreeField.value}`;
  data += `&choiceFour=${choiceFourField.value}`;
  data += `&id=${id}`
  data += `&key=${keyField.value}`;

  let response = await fetch(action, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: data
  });
  handleResponse(response);
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

  //Overrides going directly to a link, 
  //tells form to send data in form as request to server
  const addPoll = (e) => {
    e.preventDefault();
    submitQuestion(createPollForm);
    return false;
  }

  if (createPollForm) {
    createPollForm.addEventListener('submit', addPoll);
    createPollForm.addEventListener('input', () => {
      const submit = document.querySelector("#submitButton");
      submit.value = "Add Question";
      submit.classList.add("is-success");
      submit.classList.remove("is-warning");
    })
  }
}
window.onload = init;