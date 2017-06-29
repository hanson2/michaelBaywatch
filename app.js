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
                if(up){
                    this.id--
                }else{
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
            const temp = document.getElementById(this.items[i].id)
            console.log(temp.id)
            temp.id = this.items[i].id-1
            console.log(temp.id)
            this.items[i].shift(true)
        }
        this.items.splice(flick.id-1,1)
        this.removeListItem(flick)
        this.update()
    }
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})