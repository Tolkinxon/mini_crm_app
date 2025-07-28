let elRows = document.querySelectorAll("#tbodyElement tr");

tableSearch.addEventListener("input", (evt) => {
    let val = evt.target.value.trim().toLowerCase();
    console.log(val);
    
    tbodyElement.innerHTML = '';
    let index = 0;
    elRows.forEach((row) => {
        let elChilds = row.childNodes;
        let isTrue = false;
        elChilds.forEach((elChild) => {
            if(elChild.nodeName == "TD" && elChild.textContent.toLowerCase().includes(val)){
                if(!isTrue){
                    isTrue = true;
                    index++;
                }
                row.childNodes[1].textContent = index
                tbodyElement.append(row)
            }
        })
    })
})