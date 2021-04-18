const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  alert(`Ширина экрана ${screenWidth}px, высота экрана ${screenHeight}px`);
});