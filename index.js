import { jsDateFormatter, slqDateFormatter, numberIntoMonth } from '@isaac_walters/date-formatter';

console.log("index");
console.log(numberIntoMonth(10));

function getListofEvents() {
    return fetch("/events/eventlistjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}

getListofEvents();



