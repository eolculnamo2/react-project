import 'babel-polyfill';

const checkIfRendered = () => window !== undefined;

const fetchData = async uri => {
    const res = await fetch(uri)
            .then( res => res.json() )
            .then( data => data);
    return res; 
};

const formatTime = input => {
    const timeSplit = input.split(":");
    timeSplit[0] = +timeSplit[0]; //converts to number

    return timeSplit[0] > 12 ? timeSplit[0] - 12 + ":" + timeSplit[1] + "PM" 
                             : timeSplit[0] === 12 ? input+"PM"
                             : input +"AM";
}

const scrollToTop = () => document.getElementById('app').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

export { 
         checkIfRendered,
         fetchData, 
         formatTime,
         scrollToTop 
        };