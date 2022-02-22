var isRecording;
var start;
var record = [];

function getAllTunes() {
    const url = 'https://veff2022-h6.herokuapp.com/api/v1/tunes';
    axios.get(url)
        .then(function (response) {
            console.log("Success: ", response.data);
            const text = JSON.stringify(response.data);
            const textParser = JSON.parse(text);
            allTunes = response.data
            for (let index = 0; index < textParser.length; index++) {
                var tunes = document.createElement("option");
                var tuneName = document.createTextNode(textParser[index].name);
                tunes.appendChild(tuneName)
                document.getElementById("tunesDrop").appendChild(tunes)
            }
            return allTunes;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
}

document.addEventListener('keyup', playNoteFromKeyboard);
function playNoteFromKeyboard() {
    //event is deprecated but I found that since the replacement is still in development
    //it is still okay to use it.
    switch (event.key) {
        case "a":
            playNote('c4')
            break;
        case "w":
            playNote('c#4')
            break;
        case "s":
            playNote('d4')
            break;
        case "e":
            playNote('d#4')
            break;
        case "d":
            playNote('e4')
            break;
        case "f":
            playNote('f4')
            break;
        case "t":
            playNote('f#4')
            break;
        case "g":
            playNote('g4')
            break;
        case "y":
            playNote('g#4')
            break;
        case "h":
            playNote('a4')
            break;
        case "u":
            playNote('bb4')
            break;
        case "j":
            playNote('b4')
            break;
        case "k":
            playNote('c5')
            break;
        case "o":
            playNote('c#5')
            break;
        case "l":
            playNote('d5')
            break;
        case "p":
            playNote('d#5')
            break;
        case ";":
            playNote('e5')
            break;
        default:
            break;
    }
    event.preventDefault();
}

var synth = new Tone.Synth().toDestination();
function playTune() {
    var now = Tone.now();
    var element = document.getElementById("tunesDrop")
    var tuneNumber = parseInt(element.selectedIndex);
    const tune = allTunes[tuneNumber]
    for (let index = 0; index < tune.tune.length; index++) {
        const duration = tune.tune[index].duration;
        const note = tune.tune[index].note;
        const timing = tune.tune[index].timing;
        synth.triggerAttackRelease(note, duration, now + timing)
    }
}

function startRecording() {
    document.getElementById("recordbtn").disabled = true;
    document.getElementById("stopbtn").disabled = false;
    isRecording = true;
    start = Tone.now()
    record.tune = []
}

function stopRecording() {
    document.getElementById("recordbtn").disabled = false;
    document.getElementById("stopbtn").disabled = true;
    isRecording = false;
    if (record.name == '') {
        record.name = "Unamed tune";
    }
    else {
        record.name = document.getElementById("recordName").value
    }
    console.log(record)
    if (record.tune.length > 0) {
        postRecord( { 
            name: record.name,
            tune: record.tune 
            } )
    }
}

function postRecord(data) {
    const url = 'https://veff2022-h6.herokuapp.com/api/v1/tunes';
    axios.post(url, data)
        .then(function (response) {
            console.log(response);
            updateTunesList();
        })
        .catch(function (error) {
            console.log(error);
        });
}



function playNote(key) {
    var now = Tone.now();
    synth.triggerAttackRelease(key, "8n", now);
    if (isRecording == true) {
        record.tune.push({ note: key, duration: "8n", timing: Tone.now() - start });
    }
}

function updateTunesList(){
    allTunes = null;
    document.getElementById("tunesDrop").length = 0;
    getAllTunes();
}