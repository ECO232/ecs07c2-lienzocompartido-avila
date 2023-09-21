const socket = io();

let size = 20;
let r = 0;
let g = 0;
let b = 0;
let identificator = 0;

let elements = [];
let cursors = [];

function setup() {
    createCanvas(400, 400);
    r = int(Math.random()*255)
    g = int(Math.random()*255)
    b = int(Math.random()*255)
    identificator = int(random()*1000)
    console.log("Identificator: ", identificator)
}

function draw() {
    background(220);

    elements.forEach((element)=>{
        fill(element.r, element.g, element.b)
        ellipse(element.x, element.y, element.size, element.size)
    })

    cursors.forEach((element)=>{
        fill(0, 0, 0)
        ellipse(element.x, element.y, element.size, element.size)
    })
}

function mousePressed() {
    const element = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size
    }

    socket.emit('send-element', element)
}

function mouseDragged() {
    const element = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size,
        id: identificator
    }

    socket.emit('send-cursor', element)
}

socket.on('element-received', (element) => {
    console.log("Receiving-element: ", element)
    elements.push(element)
})

socket.on('cursor-received', (element) => {
    console.log("Receiving-cursor:", element)

    let cursorIndex = cursors.findIndex((item) => element.id == item.id)

    if(cursorIndex!=-1){
        cursors[cursorIndex] = element;
    } else {
        cursors.push(element)
    }
})