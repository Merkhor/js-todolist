
let taskDOM = document.querySelector("#task");  
let listDOM = document.querySelector("#list");  
let LiDOM = document.querySelectorAll("li"); 

function removeElement(erase) { 
    erase.remove();             
    eraseStrorage(erase);   
}

function markElement(){
    this.classList.toggle("checked");
}

let closeButton = `<button 
onclick="removeElement(parentNode)" 
style="padding: 13px;" type="button" 
class="close" 
data-dismiss="toast"
aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>`


LiDOM.forEach(e => {
    e.addEventListener("click", markElement);
    e.innerHTML += `${closeButton}`;
})

function newElement() {

    if (!taskDOM.value || !taskDOM.value.trim()) {
        $(".error").toast('show')
    } else {
        let liDOM = document.createElement("li"); 
        listDOM.append(liDOM);                      
        $(".success").toast('show') 
        liDOM.innerHTML = `${taskDOM.value}${closeButton}`;
        liDOM.addEventListener("click", markElement);
        setStrorage()
    }
    taskDOM.value = ""; 
}

function setStrorage(){
    let toDO = JSON.parse(localStorage.getItem("toDO"));   
    toDO.push(`${taskDOM.value}`);                             
    localStorage.setItem("toDO", JSON.stringify(toDO));    
}

function eraseStrorage(erase){
    let toDO = JSON.parse(localStorage.getItem("toDO"));   
    if (toDO.includes(erase.firstChild.textContent) == true) {  
        let indexbul = toDO.findIndex(e =>                      
            e == erase.firstChild.textContent
            );
        toDO.splice(indexbul, 1);                               
        localStorage.setItem("toDO", JSON.stringify(toDO)); 
    } 
}

function createLocal() {
    let toDO = JSON.parse(localStorage.getItem("toDO"));    
    if (!toDO) {toDO = []};                                 
    localStorage.setItem("toDO", JSON.stringify(toDO));     
}

function local(){
    let toDO = JSON.parse(localStorage.getItem("toDO"));    
    toDO.forEach((e, index) => {                                
        let liDOM = document.createElement("li");                   
        listDOM.append(liDOM);                                      
        liDOM.innerHTML = toDO[index]                           
        liDOM.innerHTML += `${closeButton}`                         
        liDOM.addEventListener("click", markElement);               
    })
}

createLocal() 

local()  