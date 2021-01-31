// 1. Create a "game cheat code" like secret code feature,
// activated by typing secret password (record letter key presses in certain sequence).
// When a user types e.g. "hello", launch a response alert or something like that.
// (TIP: think about queue data structure)
const createCheatCode = (word) => {
    let keyPresses = new Array(word.length);
    document.addEventListener('keypress', event => {
      keyPresses.shift();
      keyPresses.push(event.key);
      // console.log(keyPresses.join(''));
      if (keyPresses.join('').toLowerCase() === word.toLowerCase()) {
        alert("Correct cheat code entered!");
      }
    });
  };
  createCheatCode('Secret');
  
  
  // 2. Create a function that shows the x and y coordinates of mouse double-clicks on the page
  const showMouseClickCoords = () => {
    const output = document.querySelector('.output');
    document.addEventListener('dblclick', event => {
      output.textContent = `Double-clicked at ${event.clientX}, ${event.clientY}.`;
    });
  };
  showMouseClickCoords();
  
  
  // 3. Create an element that reacts (e.g. console.log something) to touches but not clicks
  const reactToTouches = () => {
    const target = document.querySelector('.touch');
    const output = document.querySelector('.output');
    target.addEventListener('touchstart', event => {
      output.textContent = `You touched the box!`;
    });
  };
  reactToTouches();
  
  // 4. Create a timer that tells user to "hurry up" after 15 secs of browsing
  const createTimerStupid = () => {
    const output = document.querySelector('.output');
    setTimeout(() => {
      output.textContent = 'Do something, please!';
    }, 15000);
  };
  createTimerStupid();
  
  // Create a timer that tells user to "hurry up" after 15 secs of idling
  // (= not doing anything: mouse hasn't been moving, keyboard keys haven't been pressed...)
  const createInactivityTimer = (duration) => {
    const output = document.querySelector('.output');
    let timer;
    const resetTimer = (event) => {
      // console.log('inactivity timer resetted', event);
      clearTimeout(timer);
      timer = setTimeout(() => {
        output.textContent = 'Do something, please!';
      }, duration * 1000);
    };
    resetTimer();
    document.addEventListener('keypress', resetTimer);
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('touchstart', resetTimer);
  };
  createInactivityTimer(15);