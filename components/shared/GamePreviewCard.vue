<template>
<div class="game-preview">
  <div class="game-preview__overlay" />
  <div class="game-preview__inner">
    <div class="game-preview__top-banner">
    </div>
    <div class="game-preview__main">
      <div class="game-preview__star-box">
        <div class="game-preview__star" />
        <svg-icon
          class="game-preview__icon"
          name="pair"
          width="60"
          height="60"
        />
      </div>
      <div class="game-preview-btn">
        <div class="game-preview-btn__center" />
        <div class="game-preview-btn__lines">
          <div class="game-preview-btn__lines-center" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GamePreviewCard',
};
</script>

<style scoped lang="stylus">
.game-preview
  position relative
  width: 350px
  height: 450px
  box-shadow: 0 0 3px 2px #4e4e4e;
  border-radius: 9px;
  border: 5px solid $bone;

  &__overlay
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background url('/img/patterns/noize.png')

  &__inner
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

  &__top-banner
    position: relative;
    z-index: 1;
    background-color: #4e79ad;
    width: 100%;
    height: 60px
    border-radius: 3px 3px 0 0;

  &__main
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background: $violet-light;
    background: linear-gradient(135deg, #b6cff3 0% 25%, #c8dcf1 25% 50%,#88b4ed 50% 75%,#2f5c8c 75%);
    z-index: 1;
    border-radius: 0 0 3px 3px;

  &__star-box
    position relative
    width: 180px
    height: 180px
    margin 20px auto 0 auto
    opacity 0.7

  &__star,
  &__star::before,
  &__star::after
    position: absolute;
    width: 120px
    height: 120px
    background-color: #9bbfde

  &__star
    top 50%
    left 50%
    transform: translate(-50%, -50%);
    &::before
      content: '';
      transform: rotate(30deg);
    &::after
      content: '';
      transform: rotate(-30deg);

  &__icon
    position absolute
    top 50%
    left 50%
    transform: translate(-50%, -50%);

.game-preview-btn
  position: relative;
  justify-self: end;
  height:80px;
  width: 80%;
  margin: 0 auto 35px;

  &__center
    border: 10px solid $bone;
    height: 60px;
    width: 60px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $violet-light
    &::before
      content: '';
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: #e7e4d5

  &__lines
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 40% 1fr 40%;
    grid-template-rows: 1fr;

  &__lines-left,
  &__lines-right
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #e7e4d5

  &__lines-left
    align-items: flex-end;
    .game-preview-btn__lines-inner
      &::before
        left: -5%;
        border-radius: 50% 0 0 50%;
      &:nth-child(2)
        margin-right: 5px;

  &__lines-right
    grid-column-start: 3;
    .game-preview-btn__lines-inner
      &::before
        right: -5%;
        border-radius: 0 50% 50% 0;
      &:nth-child(2)
        margin-left: 5px;

  &__lines-inner
    position: relative;
    background-color: var(--color-bone);
    height: 10px;
    width: 60%;
    &::before
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      width: 10%;
      background-color: var(--color-bone);
    &:nth-child(2)
      width: 75%;
      margin-top: 6px;
      margin-bottom: 6px;

</style>
