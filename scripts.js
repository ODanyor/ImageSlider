// Containers
const subContainer = document.querySelector(".sub-container");
const sliderImges = document.querySelectorAll(".sub-container img");
const bubblesCont = document.querySelector(".bubbles");
const slideButton = document.querySelector(".slide-show");
const progressLine = document.querySelector(".progress-line");

// Bubbles
const bubble = `<div class="bubble"></div>`;
bubblesCont.innerHTML = bubble.repeat(sliderImges.length);
const bubbles = document.querySelectorAll(".bubble");

// Buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// constants
let autoSlide = 0;
let counter = 0;
const width = sliderImges[0].clientWidth;
bubblesCont.childNodes[counter].style.background = "rgba(255, 255, 255, 0.8)";

// Actions
const sliderEngine = () => {
  subContainer.style.transform = `translateX(${width * counter}px)`;
  bubblesCont.childNodes.forEach((child, index) => {
    if (index === -counter) {
      child.style.cssText = "background: rgba(255, 255, 255, 0.8);";
    } else {
      child.style.cssText = "background: rgba(0, 0, 0, 0.4); box-shadow: none";
    }
  });
};
const moveSliderImage = () => {
  if (counter > 0) {
    counter = -sliderImges.length + 1;
    sliderEngine();
  } else if (counter <= -sliderImges.length) {
    counter = 0;
    sliderEngine();
  }
  sliderEngine();
};

// Slider controllers
prevBtn.addEventListener("click", () => {
  counter++;
  moveSliderImage();
});
nextBtn.addEventListener("click", () => {
  counter--;
  moveSliderImage();
});
bubblesCont.childNodes.forEach((child, index) => {
  child.addEventListener("click", () => {
    counter = -index;
    moveSliderImage();
  });
});

// Slide show functions
slideButton.addEventListener("click", () => {
  if (autoSlide >= 1) autoSlide = 0;
  else autoSlide++;
  autoSlide > 0
    ? (slideButton.style.cssText = "background: red; border-radius: 5px;")
    : (slideButton.style.cssText = "none");

  let interval = setInterval(() => {
    if (autoSlide > 0) {
      counter--;
      moveSliderImage();
    } else clearInterval(interval);
  }, 2000);
});

// ==== Grabbing scroll ====
let isDown = false;
let translateX = 0;
let startX;
let xWalk;
let x;

// Grabbing scroll functions
subContainer.addEventListener("mousedown", e => {
  translateX = subContainer.style.transform.split("(")[1].split("px")[0];
  isDown = true;
  startX = e.pageX;
});
subContainer.addEventListener("mouseup", () => {
  isDown = false;
  if (startX > x + 200) {
    counter--;
    moveSliderImage();
  } else if (startX < x - 200) {
    counter++;
    moveSliderImage();
  } else moveSliderImage();
});
subContainer.addEventListener("mouseleave", () => (isDown = false));
subContainer.addEventListener("mousemove", e => {
  if (!isDown) return; // Stop function from running
  x = e.pageX;
  xWalk = startX - x;
  subContainer.style.transform = `translateX(${translateX - xWalk}px)`;
});
