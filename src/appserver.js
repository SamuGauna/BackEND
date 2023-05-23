import express from "express";
import productsRouter from './routes/product.router.js'
import cartRouter from './routes/cart.routes.js'
import {__dirname} from './path.js'
import handlebars from 'express-handlebars'

import { ProductManager } from "./manager/productManager.js";
const p = new ProductManager("/products.json")


import viewsRouter from './routes/viewsRouter.js'

import { Server, Socket } from "socket.io";

console.log(__dirname)
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

//layouts esqueleto, views vistas, partials es componentes
//levantamos la config de handlebars y seteamos
app.engine('handlebars', handlebars.engine())
//handlebars toma las vistas desde la carpeta views
app.set('views', __dirname + '/views')
//seteamos el motor de plantillas handlebars
app.set('view engine', 'handlebars')


app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.use('/viewHandle', viewsRouter)



const httpServer = app.listen(PORT, ()=>{
    console.log(`server ok en puerto ${PORT}`);
})
//conexion con websocket del lado del servidor
const socketServer = new Server(httpServer);
//avisarle al servidor que se conecta un cliente
socketServer.on('connection', (socket)=>{
    console.log('usuario conectado');
    socket.on('newProductFromSocketClient', async(obj)=>{
        const arrayProd = await p.getProducts()
        arrayProd.push(obj)
        socketServer.emit('updateArrayProducts', arrayProd)
        
    })

})


