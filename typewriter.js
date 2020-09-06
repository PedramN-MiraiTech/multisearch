let counter = 0
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.isDeleting = false
    }

type() {
    const current = this.wordIndex % this.words.length
    const fullTxt = this.words[current]
    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    }
    else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    this.txtElement.innerHTML = `<span id="txt">${this.txt}</span>`;
    let typeSpeed = 300
    if(this.isDeleting) {
        typeSpeed /= 2
    }
    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait
        this.isDeleting = true
    } 
    else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false
        this.wordIndex++
        typeSpeed = 500
    }
    counter++
    if (counter < this.words.join("").length + this.words[0].length) {
        setTimeout(() => this.type(), typeSpeed)
        document.querySelector("#txt").className = "txtw"
    }
    else{
        document.querySelector("#txt").className = "txts"
    }
  }
}

document.addEventListener('DOMContentLoaded', init)

function init() {
    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')
    new TypeWriter(txtElement, words, wait)
}