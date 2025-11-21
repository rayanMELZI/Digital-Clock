const hourEl = document.getElementById("hours");

const minuteEl = document.getElementById("minutes");

const secondEl = document.getElementById("seconds");

const ampmEl = document.getElementById("ampm");

function updateClock(){
    let h = new Date().getHours()
    let m = new Date().getMinutes()
    let s = new Date().getSeconds()
    let ampm = "AM"

    if (h > 12) {
        h = h - 12; 
        ampm = "PM";
    }

    h = h<10 ? '0'+h : h;
    m = m<10 ? '0'+m : m;
    s = s<10 ? '0'+s : s;

    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;

    setTimeout(()=>{
        updateClock();
    }, 1000)
}

updateClock()

const fullscreenButton = document.getElementById('fullscreen-btn');
const elementToFullScreen = document.body; // You want the whole page to go fullscreen

fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        // EXIT FULLSCREEN
        document.exitFullscreen();
        releaseWakeLock(); // <--- Release the lock when exiting
    } else {
        // ENTER FULLSCREEN
        elementToFullScreen.requestFullscreen().then(() => {
            requestWakeLock(); // <--- Request the lock when entering
        }).catch(err => {
            console.error('Fullscreen request failed:', err);
        });
    }
});

let wakeLock = null;

// Asynchronous function to request the screen wake lock
const requestWakeLock = async () => {
  try {
    // Request a 'screen' type lock
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen Wake Lock is active!');

    // Add a listener to re-acquire the lock if it's released by the system
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released by the system.');
    });

  } catch (err) {
    // This often fails if the device is in low power mode or the user denies permission.
    console.error(`Wake Lock failed: ${err.name}, ${err.message}`);
  }
};

// Function to release the screen wake lock
const releaseWakeLock = async () => {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    console.log('Screen Wake Lock is released.');
  }
};
