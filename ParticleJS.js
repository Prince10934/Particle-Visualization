const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
function position(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
}

const pArray=[];
let hue=1;

position();
window.addEventListener("resize",()=>{
    position();
});

const mouse={
    x:undefined,
    y:undefined
};

class Particle{
    constructor(){
        this.x=mouse.x;
        this.y=mouse.y;
        this.size=Math.random()*15+1;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
        this.color=`hsl(${hue},100%,50%)`;
    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.2) this.size-=0.1;
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function handleArray(){
    hue++;
    for(let i=0;i<pArray.length;i++){
        pArray[i].update();
        pArray[i].draw();
        for(let j=i;j<pArray.length;j++){
            const dx=pArray[i].x-pArray[j].x;
            const dy=pArray[i].y-pArray[j].y;
            const distance=Math.sqrt(dx*dx+dy*dy);
            if(distance<100){
                ctx.strokeStyle=pArray[i].color;
                ctx.beginPath();
                ctx.moveTo(pArray[i].x,pArray[i].y);
                ctx.lineTo(pArray[j].x,pArray[j].y);
                ctx.stroke();
            }
        }
        if(pArray[i].size<=0.3){
            pArray.splice(i,1);
            i--;
        }
    }
}
animate();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleArray();
    requestAnimationFrame(animate);
}
canvas.addEventListener('mousemove',(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
    for(let i=0;i<5;i++){
        pArray.push(new Particle());
    }
});