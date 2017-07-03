const app = {
    
    init(selectors){
        this.items = []
        this.list = document.querySelector(selectors.listSelector)
        this.max = 0;
        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.handleSubmit.bind(this, document.querySelector(selectors.formSelector)))
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

        this.renderListItem(flick)
        f.reset()    
    },
    delete(flick, ev){
        ev.target.closest('.flick').remove()
        const index = this.items.indexOf(flick)
        this.items.splice(index,1)
        
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

        this.list.insertBefore(item, this.list.firstChild)
    },
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})