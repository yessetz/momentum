(function() {

    showTime();
    showDate();

    function showTime() {
        const dateObj = new Date();
        const time = document.querySelector('.time');
        const currentTime = dateObj.toLocaleTimeString();
        time.textContent = currentTime;

        setTimeout(showTime, 1000);
    }

    function showDate() {
        const dateObj = new Date();
        const date = document.querySelector('.date');
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: timeZone};
        const currentDate = dateObj.toLocaleDateString('en-En', options);
        date.textContent = currentDate;
        
        setTimeout(showDate, 1000);
    }

})();