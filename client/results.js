const writePollName = async (response) => {
    const promptHeading = document.querySelector("#promptHeading");
    promptHeading.innerHTML = '';

    if (response.status !== 200) {
        promptHeading.innerHTML += '<h2>Could not find poll. You may need to try again from the home page.</h2>';
    } else {
        let obj = await response.json();
        console.log(obj);
        let name = obj.name;
        promptHeading.innerHTML += `<h2>Please enter key for poll: ${name}</h2>`
    }
}

const getPollName = async (id) => {
    let response = await fetch(`/resolve?id=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain'
        }
    });
    writePollName(response);
}

const init = () => {
    const promptHeading = document.querySelector("#promptHeading");

    //Grab the ID of the poll from the URL
    //Theoretically, a URL will only properly load if the ID is correct
    //https://www.w3schools.com/js/js_window_location.asp 
    const url = window.location.href;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    //Grab the ID as everything past "results?id="
    const id = url.substring(url.indexOf('results?id=') + 11);

    getPollName(id);
};

window.onload = init;