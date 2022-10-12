//Sends a head request to see if a poll exists
const checkForPoll = async (id) => {
    let response = await fetch(`/question?id=${id}`, {
        method: 'head'
    });
    if (response.status < 300) {
        return true;
    } else {
        return false;
    }
}

//Callback for both Respond and Results because they have similar enough behavior
//Create has too different behavior to combine
//Manages checking for whether a poll exists before answering or viewing results
const respondResultsCallback = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#promptForm");
    const action = form.getAttribute('action');

    const idField = form.querySelector('#idField');
    if (await checkForPoll(idField.value)) {
        window.location.href = `${action}?id=${idField.value}`;
    } else {
        //Looks for warn, creates it if it doesn't exist.
        let warn = document.querySelector("#warn") || document.createElement('h3');
        warn.id = "warn";
        warn.innerHTML = "Couldn't find a poll with that ID";
        document.querySelector('#prompt').appendChild(warn);
    }
}

//Callback for Create, forbids entering creator for an existing ID
//(updates are only acceptable shortly after creation)
const createCallback = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#promptForm");
    const action = form.getAttribute('action');

    const idField = form.querySelector('#idField');
    if (!await checkForPoll(idField.value)) {
        window.location.href = `${action}?id=${idField.value}`;
    } else {
        //Looks for warn, creates it if it doesn't exist.
        let warn = document.querySelector("#warn") || document.createElement('h3');
        warn.id = "warn";
        warn.innerHTML = "There is already an active poll with that ID";
        document.querySelector('#prompt').appendChild(warn);
    }
}

//Handles creating a prompt as a form below the buttons when clicked
//Each form becomes capable of querying the server
const updatePrompt = async (source) => {
    const prompt = document.querySelector('#prompt');
    
    prompt.innerHTML = "";
    let form = document.createElement('form');

    //For responding to, creating, or viewing results of a poll, prompt user for extra details
    switch (source) {
        case 'respond':
            prompt.innerHTML += "<h2>Enter Poll ID</h2>";
            form.id = "promptForm";
            form.action = "/poll";
            form.method = "get";
            form.innerHTML += 
                `<div class="field">
                    <div class="control">
                        <input class="input" id="idField" type="text" name="id" value="example"/>
                    </div>
                    <div class="control">
                        <input class="button" type="submit" value="Find Poll" />
                    </div>
                </div>`;
            form.addEventListener('submit', respondResultsCallback);
            form.querySelector("#idField").addEventListener('input', () => {
                if (document.querySelector("#warn")) {
                    document.querySelector("#warn").innerHTML = "";
                }
            });
            prompt.appendChild(form);
            break;
        case 'create':
            prompt.innerHTML += "<h2>Create an ID For Your Poll</h2>";
            form.id = "promptForm";
            form.action = "/create";
            form.method = "get";
            form.innerHTML += 
                `<div class="field">
                    <div class="control">
                        <input class="input" id="idField" type="text" name="id" value="example"/>
                    </div>
                    <div class="control">
                        <input class="button" type="submit" value="Begin Creating" />
                    </div>
                </div>`;
            form.addEventListener('submit', createCallback);
            form.querySelector("#idField").addEventListener('input', () => {
                if (document.querySelector("#warn")) {
                    document.querySelector("#warn").innerHTML = "";
                }
            });
            prompt.appendChild(form);
            break;
        case 'results':
            prompt.innerHTML += "<h2>Enter Poll ID</h2>";
            form.id = "promptForm";
            form.action = "/results";
            form.method = "get";
            form.innerHTML += 
                `<div class="field">
                    <div class="control">
                        <input class="input" id="idField" type="text" name="id" value="example"/>
                    </div>
                    <div class="control">
                        <input class="button" type="submit" value="Find Poll Results" />
                    </div>
                </div>`;
            form.addEventListener('submit', respondResultsCallback);
            form.querySelector("#idField").addEventListener('input', () => {
                if (document.querySelector("#warn")) {
                    document.querySelector("#warn").innerHTML = "";
                }
            });
            prompt.appendChild(form);
            break;
        default:
            console.log("Unexpected client error");
            break;
    }
}

const init = () => {
    const respondButton = document.querySelector('#respondButton');
    const createButton = document.querySelector('#createButton');
    const resultsButton = document.querySelector('#resultsButton');

    //Each button pulls down their respective prompt to move on to the next step
    respondButton.addEventListener('click', () => updatePrompt('respond'));
    createButton.addEventListener('click', () => updatePrompt('create'));
    resultsButton.addEventListener('click', () => updatePrompt('results'));

    //This makes each button darken when selected
    respondButton.addEventListener('click', () => {
        respondButton.classList.add('is-link');
        createButton.classList.remove('is-link');
        resultsButton.classList.remove('is-link');
    });
    createButton.addEventListener('click', () => {
        respondButton.classList.remove('is-link');
        createButton.classList.add('is-link');
        resultsButton.classList.remove('is-link');
    });
    resultsButton.addEventListener('click', () => {
        respondButton.classList.remove('is-link');
        createButton.classList.remove('is-link');
        resultsButton.classList.add('is-link');
    });
};

window.onload = init;