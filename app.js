const app = {
    
    init(selectors){
        this.list = document.querySelector(selectors.listSelector)
        this.max = 0
        
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
        }
        this.max++

        this.list.appendChild(this.renderListItem(flick))
        
    },
    renderListItem(flick){
        const item = document.createElement('li')
        item.textContent = flick.name
        return item
    },
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})