//Edit the HTML to show the name
const writePollName = async (response) => {
    const promptHeading = document.querySelector("#promptHeading");
    promptHeading.innerHTML = '';

    if (response.status !== 200) {
        promptHeading.innerHTML += '<h2>Could not find poll. You may need to try again from the home page.</h2>';
    } else {
        let obj = await response.json();
        console.log(obj);
        let name = obj.name;
        promptHeading.innerHTML += `<h2>Please enter key for poll: "${name}"</h2>`
    }
}

//Simple grab for poll name, not the results (which are hidden)
const getPollName = async (id) => {
    let response = await fetch(`/resolve?id=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain'
        }
    });
    writePollName(response);
}

//Takes response and gives user feedback, accounting for possible responss
const handleResult = async (response) => {
  let results = document.querySelector('#results');
  results.innerHTML = '';

  switch (response.status) {
    case 200:
        let obj = await response.json();
        let result = obj.result;

        results.innerHTML += 
        `<h2>Responses to "${result.question}": </h2>
        <h3><b>${result.choiceOne.text}: </b>${result.choiceOne.votes}</h3>
        <h3><b>${result.choiceTwo.text}: </b>${result.choiceTwo.votes}</h3>
        <h3><b>${result.choiceThree.text}: </b>${result.choiceThree.votes}</h3>
        <h3><b>${result.choiceFour.text}: </b>${result.choiceFour.votes}</h3>
        `;
        break;
    case 400:
        results.innerHTML += '<h2>Please enter a key</h2>';
        break;
    case 403:
        results.innerHTML += '<h2>Incorrect key</h2>';
        break;
    case 404:
        results.innerHTML += '<h2>No poll with given ID exists, return to home page</h2>';
        break;
    default:
        results.innerHTML += '<h2>Unexpected error</h2>'
        break;
  }
}

const makeRequest = async (id, form) => {
    const action = form.getAttribute('action');
    const method = form.getAttribute('method');
  
    const keyField = form.querySelector('#keyField');
    let data = `id=${id}`;
    data += `&key=${keyField.value}`;

  
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
    const getResultsForm = document.querySelector('#getResultsForm');

    //Grab the ID of the poll from the URL
    //Theoretically, a URL will only properly load if the ID is correct
    //https://www.w3schools.com/js/js_window_location.asp 
    const url = window.location.href;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    //Grab the ID as everything past "results?id="
    const id = url.substring(url.indexOf('results?id=') + 11);

    const getResults = (e) => {
        e.preventDefault();
        makeRequest(id, getResultsForm);
        return false;
    }
    if (getResultsForm) {
        getResultsForm.addEventListener('submit', getResults);
    }
    getPollName(id);
};

window.onload = init;