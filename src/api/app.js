export default {
  getJSON: function (url, headers, callback) {
    const xhr = new window.XMLHttpRequest()
    xhr.open('get', url, true)
    /*
      Sample header collections
      headers = [{
        key: 'Accept',
        value: 'application/vnd.github.cloak-preview'
      }]
    */
    if (this.isValidArray(headers)) {
      headers.forEach(function (header) {
        xhr.setRequestHeader(header.key, header.value)
      })
    }
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
  getGithubUsername: function (email, callback) {
    const url = `https://api.github.com/search/commits?q=author-email:${email}&sort=author-date&per_page=1`
    const headers = [{
      key: 'Accept',
      value: 'application/vnd.github.cloak-preview'
      // TODO add token
    }]
    this.getJSON(url, headers, function (err, response) {
      callback(err, response.items[0].author.login)
    })
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
  },
  isValidArray: function (value) {
    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]'
      }
    }
    return Array.isArray(value) && value.length
  }
}
