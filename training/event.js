const todayAdd=document.getElementById("today-open")
const openModal=document.getElementById("open-modal")
let modalState=false
todayAdd.addEventListener("click",()=>{
    modalState=!modalState
    if(modalState){
        openModal.style.display="block"
    }
    else{
        openModal.style.display="none"
    }
})