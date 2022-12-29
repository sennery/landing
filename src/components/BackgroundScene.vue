<template>
  <aside>
    <img       
      src="@/assets/letter.svg" 
      alt="Vue logo" 
      class="logo" 
      width="125" 
      height="125"
    >
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -999;
}

.logo {  
  transform: rotateZ(90deg) scale(10) translate(-1rem, 1rem);
  transform-origin: 0 50%;
}
</style>