export default {
  getJSON: function (url, callback) {
    const xhr = new window.XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(null, xhr.response)
      } else {
        callback(xhr.status)
      }
    }
    xhr.send()
  },
  shuffle: function (array) {
    let j, x, i
    for (i = array.length; i; i--) {
      j = Math.floor(Math.random() * i)
      x = array[i - 1]
      array[i - 1] = array[j]
      array[j] = x
    }
    return array
  },
  generateIDs: function (array) {
    array.forEach((val, index) => {
      array[index].id = index
    })
    return array
  },
  getAnswerOptions: function (logos, amount, currentId, previousId) {
    let optionNumbers = []
    optionNumbers.push(currentId)

    while (optionNumbers.length < 4) {
      let randomNumber = Math.floor(Math.random() * amount)
      if (!optionNumbers.includes(randomNumber) && (!previousId || previousId !== randomNumber)) {
        optionNumbers.push(randomNumber)
      }
    }

    optionNumbers = this.shuffle(optionNumbers)

    return [
      logos[optionNumbers[0]],
      logos[optionNumbers[1]],
      logos[optionNumbers[2]],
      logos[optionNumbers[3]]
    ]
  }
}
