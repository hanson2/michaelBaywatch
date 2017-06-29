const app = {
    
    init(selectors){
        this.items = []
        this.list = document.querySelector(selectors.listSelector)
        this.max = 0;
        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.handleSubmit.bind(this))
    },
    handleSubmit(ev){
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max+1,
            name: f.flickName.value,
            favorite:false,
            remove(){
                

                removeListItem(flick)
            },
            fav(){
                if(this.favorite){
                    this.favorite=false
                }else{
                    this.favorite = true
                }
            },
            shift(up){
                const temp = document.getElementById(this.id)
                if(up){
                    temp.id = this.id-1
                    this.id--
                }else{
                    temp.id = this.id+1
                    this.id++
                }
            }

        }
        this.items.push(flick)
        this.max++

        this.renderListItem(flick)
        
    },
    renderListItem(flick){
        const item = document.createElement('li')
        item.textContent = flick.name
        item.style.backgroundColor = 'white'
        if(flick.favorite){
            item.style.backgroundColor = 'black'
            item.style.color = 'white'
        }
        item.setAttribute('id', flick.id)
        this.list.appendChild(item)
    },
    removeListItem(flick){
        const element = document.getElementById(flick.id)
        this.list.removeChild(element)
    },
    update(){
        this.items.map(this.removeListItem.bind(this))
        this.items.map(this.renderListItem.bind(this))
        
    },
    delete(flick){
        for(let i=flick.id;i<this.items.length;i++){
            this.items[i].shift(true)
        }
        this.items.splice(flick.id-1,1)
        this.removeListItem(flick)
        this.update()
    },
    up(flick){
        const id = flick.id
        const movie2 = this.items[id-2].shift(false)
        const movie = this.items[id-1].shift(true)
        const temp = this.items.splice(id-1,1)
        this.items.splice(id-2,0,temp[0])
        
        this.update()
    },
    down(flick){
        const id = flick.id
        this.items[id].shift(true)
        this.items[id-1].shift(false)
        const temp = this.items.splice(id-1,1)
        this.items.splice(id,0,temp[0])

        this.update()
    }
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})