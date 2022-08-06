let multiplier = document.getElementById("multcont");
let modulo = document.getElementById("modcont");
let multdiv = document.getElementById("multiplier");
let modiv = document.getElementById("modulo");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
console.log(ctx);

multiplier.addEventListener('mousemove', (e)=>{
    multdiv.innerHTML = e.target.value;
    f();
})

modulo.addEventListener('mousemove', (e)=>{
    modiv.innerHTML = e.target.value;
   
    f();
})
canvas.height = innerHeight;
canvas.width = innerWidth;
function rc(){return "white";}//'#'+Math.floor(Math.random()*16777215).toString(16);}
function f(){
    
    ctx.strokeStyle = rc();
center = [innerHeight/2,300];
x = center[0]
y = center[1]
r = 300
ctx.clearRect(0,0,x+r,y+r);
ctx.beginPath();
ctx.arc(x, y, r,0, Math.PI * 2);
ctx.stroke()

for(let i=0;i<modulo.value;i++){
    // console.log(i);
    ctx.beginPath();
    ctx.fillStyle = rc();
    xc = x+r*(Math.cos(i*(2*Math.PI)/modulo.value))
    yc = y+r*(Math.sin(i*(2*Math.PI)/modulo.value))
    ctx.arc(xc,yc, 1, 0, Math.PI * 2);
    ctx.stroke()

    //lines
    xe = x+r*(Math.cos(((multiplier.value*i)%modulo.value)*(2*Math.PI)/modulo.value))
    ye = y+r*(Math.sin(((multiplier.value*i)%modulo.value)*(2*Math.PI)/modulo.value))
    ctx.fillStyle = rc();
    ctx.beginPath();
    ctx.moveTo(xc, yc);
    ctx.lineTo(xe,ye );
    ctx.stroke();


}


}
f()