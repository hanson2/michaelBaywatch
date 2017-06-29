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
                    id--
                }else{
                    id++
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
        const temp = this.items.map(this.renderListItem.bind(this))
        
    },
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})