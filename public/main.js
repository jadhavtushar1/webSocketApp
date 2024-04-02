const socket = io()
const totalCount = document.getElementById('user_id') 
const messageParent = document.getElementById('message_parents')
const usernameFild = document.getElementById('user_name')
const sentmessage = document.getElementById('sent_smessage')
const receivedMEssage = document.getElementById('received_message')
const messageBox = document.getElementById('message_text_box')
const messageForm = document.getElementById('message_form')

document.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})


function sendMessage(){
    const data = {
        name : usernameFild.value,
        message : messageBox.value,
        date: new Date()
    }
    if(messageBox.value !==""){
        socket.emit('message',data)
        addmessage(true,data)
    }
    messageBox.value=""
}

socket.on('total',(data)=>{
    totalCount.innerText = `total users ${data}`
    
})
socket.on('chat-message',(data)=>{
    addmessage(false,data)
    
})

function addmessage(ownMessage,data){
    const element = `<div class="${ownMessage ? "sent-msg":"received-msg"}" id="received_message">
    <p>${data?.message}</p>
    <p class="msg-metadata">${data?.name} ${data?.date}</p>
</div>`
console.log(data)
messageParent.innerHTML +=element
bottomscroll()
}
function bottomscroll(){
    messageParent.scrollTo(0,messageParent.scrollHeight)
}