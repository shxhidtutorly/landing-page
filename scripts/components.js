class Dropdown {
    constructor(selector, onChange) {
        this.dropdown = document.querySelector(selector)
        this.toggleButton = this.dropdown.querySelector('.dropdown-toggle')
        this.onChange = onChange

        this.defaultText = this.toggleButton.querySelector("span").innerText

        this.menu = this.dropdown.querySelector('.dropdown-menu')
        
        this.selectItem = this.selectItem.bind(this)
        this.toggleButton.addEventListener('click', this.toggleDropdown.bind(this))
        document.addEventListener('click', this.closeDropdown.bind(this))

        this.lists = this.dropdown.querySelectorAll('li')
        this.lists.forEach(e => {
            e.addEventListener("click", () => this.selectItem(e))}
        )

        this.value = ""

        this.dropDownInput = this.dropdown.querySelector(".dropdown-input")

    }
  
    toggleDropdown() {
        this.menu.style.display = (this.menu.style.display === 'block') ? 'none' : 'block'
    }

    selectItem(ele){

        const selectedInput = this.toggleButton.querySelector(".dropdown-select-text")
        const selectIcon =  this.toggleButton.querySelector(".dropdown-select-icon")

        this.value = ele.querySelector(".dropdown-text").innerText.trim()

        if (selectIcon && ele.querySelector(".dropdown-menu-icon")){
            selectIcon.style.visibility = ""
            selectIcon.setAttribute("src", ele.querySelector(".dropdown-menu-icon").src)
            selectIcon.setAttribute("alt", ele.innerText)
        }else{
            selectIcon.style.visibility = "hidden"
        }

        selectedInput.innerText = ele.querySelector(".dropdown-text").innerText.trim()
        
        if(this.dropDownInput)
            this.dropDownInput.value = this.value

        if (this.onChange){
            this.onChange(this.value)
        }

        this.closeDropdown()

    }

    closeDropdown(event) {
        if (event === undefined || !this.dropdown.contains(event.target)) {
            this.menu.style.display = 'none'
        }
        document.removeEventListener('click', this.closeDropdown.bind(this))
    }
}


class Prompt{

    constructor(target){
        this.playground = document.querySelector(target)

        this.promptWindow = this.playground.querySelector(".prompt-container")
        
        this.chatModel = "gpt-4"

        this.promptList = []

        this.answer = this.answer.bind(this)
        this.addPrompt = this.addPrompt.bind(this)
        this.setAIModel = this.setAIModel.bind(this)

    }

    setAIModel(model){
        // console.log("model: ", model)
        this.chatModel = model.toLowerCase()
    }

    addPrompt(msg){

        if (this.promptList.length === 0)
            this.promptWindow.innerHTML = ""

        this.promptList.push(msg)

        const text = document.createElement("div")

        text.classList.add("tw-w-fit", "tw-ml-auto", "tw-p-2", "tw-rounded-xl", 
                            "tw-bg-purple-100", "dark:tw-bg-purple-900", "tw-text-purple-900", "dark:tw-text-purple-100")
        text.innerText = msg

        const promptELement = `
            <div class="tw-w-full tw-flex tw-p-2">
                ${text.outerHTML.toString()}
            </div>
        `

        this.promptWindow.innerHTML += promptELement

        setTimeout(() => {
            this.promptWindow.scrollTop = this.promptWindow.scrollHeight
        }, 150)

        setTimeout(this.answer, 100)
    }

    answer(){

        let msg = {
            "gpt-4": "Hello! I'm your AI tutor powered by GPT-4. I can help you create summaries, flashcards, and quizzes from your study materials. Try pasting some content above!",
            "gemini": "Hi there! I'm your AI study assistant using Google's Gemini. I can transform your notes into interactive learning materials. What would you like to study today?",
            "claude": "Greetings! I'm Claude, your AI learning companion. I excel at breaking down complex topics and creating personalized study aids. How can I help you learn better?",
        }[this.chatModel] || "Hello! I'm your AI tutor. I can help you study more effectively with personalized summaries, flashcards, and quizzes."

        const text = document.createElement("div")
        text.classList.add("tw-w-fit", "tw-mr-auto", "tw-p-2", "tw-rounded-xl", 
                          "tw-bg-gray-100", "dark:tw-bg-gray-800")
        text.innerText = msg

        const promptELement = `
            <div class="tw-w-full tw-flex tw-p-2">
                ${text.outerHTML.toString()}
            </div>
        `
        this.promptWindow.innerHTML += promptELement

        setTimeout(() => {
            this.promptWindow.scrollTop = this.promptWindow.scrollHeight
        }, 150)

    }

}