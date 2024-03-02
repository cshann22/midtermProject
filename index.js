function appendTable(data) {
    let mainContainer = document.getElementById("start");

    for (let i = 0; i < data.elements.length; i++) {
        console.log(data.elements[i]);
        let tr = document.createElement("tr");
        mainContainer.appendChild(tr);
        for (let j = i; data.elements[j].group < 18; j++) {
            // let td = document.createElement("td");
            tr.innerHTML = tr.innerHTML + `<td class="${data.elements[j].category}">${data.elements[j].symbol}</td>
            `;
            // tr.appendChild(td);
            i++;
        }
        console.log(tr.innerHTML);
    }
    console.log(mainContainer.innerHTML);

}

fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        // console.log(data.firstName);
        // console.log(data["firstName"]);
        appendTable(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
