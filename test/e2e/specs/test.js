// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

var request = require('request')

module.exports = {
  'game starts': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.logo')
      .assert.elementCount('.ripple-button', 4)
      .end()
  },
  'high scores are shown': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/ranking'

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.containsText('h1', 'High Scores (top 10)')
      .waitForElementVisible('.score-row', 5000)
      .assert.elementCount('.score-row', 10)
      .end()
  },
  'wrong answer stops the game': function (browser) {
    const devServer = browser.globals.devServerURL
    let logo

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)

    const clickWrongButton = (buttonIndex) => {
      browser.click('.ripple-button:nth-of-type(' + buttonIndex + ')', (result) => {
        browser
          .waitForElementPresent('.learning-suggestion', 2000)
          .assert.elementCount('.learning-suggestion img', 1)
          .assert.containsText('h3', 'See High Scores')
          .end()
      })
    }

    const getWrongButton = (i) => {
      browser.getText('.ripple-button:nth-of-type(' + i + ')', (result) => {
        if (result.value.toLowerCase() !== logo) {
          clickWrongButton(i)
        } else {
          getWrongButton(i + 1)
        }
      })
    }

    browser.waitForElementPresent('.logo', 5000, () => {
      browser.getAttribute('.logo', 'src', (result) => {
        logo = result.value
        logo = logo.replace(devServer + '/static/logos/', '')
        logo = logo.replace('.png', '')
        getWrongButton(1)
      })
    })
  },
  'game can be finished': function (browser) {
    const devServer = browser.globals.devServerURL
    let logo

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)

    const clickCorrectButton = (buttonIndex) => {
      browser.click('.ripple-button:nth-of-type(' + buttonIndex + ')', (result) => {
        tryToAnswer()
      })
    }

    const getCorrectButton = (i) => {
      browser.getText('.ripple-button:nth-of-type(' + i + ')', (result) => {
        if (result.value.toLowerCase() === logo) {
          clickCorrectButton(i)
        } else {
          getCorrectButton(i + 1)
        }
      })
    }

    const tryToAnswer = () => {
      const checkWhatToDo = (amount, answerCount) => {
        if (amount === answerCount) { // Game finished
          browser
            .assert.containsText('h1', 'You did it! Now you can go back to your desk and start working.')
            .assert.elementCount('img', 0)
            .end()
        } else {
          browser.waitForElementVisible('.logo', 5000, () => {
            browser.getAttribute('.logo', 'src', (result) => {
              logo = result.value
              logo = logo.replace(devServer + '/static/logos/', '')
              logo = logo.replace('.png', '')
              getCorrectButton(1)
              request(result.value, (error, response, body) => {
                browser.expect(response.headers['content-type']).to.equal('image/png')
                if (error) {}
              })
            })
          })
        }
      }

      browser.getAttribute('#progress', 'amount', (result) => {
        const amount = result.value
        browser.getAttribute('#progress', 'answer-count', (result) => {
          const answerCount = result.value
          checkWhatToDo(amount, answerCount)
        })
      })
    }

    tryToAnswer()
  }
}
