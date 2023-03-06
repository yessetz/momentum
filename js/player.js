(function() {
    
    const audio = document.querySelector('audio');
    const play = document.querySelector('.play');
    const playNextSong = document.querySelector('.play-next');
    const playPrevSong = document.querySelector('.play-prev');
    const playerProgress = document.querySelector('.player-progress');

    let playNum = isNaN(getLocaleStoragePlayListNum()) ? setLocaleStoragePlayListNum(0) : getLocaleStoragePlayListNum();

    play.addEventListener('click', toggleBtn);
    playNextSong.addEventListener('click', playNext);
    playPrevSong.addEventListener('click', playPrev);
    audio.addEventListener('ended', playNext);

    playerProgress.addEventListener('click', e => {
        const timelineWidth = window.getComputedStyle(playerProgress).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek;
    }, false);

    function toggleBtn() {

        document.querySelector('.play').classList.toggle('pause');
        playNum = Number(getLocaleStoragePlayListNum());

        let isPlay = document.querySelector('.pause') !== null ? false : true;
        
        playAudio(isPlay, playNum, true);
    }

    function playNext() {
        playNum = Number(getLocaleStoragePlayListNum());
        document.querySelector('.play-list').children[playNum].style.opacity = 0.5;

        playNum = playNum === 3 ? 0 : playNum + 1;
        
        setLocaleStoragePlayListNum(playNum);
    
        if (document.querySelector('.pause')) {
            let isPlay = false;
            playAudio(isPlay, playNum, false);
        }
    }

    function playPrev() {

        playNum = Number(getLocaleStoragePlayListNum());
        document.querySelector('.play-list').children[playNum].style.opacity = 0.5;

        playNum = playNum === 0 ? 3 : playNum - 1;
        
        setLocaleStoragePlayListNum(playNum);
    
        if (document.querySelector('.pause')) {
            let isPlay = false;
            playAudio(isPlay, playNum, false);
        }
    }

    function playAudio(isPlay, playNum, currentSong) {

        let audioSrc = '/' + (audio.src).replace(audio.baseURI, '');
        let audioFolder = (audio.baseURI).replace('https://rolling-scopes-school.github.io', '');
        audioFolder = audioFolder.replace('/momentum/', '/momentum');
        if (audioFolder !== '/yessetz-JSFEPRESCHOOL2022Q2/momentum') { audioFolder = ''; }

        audioSrc = audioSrc.replaceAll('%20', ' ');

        if (!isPlay && (playList[playNum].src !== audioSrc)) { 
            audio.src = audioFolder + playList[playNum].src;
            audio.currentTime = 0;
            audio.play();

            let songName = (playList[playNum].src).replace('/assets/sounds/', '');
            songName = songName.replace('.mp3', '');
            document.querySelector('.player-title').textContent = songName;
            document.querySelector('.player-length').textContent = playList[playNum].duration;

            document.querySelector('.play-list').children[playNum].style.opacity = 1;
        }
        else if (!isPlay) {
            audio.currentTime = getLocaleStorageSongCurrentTime();
            audio.play();

            document.querySelector('.play-list').children[playNum].style.opacity = 1;
        }
        else if (currentSong) {
            setLocaleStorageSongCurrentTime(audio.currentTime);
            audio.pause();
        }
        else {
            audio.pause();

            document.querySelector('.play-list').children[playNum].style.opacity = 0.5;
        }
    }

    setInterval(() => {
        const progressBar = document.querySelector('.player-progress-tracking');
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
        document.querySelector('.player-current-time').textContent = getTimeCodeFromNum( audio.currentTime );

    }, 1000);

    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
      
        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
          seconds % 60
        ).padStart(2, 0)}`;
    }

    let playList = [
        {
            title: 'Aqua Caelestis',
            src: '/assets/sounds/Aqua Caelestis.mp3',
            duration: '00:45'
        },
        {
            title: 'Ennio Morricone',
            src: '/assets/sounds/Ennio Morricone.mp3',
            duration: '01:43'
        },
        {
            title: 'River Flows in You',
            src: '/assets/sounds/River Flows In You.mp3',
            duration: '03:55'
        },
        {
            title: 'Summer Wind',
            src: '/assets/sounds/Summer Wind.mp3',
            duration: '01:56'
        }
    ];

    for (let i = 0; i < playList.length; i++) {
        const list = document.querySelector('.play-list');
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = playList[i].title;
        list.append(li);
    }

    function setLocaleStoragePlayListNum(num) {
        localStorage.setItem('playNum', num);
    }
    
    function getLocaleStoragePlayListNum() {
        if (localStorage.getItem('playNum')) {
            return localStorage.getItem('playNum');
        }
    }

    function setLocaleStorageSongCurrentTime(num) {
        localStorage.setItem('songCurrentTime', num);
    }
    
    function getLocaleStorageSongCurrentTime() {
        if (localStorage.getItem('songCurrentTime')) {
            return localStorage.getItem('songCurrentTime');
        }
    }

})();