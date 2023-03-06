(function() {

    const audio = document.querySelector('audio');
    const playerTimelineProgress = document.querySelector('.player-progress');

    playerTimelineProgress.addEventListener("click", e => {
        debugger;
        const timelineWidth = window.getComputedStyle(playerTimelineProgress).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek;
    }, false);

})();