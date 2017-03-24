<template>
  <button ripple class="ripple-button" v-on:mousedown="onDown" v-on:click="onClick">
    <div class="ripple--container">
    </div>
    {{text}}
  </button>
</template>

<script>
export default {
  props: ['text', 'id'],
  created: function () {
    setTimeout(() => {
      this.$el.addEventListener('mouseup', this.debounce(this.cleanUp, 2000))
    })
  },
  methods: {
    onDown: function (e) {
      this.showRipple(e)
      document.activeElement.blur()
      e.preventDefault()
    },
    showRipple: function (e) {
      let pos, button, rippler, size, style, x, y
      if (e.target.tagName === 'BUTTON') {
        button = e.target // firefox fix
      } else {
        button = e.target.parentNode
        if (button.tagName === 'DIV') {
          button = e.target.parentNode.parentNode
        }
      }
      rippler = document.createElement('span')
      size = button.offsetWidth
      pos = button.getBoundingClientRect()
      x = e.pageX - pos.left - (size / 2)
      y = e.pageY - pos.top - (size / 2)
      style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;'
      button.querySelector('.ripple--container').appendChild(rippler)
      return rippler.setAttribute('style', style)
    },
    cleanUp: function (e) {
      let rippleContainer
      if (e.target.tagName === 'SPAN') {
        rippleContainer = e.target.parentNode
      } else if (e.target.tagName === 'BUTTON') {
        rippleContainer = e.target.firstChild
      }
      while (rippleContainer.firstChild) {
        rippleContainer.removeChild(rippleContainer.firstChild)
      }
    },
    debounce: function (func, delay) {
      let inDebounce
      inDebounce = undefined
      return function () {
        let args, context
        context = this
        args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(function () {
          return func.apply(context, args)
        }, delay)
        return inDebounce
      }
    },
    onClick: function () {
      this.$emit('button-click', this.id)
    }
  }
}
</script>

<style>
.ripple-button {
	width: 200px;
  background-color: #000;
  color: #66BB6A;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  border: 1px solid #66BB6A;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  cursor: pointer;
}
.ripple-button:focus {
  outline: 2px solid #66BB6A !important;
}
[ripple] {
  position: relative;
  overflow: hidden;
}
[ripple] .ripple--container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
[ripple] .ripple--container span {
  transform: scale(0);
  border-radius: 100%;
  position: absolute;
  opacity: 0.75;
  background-color: #4CAF50;
  animation: ripple 1000ms;
}
@-moz-keyframes ripple {
  to {
    opacity: 0;
    transform: scale(2);
  }
}
@-webkit-keyframes ripple {
  to {
    opacity: 0;
    transform: scale(2);
  }
}
@-o-keyframes ripple {
  to {
    opacity: 0;
    transform: scale(2);
  }
}
@keyframes ripple {
  to {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
