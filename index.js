function appendTable(data) {
    let mainContainer = document.getElementById("start");

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
            tr.innerHTML = tr.innerHTML + `<td class="${data.elements[i].category}">${data.elements[i].symbol}</td>
            `;
        } while (data.elements[i].group < 18);

        console.log(tr.innerHTML);
        mainContainer.appendChild(tr);

    }
    console.log(mainContainer.innerHTML);

}

fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendTable(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
