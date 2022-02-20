

function getAllTunes() {
    //The URL to which we will send the request
    var url = 'https://veff2022-h6.herokuapp.com/api/v1/tunes';

    //Perform a GET request to the url
    axios.get(url)
        .then(function (response) {
            //When successful, print the received data
            //console.log("Success: ", response.data);
            //response.data is an array if the request was successful, so you could iterate through it using a for loop.
            const text = JSON.stringify(response.data);
            const textParser = JSON.parse(text);
            for (let index = 0; index < textParser.length; index++) {
                console.log(textParser[index].name)
                var tunes = document.createElement("option");
                var tuneName = document.createTextNode(textParser[index].name);
                tunes.appendChild(tuneName)
                document.getElementById("tunesDrop").appendChild(tunes)
            }
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}


//We initialise the synthesiser
var synth = new Tone.Synth().toDestination();
function playNote(key) {
    //initialise a timer to decide when to play individual notes
    var now = Tone.now();

    //Play a C4 as an 8th note
    synth.triggerAttackRelease(key,"8n", now);

}




