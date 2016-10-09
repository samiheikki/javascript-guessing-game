<template>
  <div class="container">
    <div class="button" v-for="option in options">
      {{ option.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['options']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.button{
  position: relative;
	display: block;
	width: 200px;
	line-height: 60px;
	text-transform: uppercase;
	margin: 16px auto;
  color: #4CAF50;
  cursor: pointer;
}
.button:before, .button:after {
	width:200px;
  left: 0px;
	height:27px;
  z-index: -1;
  border: 3px solid #4CAF50;
}

.button:before{
  position: absolute;
  content: '';
  border-bottom: none;
  -webkit-transform: perspective(15px) rotateX(5deg);
  -moz-transform: perspective(15px) rotateX(5deg);
  transform: perspective(15px) rotateX(5deg);
}
.button:after{
  position: absolute;
  top: 32px;
  content: '';
  border-top: none;
  -webkit-transform: perspective(15px) rotateX(-5deg);
  -moz-transform: perspective(15px) rotateX(-5deg);
  transform: perspective(15px) rotateX(-5deg);
}

.button:hover:before, .button:hover:after {
	background: #4CAF50;
}

.button:hover{
	color:#FFFFFF;
}

.button:nth-child(even) {
  margin-left: 32px;
}

@media (max-width: 447px) {
  .button:nth-child(even) {
    margin-left: 0;
  }
  .button {
    width: 100%;
  }
  .button:before, .button:after {
    width: 100%;
  }
}
</style>
