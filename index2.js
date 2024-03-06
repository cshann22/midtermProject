function listElements() {
    fetch("./data.json")
        .then(response => response.json())
        .then(myElements => loadElement(myElements));
    
    function loadElement(myElements) {
        var mainContainer = document.getElementById("List");
        for (var i = 0; i<myElements.elements.length; i++){
            mainContainer.innerHTML += `<br>
            <h1>Number ${myElements.elements[i].number}: ${myElements.elements[i].name}</h1> 
            Mass: ${myElements.elements[i].atomic_mass} <br>
            ${myElements.elements[i].summary} <br>
            <img src="${myElements.elements[i].bohr_model_image}" style="width: 160px;" alt="${myElements.elements[i].name}"> <br>`;

        }
    }
}

fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        listElements(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
