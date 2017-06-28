const app = {
    
    init: function(selectors){
        this.list = document.querySelector(selectors.listSelector)
        this.max = 0
        
        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit", this.handleSubmit.bind(this))
    },
    handleSubmit: function(ev){
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max+1,
            name: f.flickName.value,
        }
        console.log(flick)
        this.max++

        this.list.appendChild(this.renderListItem(flick))
        
    },
    renderListItem: function(flick){
        const item = document.createElement('li')
        item.textContent = flick.name
        return item
    },
}


app.init({
    formSelector: "form#flick-form",
    listSelector: "#flick-list",
})