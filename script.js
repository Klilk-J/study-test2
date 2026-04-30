const scene = document.getElementById('scene');
const bgLayer = document.querySelector('.layer-bg');
const fgLayer = document.querySelector('.layer-fg');
const bgSpeed = -2;
const fgSpeed = 50;
scene.addEventListener('mousemove', (e) => {
  const windowWidth = window.innerWidth;
  const mouseXRatio = (e.clientX / windowWidth) * 2 - 1;
  const bgMove = mouseXRatio * bgSpeed;
  bgLayer.style.transform = `translate(calc(-50% + ${bgMove}px), -50%)`;
  const fgMove = mouseXRatio * fgSpeed;
  fgLayer.style.transform = `translate(calc(-50% + ${fgMove}px), -50%)`;
});
// ============================================================
// 🎵 用户激活解锁音频方案（最大化自动播放成功率）
// ============================================================
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
let isMusicPlaying = false;
// ----- 工具函数：更新按钮状态 -----
function updateMusicBtn(playing) {
  if (playing) {
    musicBtn.textContent = '🎵';
    musicBtn.classList.add('playing');
    isMusicPlaying = true;
  } else {
    musicBtn.textContent = '🔇';
    musicBtn.classList.remove('playing');
    isMusicPlaying = false;
  }
}
// ----- 工具函数：播放 bgm 并更新状态 -----
function playBgm() {
  return bgm.play().then(() => {
    updateMusicBtn(true);
    console.log('🎵 音乐已播放');
    return true;
  }).catch((err) => {
    console.log('⏳ 播放被阻止:', err);
    return false;
  });
}
// ============================================================
// 🔑 核心：用户激活解锁（AudioContext 方案）
// ============================================================
// 1️⃣ 一打开页面，立即创建并解锁 AudioContext
window.addEventListener('load', async () => {
  try {
    // 创建音频上下文（这会让浏览器认为"用户即将有交互"）
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // 唤醒音频上下文（关键步骤！）
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
      console.log('✅ AudioContext 已唤醒（用户激活解锁成功）');
    }
    
    // 2️⃣ 解锁后立即尝试播放背景音乐
    const success = await playBgm();
    
    if (!success) {
      // 如果还是不行，用第二个方案：等用户第一次点击
      console.log('⏳ 等待用户点击激活...');
    }
    
  } catch (e) {
    console.log('AudioContext 创建失败，降级方案:', e);
    // 降级方案：直接尝试播放
    playBgm();
  }
});
// 3️⃣ 兜底方案：如果上面的解锁没生效，用户第一次点击时自动播放
document.addEventListener('click', async function autoPlayOnFirstClick() {
  if (!isMusicPlaying && bgm.paused) {
    const success = await playBgm();
    if (success) {
      // 移除监听，只触发一次
      document.removeEventListener('click', autoPlayOnFirstClick);
    }
  }
});
// ============================================================
// 🔘 按钮切换播放/暂停
// ============================================================
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (isMusicPlaying) {
    bgm.pause();
    updateMusicBtn(false);
  } else {
    playBgm();
  }
});
// 点击遮罩层立即播放并移除它
document.getElementById('clickCatcher').addEventListener('click', function(e) {
  this.remove();  // 移除遮罩，让下面的元素可点击
  if (!isMusicPlaying) playBgm();
});