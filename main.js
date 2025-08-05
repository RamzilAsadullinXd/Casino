const cardsBlock = document.querySelector('.cards')
const startBtn = document.querySelector('.start')
const cards = document.querySelectorAll('.cards > div')
const resultElement = document.querySelector('.result')
const balanceIndex = document.querySelector('[data-js-balance]')
const moneySlider = document.getElementById('money-slider')
const sliderValue = document.getElementById('slider-value')

let currentPosition = 0
let currentCardIndex = 0
const cardWidth = 105
const totalCards = cards.length
let sumCount = 0
let balance = +localStorage.getItem('balance') || 0;
let sliderMoney = 0
let fixedBet = 0

//рулетка
cards.forEach((card, index) => {
  if(index % 2 === 1){
    card.classList.add('middle')
    card.textContent = '-'
  }
})

const errorSound = new Audio('./mp3/whatsapp_vibration (mp3cut.net) (1).mp3')
const lossSound = new Audio('./mp3/roblox-death-sound-effect.mp3')
const winSound = new Audio('./mp3/roblox-old-badge-giver-sound-made-with-Voicemod.mp3')

startBtn.addEventListener('click', () => {
  const randomSteps = Math.floor(Math.random() * 8) + 3

  if (sumCount <= 0) {
    errorSound.play()
    startBtn.classList.add('error')
    startBtn.disabled = true
    setTimeout(() => {
      startBtn.disabled = false
      startBtn.classList.remove('error')
    }, 800)
    return
  }

  sumCount = 0
  sumMeaningsElement.textContent = sumCount

  const interval = setInterval(() => {
    currentPosition = (currentPosition - cardWidth) % (totalCards * cardWidth)

    if (Math.abs(currentPosition) >= totalCards * cardWidth) {
      currentPosition = 0
    }

    cardsBlock.style.transform = `translateX(${currentPosition}px)`

    currentCardIndex = (currentCardIndex + 1) % totalCards

    resultElement.style.animation = 'none'
    void resultElement.offsetWidth
    resultElement.style.animation = 'swing 0.8s ease'
  }, 150)

  fixedBet = sliderMoney
  startBtn.disabled = true

  setTimeout(() => {
    clearInterval(interval)
    startBtn.disabled = false

    document.querySelector('.result-notification')?.remove()

    const resultNotification = document.createElement('p')
    resultNotification.classList.add('result-notification')

    const remainder = Math.round(Math.abs(currentPosition) % cardWidth)
    if (remainder !== 0) {
      currentPosition = Math.round(currentPosition / cardWidth) * cardWidth
    }

    cardsBlock.style.transform = `translateX(${currentPosition}px)`

    const activeCardIndex = Math.abs(currentPosition / cardWidth) % totalCards
    const activeCard = cards[activeCardIndex]

    if (activeCard.classList.contains('middle')) {
      lossSound.play()
      resultNotification.textContent = 'You lost :('
    } else {
      let winAmount = fixedBet * 2
      winSound.play()
      balance += winAmount
      localStorage.setItem('balance', balance)
      balanceIndex.textContent = `${balance}$`
      resultNotification.textContent = `You won ${winAmount}$ :)`
    }

    startBtn.insertAdjacentElement('beforebegin', resultNotification)
  }, randomSteps * 750)
})
//

//ползунок
moneySlider.addEventListener('input', () => {
  sliderMoney = Number(moneySlider.value)
  sliderValue.textContent = sliderMoney

  if (sliderMoney < 3000) {
    sliderValue.style.color = 'black'
  } else if (sliderMoney > 7000) {
    sliderValue.style.color = 'red'
  } else {
    sliderValue.style.color = 'white'
  }
})
//

//сумма ползунка
const sumBtnElement = document.querySelector('[data-js-sum-btn]')
const sumMeaningsElement = document.querySelector('[data-js-sum]')
const resetBtnElement = document.createElement('button')

resetBtnElement.classList.add('sum-btn')
resetBtnElement.textContent = 'Reset'

startBtn.addEventListener('click', () => {
  if(resetBtnElement.parentNode){
    resetBtnElement.remove()
  }
})

sumBtnElement.addEventListener('click', () => {
  const sliderMoney = Number(moneySlider.value)

  if(sliderMoney > balance){
    errorSound.play()
    sumBtnElement.classList.add('error')
    sumBtnElement.disabled = true
    setTimeout (() =>{
      sumBtnElement.disabled = false
      sumBtnElement.classList.remove('error')
    }, 800)
    return
  }
  
  balance -= sliderMoney
  localStorage.setItem('balance', balance)
  balanceIndex.textContent = `${balance} $`

  sumCount += sliderMoney
  sumMeaningsElement.textContent = sumCount
  

  if(!resetBtnElement.parentNode){
    resetBtnElement.addEventListener('click', () => {
      balance += sumCount
      localStorage.setItem('balance', balance)
      balanceIndex.textContent = `${balance}$`
  
      sumCount = 0
      sumMeaningsElement.textContent = sumCount
      resetBtnElement.remove()
    })
    sumBtnElement.insertAdjacentElement('afterend', resetBtnElement)
  }
})
//    

//модальной окно
const modalElement = document.getElementById('myModal')
const modalBtnElement = document.getElementById('myBtn')
const modalSpanElement = document.querySelector('.close')

modalBtnElement.addEventListener('click', () => {
  modalElement.style.display = 'block'
})
modalSpanElement.addEventListener('click', () => {
  modalElement.classList.add('fade-out')

  setTimeout(() => {
    modalElement.style.display = 'none'
    modalElement.classList.remove('fade-out')
  }, 300)
})
window.addEventListener('click', (event) => {
  if(event.target === modalElement){
    modalElement.style.display = 'none'
  }
})
//
balanceIndex.textContent = `${balance} $`