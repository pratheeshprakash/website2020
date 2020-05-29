$(document).ready(function() {


    const intro = document.querySelector('#scrollVideo');
    const video = intro.querySelector('video');
    const text = intro.querySelector('h1');

    var offSet = window.innerHeight / 2; //used to offset the trigger point to the centre of the page
    // console.log("screen offset=" + offSet)



    const section = document.querySelector('section');
    const end = section.querySelector('h1');


    const controller = new ScrollMagic.Controller();

    const scene = new ScrollMagic.Scene({
            duration: 10000, // length of video in ms
            triggerElement: scrollVideo, //name of the element to use as trigger
            offset: offSet, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .setPin(intro) // used for locking the scene in position
        .addTo(controller);


    // userinterface section
    const sceneA = new ScrollMagic.Scene({
            duration: 1540, // length of video in ms
            triggerElement: userinterface, //name of the element to use as trigger
            offset: window.innerHeight /1.5, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .setPin(userinterface) // used for locking the scene in position
        .addTo(controller);

    //this scene is used to close all the accordion menus on exiting the main SceneA
    //this triggers a bit before the first sceneA1 and bit after sceneA3
    const sceneCloseA = new ScrollMagic.Scene({
            duration: 1100, // length of video in ms
            triggerElement: userinterface, //name of the element to use as trigger
            offset: offSet + 220, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("leave", function(event) {
            $('#arcCollapse2').collapse('hide');
            $('#arcCollapse1').collapse('hide');
        })
        .addTo(controller);

    const sceneA1 = new ScrollMagic.Scene({
            duration: 500, // length of video in ms
            triggerElement: userinterface, //name of the element to use as trigger
            offset: offSet + 320, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("enter", function(event) {
            $('#arcCollapse2').collapse('show');
            $('#arcCollapse1').collapse('hide');
        })
        .addTo(controller);

    const sceneA2 = new ScrollMagic.Scene({
            duration: 500, // length of video in ms
            triggerElement: userinterface, //name of the element to use as trigger
            offset: offSet + 820, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("enter", function(event) {
            $('#arcCollapse1').collapse('show');
            $('#arcCollapse2').collapse('hide');
        })
        .addTo(controller);
    // userinterface section


    //Application section
    const scene3 = new ScrollMagic.Scene({
            duration: 1930, // length of video in ms
            triggerElement: application, //name of the element to use as trigger
            offset: window.innerHeight /2.4, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .setPin(application) // used for locking the scene in position
        .addTo(controller);


    //this scene is used to close all the accordion menus on exiting the main SceneA
    //this triggers a bit before the first sceneA1 and bit after sceneA3
    const sceneClose3 = new ScrollMagic.Scene({
            duration: 1730, // length of video in ms
            triggerElement: application, //name of the element to use as trigger
            offset: offSet + 30, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("leave", function(event) {
            $('#collapse1').collapse('hide');
            $('#collapse2').collapse('hide');
            $('#collapse3').collapse('hide');

        })
        .addTo(controller);

    const scene3one = new ScrollMagic.Scene({
            duration: 500, // length of video in ms
            triggerElement: application, //name of the element to use as trigger
            offset: offSet + 130, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("enter", function(event) {
            $('#collapse1').collapse('show');
            $('#collapse2').collapse('hide');
            $('#collapse3').collapse('hide');
        })
        .addTo(controller);

    const scene3two = new ScrollMagic.Scene({
            duration: 500, // length of video in ms
            triggerElement: application, //name of the element to use as trigger
            offset: offSet + 630, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("enter", function(event) {
            $('#collapse2').collapse('show');
            $('#collapse1').collapse('hide');
            $('#collapse3').collapse('hide');
        })
        .addTo(controller);
    const scene3three = new ScrollMagic.Scene({
            duration: 500, // length of video in ms
            triggerElement: application, //name of the element to use as trigger
            offset: offSet + 1130, // this should be half the height of the video to work properly
            triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
        })
        .addIndicators() //used for only debugging and showing trigger handles
        .on("enter", function(event) {
            $('#collapse3').collapse('show');
            $('#collapse2').collapse('hide');
            $('#collapse1').collapse('hide');
        })
        .addTo(controller);
    //Application section


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
    });

    setInterval(() => {
        delay += (scrollpos - delay) * accVal;
        // console.log(delay);
        video.currentTime = delay;
    },50); //frame rate 30 fps time in ms
});