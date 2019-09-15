<template>
<div class='loader'>
  <div>
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="stylus" scoped>
.loader
  position relative
  margin 75px aut;
  width 150px
  height 150px
  display block
  overflow hidden
  div
    height 100%


.loader,
.loader div
  border-radius 50%
  padding 8px
  border 2px solid transparent
  animation rotate linear 3.5s infinite
  border-radius 50%
  padding 4px
  animation rotate2 4s infinite linear


.loader,
.loader *
  will-change: transform;


@keyframes rotate2 {
  0% {
    transform: rotate(0deg);
    border-top-color: #7ffa67;
  }
  50% {
    transform: rotate(180deg);
    border-top-color:rgba(0, 0, 255, .5);
  }
  100% {
    transform: rotate(360deg);
    border-top-color: #7ffa67;
  }
}
</style>
