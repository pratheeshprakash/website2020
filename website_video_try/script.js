const intro = document.querySelector('#scrollVideo');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');

var offSet = window.innerHeight / 2; //used to offset the trigger point to the centre of the page
// console.log("screen offset=" + offSet)



const section = document.querySelector('section');
const end = section.querySelector('h1');


const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
        duration: 5000, // length of video in ms
        triggerElement: scrollVideo, //name of the element to use as trigger
        offset: offSet, // this should be half the height of the video to work properly
        triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
    })
    .addIndicators() //used for only debugging and showing trigger handles
    .setPin(intro) // used for locking the scene in position
    .addTo(controller);


// video animation

let accVal = 0.1; // acceleration value used for easing in video
let scrollpos = 0;
let delay = 0;



scene.on("update", e => {

    // this variable is used to start the video at the trigger point
    // position where the scroll bar hits start of trigger
    // converted to seconds to be subtracted from the scroll bar position
    var scrolloffset = scene.scrollOffset() / 1000;

    // used to offset the trigger point to the centre of the page
    // it is updated everytime update is called
    // used to update the screen trigger offset point if page size is changed without refreshing
    var offSet1 = window.innerHeight / 2;

    scene.offset(offSet1)
    // console.log("screen offset=" + offSet1)
    // console.log("sceen offset=" + scene.offset())
    scrollpos = e.scrollPos / 1000;
    scrollpos -= scrolloffset;

    // to prevent the scroll time from going in negative
    if (scrollpos < 0)
        scrollpos = 0
    // console.log("Soll=" + scrollpos);
});

setInterval(() => {
    delay += (scrollpos - delay) * accVal;
    // console.log(delay);
    video.currentTime = delay;
}, 33.3); //frame rate 30 fps time in ms