class Ticker {
    constructor() {
        this.objArr=[];
        this.tick();
    }

    addObj(obj) {
        this.objArr.push(obj);
    }

    removeObj(func){
        this.objArr.forEach((e, id, arr)=>{
            if(e === func){
                arr.splice(id, 1);
            }
        });
    }
    removeAll(){
        this.objArr = [];
    }

    tick(){
        this.objArr.forEach(element =>{
            element.onTick();
        })
        this.objArr.forEach(element =>{
            if(element.draw){
                element.draw();
            }
        })

        requestAnimationFrame(()=>{
            this.tick();
        })
    }
}