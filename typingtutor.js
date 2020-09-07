
window.addEventListener('DOMContentLoaded', (event) =>{


    let bass = new Tone.Synth().toMaster()
    Tone.Transport.bpm.value = 860
    
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"
    
    class RectangleL {
        constructor(x, y, height, width, color, text ="") {
            this.n = text
            this.m = ""
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }

     NotePlayer(){
        bass.triggerAttackRelease(`${this.m}2`, `2n`)
    }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
            tutorial_canvas_context.fillStyle = "black";
            tutorial_canvas_context.font = `${this.height/1.1}px serif`;
            tutorial_canvas_context.fillText(`${this.n}`, this.x+(.1*this.width), this.y+(.7*this.height));
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom
            this.xmom*=.98
            this.ymom*=.98

        }

        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }



    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse(){
            let xdif = this.x1-this.x2
            let ydif = this.y1-this.y2
            let hypotenuse = (xdif*xdif)+(ydif*ydif)
            return Math.sqrt(hypotenuse)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width
            tutorial_canvas_context.beginPath()
            tutorial_canvas_context.moveTo(this.x1, this.y1)         
            tutorial_canvas_context.lineTo(this.x2, this.y2)
            tutorial_canvas_context.stroke()
            tutorial_canvas_context.lineWidth = 1
        }
    }


    let bar =  new Rectangle(0,650, 50, 700, "#FF888844")

    let notes = []

    let chars = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let playables='abcdefg'.split('')
   
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width, tutorial_canvas.height)
        bar.draw()
        if(Math.random()<.06){
            let note = new RectangleL(Math.random()*(tutorial_canvas.width-40), 0, 50, 40, getRandomLightColor(), chars[Math.floor(Math.random()*chars.length)])
            let wet  =0
            for(let t = 0; t<notes.length; t++){
                let link = new Line(note.x, note.y, notes[t].x, notes[t].y, "red", 3)
                if(link.hypotenuse()< 74){
                    wet =1
                    break
                }
            }
            if(wet == 0){
                note.m = playables[Math.floor(Math.random()*playables.length)]
                note.marked = false
                notes.push(note)
            }
        }


        for(let t = 0; t<notes.length; t++){
            notes[t].ymom+=.045
            notes[t].move()
            if(notes[t].marked== false){
                notes[t].draw()
            }
        }

        for(let t = 0; t<notes.length; t++){
            if(notes[t].y > 701){
                notes.splice(t,1)
            }
        }
        for(let t = 0; t<notes.length; t++){
            if(keysPressed[notes[t].n]){
                if(notes[t].y > 600 && notes[t].y < 701){
                    if(notes[t].marked == false){
                        notes[t].NotePlayer()
                        notes[t].marked = true
                    }
                }
            }
        }

    }, 17) 



    function getRandomLightColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[(Math.floor(Math.random() * 12)+4)];
        }
        return color;
      }

        
})