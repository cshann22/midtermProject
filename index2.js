function listElements() {
    let elementCategory = document.forms["my_form"]["Category"];
    let inputElementName = elementCategory.value.toLowerCase();
    inputElementName = inputElementName.replaceAll(" ", "-");

    console.log(inputElementName);
    fetch("../data.json")
        .then(response => response.json())
        .then(myElements => loadElement(myElements));
    
    function loadElement(myElements) {
        var mainContainer = document.getElementById("List");
        mainContainer.innerHTML = "";
        for (var i = 0; i<myElements.elements.length; i++){
            if (inputElementName == "" || inputElementName == myElements.elements[i].category.toLowerCase()){
                mainContainer.innerHTML += `<br>
                <h1>Number ${myElements.elements[i].number}: ${myElements.elements[i].name}</h1> 
                Mass: ${myElements.elements[i].atomic_mass} <br>
                Category: ${myElements.elements[i].category.replaceAll("-", " ")} <br>
                ${myElements.elements[i].summary} <br>
                <img src="${myElements.elements[i].bohr_model_image}" style="width: 160px;" alt="${myElements.elements[i].name}"> <br>`;
            }
        }
    }
}

fetch('../data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        listElements(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
