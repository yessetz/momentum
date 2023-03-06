(function() {

    showGreeting();
    showName();

    function showName() {

        function setLocaleStorage() {

            const userName = document.querySelector('.userName');

            localStorage.setItem('userName', userName.value);
        }
        window.addEventListener('beforeunload', setLocaleStorage);
    
        function getLocaleStorage() {

            const userName = document.querySelector('.userName');

            if (localStorage.getItem('userName')) {
                
                let val = localStorage.getItem('userName');

                userName.value = val;
            }
        }
        window.addEventListener('load', getLocaleStorage);
    }


    function showGreeting() {
        
        const timeOfDay = getTimeOfDay();
        const greetingText = `Good ${timeOfDay}`;
        const greeting = document.querySelector('.greeting');
        
        greeting.textContent = greetingText;
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