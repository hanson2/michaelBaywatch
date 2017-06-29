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
    removeListItem(flick){
        const element = document.getElementById(flick.id)
        this.list.removeChild(element)
    },
    update(){
        this.items.map(this.removeListItem.bind(this))
        this.items.map(this.renderListItem.bind(this))
        
    },
    delete(ev){
        const flick = this.items[ev.target.parentNode.id-1]
        for(let i=flick.id;i<this.items.length;i++){
            this.items[i].shift(true)
        }
        this.max--
        this.items.splice(flick.id-1,1)
        this.removeListItem(flick)
        this.update()
    },
    up(ev){
        const flick = this.items[ev.target.parentNode.id-1]
        const id = flick.id
        const movie2 = this.items[id-2].shift(false)
        const movie = this.items[id-1].shift(true)
        const temp = this.items.splice(id-1,1)
        this.items.splice(id-2,0,temp[0])
        
        this.update()
    },
    down(ev){
        const flick = this.items[ev.target.parentNode.id-1]
        const id = flick.id
        this.items[id].shift(true)
        this.items[id-1].shift(false)
        const temp = this.items.splice(id-1,1)
        this.items.splice(id,0,temp[0])

        this.update()
    },
    favorite(ev){
        const flick = this.items[ev.target.parentNode.id-1]
        flick.fav()
        this.update()
    },
    renderListItem(flick){
        const item = document.createElement('li')
        item.textContent = flick.name
        item.style.backgroundColor = 'white'
        if(flick.favorite){
            item.style.backgroundColor = 'green'
        }
        item.setAttribute('id', flick.id)
        //fav button
        const favButton = document.createElement('button')
        favButton.setAttribute('class', 'button success')
        favButton.setAttribute('id', 'favButton')
        favButton.textContent = 'Favorite'
        favButton.addEventListener('click', this.favorite.bind(this))
        item.appendChild(favButton)
        //up arrow
        const upButton = document.createElement('button')
        upButton.setAttribute('class', 'button')
        upButton.setAttribute('id', 'upButton')
        upButton.textContent = 'Up'
        upButton.addEventListener('click', this.up.bind(this))
        item.appendChild(upButton)
        //down arrow
        const downButton = document.createElement('button')
        downButton.setAttribute('class', 'button')
        downButton.setAttribute('id', 'downButton')
        downButton.textContent = 'Down'
        downButton.addEventListener('click', this.down.bind(this))
        item.appendChild(downButton)
        //delete button
        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('class', 'button alert')
        deleteButton.setAttribute('id', 'deleteButton')
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', this.delete.bind(this))
        item.appendChild(deleteButton)

        this.list.appendChild(item)
    },
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})