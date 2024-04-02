const express = require('express')
const app = express()
const path = require('path')
const { disconnect } = require('process')
// const { Socket } = require('socket.io')
const port = 4000
const server = app.listen(port,()=>console.log(`server started on port ${port}`))
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname,'public' )))
io.on('connection',onConnected)

let connectedSockets = new Set()

function onConnected(socket){
    
    connectedSockets.add(socket.id)
    io.emit('total',connectedSockets.size)
    socket.on('disconnect',()=>{
        console.log('socket disconnected')
        connectedSockets.delete(socket.id)
        io.emit('total',connectedSockets.size)
    })
    socket.on('message',(data)=>{
        socket.broadcast.emit('chat-message',data)
    })
    socket.on('feedback',(data)=>{
        console.log(data)
        socket.broadcast.emit('user-status',data)
    })
}