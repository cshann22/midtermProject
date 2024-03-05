function appendTable(data) {
    let mainContainer = document.getElementById("start");

    let extra = [];

    for (let i = 0; i < data.elements.length; i++) {
        console.log(data.elements[i]);
        let tr = document.createElement("tr");
        tr.innerHTML = tr.innerHTML + `<td class="${data.elements[i].category}">${data.elements[i].symbol}</td>
        `;
        // for (let j = i; data.elements[j].group != 1; j++) {
        //     tr.innerHTML = tr.innerHTML + `<td class="${data.elements[j].category}">${data.elements[j].symbol}</td>
        //     `;
        //     i++;
        // }
        do {
            i++;
            if (data.elements[i].group == 3 && data.elements[i].period >= 6) {
                extra.push(data.elements[i]);
                continue;
            }
            else if (data.elements[i].group - 1 != data.elements[i-1].group) {
                tr.innerHTML = tr.innerHTML + `<td colspan="${data.elements[i].group - data.elements[i-1].group - 1}"></td>
                `;
            }
            else if (data.elements[i].group == 4 && data.elements[i].period >= 6) {
                tr.innerHTML = tr.innerHTML + `<td></td>
                `;
            }
            tr.innerHTML = tr.innerHTML + `<td class="${data.elements[i].category}" id="${data.elements[i].symbol}">${data.elements[i].symbol}</td>
            `;
            
        } while (data.elements[i].group < 18);

        console.log(tr.innerHTML);
        console.log(extra);
        mainContainer.appendChild(tr);

    }
    let tr = document.createElement("tr");
    tr.innerHTML = "<td colspan=\"18\"></td>";
    mainContainer.appendChild(tr);
    for (let i = 0; i < extra.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = tr.innerHTML + `<td colspan="2"></td>
        <td class="${extra[i].category}">${extra[i].symbol}</td>
        `;
        do {
            i++;
            console.log(extra[i]);

            tr.innerHTML = tr.innerHTML + `<td class="${extra[i].category}">${extra[i].symbol}</td>
            `;
            if (extra[i].symbol == "Lu" || extra[i].symbol == "Lr") {
                tr.innerHTML = tr.innerHTML + `<td></td>`
                break;
            }

        } while (extra[i].group);
        mainContainer.appendChild(tr);
    }
    console.log(mainContainer.innerHTML);

    
    
}



function getInputValue() {
    let elementName = document.forms["my_form"]["elementName"];
    let elementNumber = document.forms["my_form"]["elementNumber"];
    let elementMass = document.forms["my_form"]["elementMass"];
    let inputElementName = elementName.value;
    let inputElementNumber = elementNumber.value;
    let inputElementMass = elementMass.value;
    fetch("./data.json")
        .then(response => response.json())
        .then(myElements => loadElement(myElements));
    
    function loadElement(myElements) {
        var mainContainer = document.getElementById("element");
        for (var i = 0; i<myElements.elements.length; i++){
            if (myElements.elements[i].name === inputElementName || 
                myElements.elements[i].number == inputElementNumber ||
                (myElements.elements[i].atomic_mass - 1 < inputElementMass && myElements.elements[i].atomic_mass + 1 > inputElementMass)) {
                    mainContainer.innerHTML = `<br>
                    <h1>Number ${myElements.elements[i].number}: ${myElements.elements[i].name}</h1> 
                    Mass: ${myElements.elements[i].atomic_mass} <br>
                    ${myElements.elements[i].summary} <br>
                    <img src="${myElements.elements[i].bohr_model_image}" style="width: 160px;" alt="${myElements.elements[i].name}"> <br>`;

            }
        }
    }
}

// These two functions are broken for some reason
function loadElementFromClick(click) {
    var mainContainer = document.getElementById("element");
    mainContainer.innerHTML = `<br>
    <h1>Number ${click.number}: ${click.name}</h1> 
    Mass: ${click.atomic_mass} <br>
    ${click.summary} <br>
    <img src="${click.bohr_model_image}" style="width: 160px;" alt="${click.name}"> <br>`;
}


function loadButtons(data) {
    let buttons = [];
    for (let i = 0; i < 100; i++) {
        buttons[i] = document.getElementById(`${data.elements[i].symbol}`);
        console.log(i);
        buttons[i].addEventListener("click", clickHandler);

    }
}


fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendTable(data);
//        loadButtons(data);   // Commented because event listener doesn't work
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
