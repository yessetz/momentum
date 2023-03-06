(function () {

    let rnd = getRandom(6);
    getQuotes(rnd);

    document.querySelector('.change-quote').addEventListener('click', (event) => {
        let random = getRandom(6);
        getQuotes(random);
    })

    async function getQuotes(num) {
        let quotesFolder = (window.location.href).replace('https://rolling-scopes-school.github.io', '');
        quotesFolder = quotesFolder.replace('/momentum/', '/momentum');
        if (quotesFolder !== '/yessetz-JSFEPRESCHOOL2022Q2/momentum') { quotesFolder = ''; }

        const quotes = quotesFolder + '/assets/json/quotes.json';
        const res = await fetch(quotes);
        const data = await res.json();

        let quote = document.querySelector('.quote');
        let author = document.querySelector('.author');

        quote.textContent = data[num].text;
        author.textContent = data[num].author;
    }

    function getRandom(max) {
        return (Math.floor(Math.random() * (max - 1) + 1));
    }

})();