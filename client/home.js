const updatePrompt = (source) => {
    const prompt = document.querySelector('#prompt');
    
    prompt.innerHTML = "";
    let form = document.createElement('form');

    //For responding to or viewing results of a poll, prompt user for extra details
    switch (source) {
        case 'respond':
            prompt.innerHTML += "<h2>Enter Poll ID</h2>";
            form.id = "respondPollForm";
            form.action = "/poll";
            form.method = "get";
            form.innerHTML += 
                `<label for="id">ID: </label>
                <input id="idField" type="text" name="id" value="ABC123"/>
                <input type="submit" value="Find Poll" />`;
            prompt.appendChild(form);
            break;
        case 'create':
            let x = 1;
            break;
        case 'results':
            prompt.innerHTML += "<h2>Enter Poll ID</h2>";
            form.id = "resultsPollForm";
            form.action = "/results";
            form.method = "get";
            form.innerHTML += 
                `<label for="id">ID: </label>
                <input id="idField" type="text" name="id" value="ABC123"/>
                <input type="submit" value="Find Poll Results" />`;
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

    respondButton.addEventListener('click', () => updatePrompt('respond'));
    createButton.addEventListener('click', () => updatePrompt('create'));
    resultsButton.addEventListener('click', () => updatePrompt('results'));
};

window.onload = init;