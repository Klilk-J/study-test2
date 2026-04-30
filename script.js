const scene = document.getElementById('scene');
const bgLayer = document.querySelector('.layer-bg');
const fgLayer = document.querySelector('.layer-fg');

// 移动系数：背景移动小，前景移动大，正负号决定方向
const bgSpeed = -20;  // 背景反向移动一点点，产生远景感
const fgSpeed = 50;   // 前景同向移动更多，感觉离得近

scene.addEventListener('mousemove', (e) => {
  // 获取窗口宽度
  const windowWidth = window.innerWidth;
  // 计算鼠标相对于窗口中心的水平位置比例，范围：-1（最左） 到 1（最右）
  const mouseXRatio = (e.clientX / windowWidth) * 2 - 1;

  // 应用变换
  bgLayer.style.transform = `translateX(${mouseXRatio * bgSpeed}px)`;
  fgLayer.style.transform = `translateX(${mouseXRatio * fgSpeed}px)`;
});