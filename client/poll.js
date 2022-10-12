const writePoll = async (response) => {
    const pollHeading = document.querySelector("#pollHeading");
    pollHeading.innerHTML = '';

    if (response.status !== 200) {
        pollHeading.innerHTML += '<h1>Could not find poll. You may need to try again from the home page.</h2>';
    } else {
        let obj = await response.json();
        console.log(obj);
        let name = obj.name;
        pollHeading.innerHTML += `<h1>Poll: ${name}</h2>`
    }
}

const getPoll = async (id) => {
    let response = await fetch(`/resolve?id=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain'
        }
    });
    writePoll(response);
}

const vote = async () => {
    const form = document.querySelector('#pollForm');

    const action = form.getAttribute('action');
    const method = form.getAttribute('method');

    //https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
    if (!form.querySelector('input[name="poll"]:checked')) {
        document.querySelector("#warn").innerHTML = "Please select an option";
        return false;
    }

    const value = form.querySelector('input[name="poll"]:checked').value;
    const url = window.location.href;
    const id = url.substring(url.indexOf('poll?id=') + 8);

    let data = `id=${id}`;
    data += `&choice=${value}`;

    let response = await fetch(action, {
        method: method,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        },
        body: data
    });

    //Warn of error if that somehow happens
    if (response.status !== 200 && response.status !== 204) {
        document.querySelector("#poll").innerHTML = `Sorry, but there was a problem recording your answer.
        You may go back and try again.`;
    //Prevent the user from voting again, and throw up a thank you screen
    } else {
        let answered = {};
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
        if (localStorage.getItem("answered")) {
            let test = JSON.parse(localStorage.getItem("answered"));
            //Only read localstorage if it is an object and not, for example, a string
            if (typeof test === 'object') {
                answered = test;
            }
        }
        answered[id] = Date.now();
        localStorage.setItem("answered", JSON.stringify(answered));
        document.querySelector("#poll").innerHTML = "Thank you for answering!";
    }
    return false;
}

//Parse the received response for the poll and create a form out of it
//Display the form onto the page
const handlePoll = async (response) => {
  let poll = document.querySelector('#poll');

  //Error if poll could not be found
  if (response.status !== 200) {
    poll.innerHTML += '<h2>Could not retrieve poll</h2>';
    //Title the page with the poll's name if poll is found
  } else {
    let obj = await response.json();
    let question = obj.question;
    document.querySelector("#pollHeading").innerHTML = `Poll: ${question.question}`;

    //Grabs the "answered" object from localstorage to check if user already responded
    const answered = JSON.parse(localStorage.getItem("answered"));
    if (answered && answered[question.id]) {
        document.querySelector("#poll").innerHTML = "Your response has already been recorded";
    } else {
        const form = document.querySelector('#pollForm');
        form.id = "pollForm";
        form.action = "/vote";
        form.method = "post";
        form.innerHTML = 
        `<div class="field is-horizontal">
            <div class="control">
                <input class="radio" type="radio" id="choiceOneRadio" name="poll" value="1">
            </div>
            <label class="label" for="choiceOne">  ${question.choiceOne.text}</label>
        </div>
        <div class="field is-horizontal">
            <div class="control">
                <input class="radio" type="radio" id="choiceTwoRadio" name="poll" value="2">
            </div>
            <label class="label" for="choiceTwo">  ${question.choiceTwo.text}</label>
        </div>
        <div class="field is-horizontal">
            <div class="control">
                <input class="radio" type="radio" id="choiceThreeRadio" name="poll" value="3">
            </div>
            <label class="label" for="choiceThree">  ${question.choiceThree.text}</label>
        </div>
        <div class="field is-horizontal">
            <div class="control">
                <input class="radio" type="radio" id="choiceFourRadio" name="poll" value="4">
            </div>
            <label class="label" for="choiceFour">  ${question.choiceFour.text}</label>
        </div>
        <div class="control">
            <input class="button" type="submit" value="Submit choice" />
        </div>`;
        
        poll.appendChild(form);
        const sendVote = (e) => {
            e.preventDefault();
            vote(form);
            return false;
        }

        form.addEventListener('submit', sendVote);
        
    }
  }
  return false;
}

const makeRequest = async (id) => {
    let response = await fetch(`/question?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });
    handlePoll(response);
  };

const init = () => {
    //Grab the ID of the poll from the URL
    //Theoretically, a URL will only properly load if the ID is correct
    //https://www.w3schools.com/js/js_window_location.asp 
    const url = window.location.href;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    //Grab the ID as everything past "results?id="
    const id = url.substring(url.indexOf('poll?id=') + 8);

    makeRequest(id);

    const sendVote = (e) => {
        e.preventDefault();
        return false;
    }
    document.querySelector('#pollForm').addEventListener('submit', sendVote)
};

window.onload = init;