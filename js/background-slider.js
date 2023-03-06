(function() {

    let randomNum = getRandomNum(20);

    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');

    setBackground(randomNum);
    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);

    function getSlideNext() {
        let nextNum = Number(randomNum) === 20 ? 1 : ++randomNum;
        setBackground(nextNum.toString());
        randomNum = nextNum;
    }

    function getSlidePrev() {
        let prevNum = Number(randomNum) === 1 ? 20 : --randomNum;
        setBackground(prevNum.toString());
        randomNum = prevNum;
    }

    function setBackground(num) {

        let timeOfDay = getTimeOfDay();
        let backgroundNum = num;

        backgroundNum = backgroundNum.length === 1 ? '0' + backgroundNum : backgroundNum;

        let backgroundURL = `url('https://raw.githubusercontent.com/yessetz/stage1-tasks/assets/images/${timeOfDay}/${backgroundNum}.jpg') center/cover, rgba(0, 0, 0, 0.5)`;

        const img = new Image();
        img.src = `https://raw.githubusercontent.com/yessetz/stage1-tasks/assets/images/${timeOfDay}/${backgroundNum}.jpg`;
        img.onload = () => {
            document.body.style.background= backgroundURL;
        }
        
    }

    function getRandomNum(max) {

        return (Math.floor(Math.random() * (max - 1) + 1)).toString();
    }

    function getTimeOfDay() {
        
        const date = new Date();
        const hours = date.getHours();
        const dayPart = Math.floor(hours / 6);

        let timeOfDay = '';

        switch (dayPart) {
            case 0 : timeOfDay = 'night'; break;
            case 1 : timeOfDay = 'morning'; break;
            case 2 : timeOfDay = 'afternoon'; break;
            case 3 : timeOfDay = 'evening'; break;
            default : '';
        }

        return timeOfDay;
    }

})();