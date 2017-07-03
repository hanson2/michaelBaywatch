const app = {
    
    init(selectors){
        this.items = []
        this.list = document.querySelector(selectors.listSelector)
        this.max = 0;
        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.handleSubmit.bind(this, document.querySelector(selectors.formSelector)))
        const searchBar = document.querySelector(selectors.searchSelector)
        searchBar.addEventListener('input', this.search.bind(this))
        if(localStorage.getItem('items')!= null){
            this.items = JSON.parse(localStorage.getItem('items'))
            this.items.map(this.renderListItem.bind(this))
        }
    },
    handleSubmit(f, ev){
        ev.preventDefault()
        const flick = {
            id: this.max+1,
            name: f.querySelector('.input-group-field').value,
            favorite:false,
        }
    
        this.items.unshift(flick)
        this.max++
        localStorage.setItem('items', JSON.stringify(this.items))
        this.renderListItem(flick)
        f.reset()    
    },
    delete(flick, ev){
        ev.target.closest('.flick').remove()
        const index = this.items.indexOf(flick)
        this.items.splice(index,1)
        localStorage.setItem('items', JSON.stringify(this.items))
        
    },
    up(flick, ev){
        const id = this.items.indexOf(flick)
        const temp = this.items.splice(id,1)
        this.items.splice(id-1,0,temp[0])

        const movie = ev.target.closest('.flick')
        movie.parentNode.insertBefore(movie, movie.previousSibling)
    },
    down(flick, ev){
        const id = this.items.indexOf(flick)
        const temp = this.items.splice(id+1,1)
        this.items.splice(id,0,temp[0])

        const movie = ev.target.closest('.flick')
        movie.parentNode.insertBefore(movie.nextSibling, movie)

    },
    favorite(flick, ev){
        const movie = ev.target.closest('.flick')
        flick.favorite = movie.classList.toggle('fav')
    },
    editable(flick,ev){
        const movie = ev.target.closest('.flick')
        const name = movie.querySelector('.flick-name')
        //if(forceOff){
        //    name.contentEditable = 'false'
        //    flick.name = name.textContent
        //}else{
        if(name.contentEditable==='true'){
            name.contentEditable = 'false'
            flick.name = name.textContent
        }else{
            name.contentEditable = 'true'
        }
        //}

    },
    search(ev){
        const name = ev.target.value
        for(let i=0;i<this.items.length;i++){
            const movie = document.querySelector(`#flick-id-${this.items[i].id}`)
            if(!this.items[i].name.toLowerCase().includes(name.toLowerCase())){
                if(!movie.classList.contains('template')){
                    movie.classList.add('template')
                }
            }else{
                movie.classList.remove('template')
            }
        }
    },
    renderListItem(flick){
        const item = document.querySelector('li.template').cloneNode(true)
        item.classList.remove('template')
        item.querySelector('.flick-name').textContent = flick.name

        item.id = `flick-id-${flick.id}`
        //fav button
        const favButton = item.querySelector('.fav')
        favButton.addEventListener('click', this.favorite.bind(this,flick))
        //up arrow
        const upButton = item.querySelector('.up')
        upButton.addEventListener('click', this.up.bind(this, flick))
        //down arrow
        const downButton = item.querySelector('.down')
        downButton.addEventListener('click', this.down.bind(this,flick))
        //delete button
        const deleteButton = item.querySelector('.remove')
        deleteButton.addEventListener('click', this.delete.bind(this,flick))
        //edit/save button
        const editButton = item.querySelector('.edit')
        editButton.addEventListener('click', this.editable.bind(this,flick))

        //item.blur(function(){
        //    this.editable.bind(this,flick,true)
        //} 
        this.list.insertBefore(item, this.list.firstChild)
    },
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
    searchSelector: ".search",
})