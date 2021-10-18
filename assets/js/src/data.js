export { getEvents, getEventDetails, getRegistrants, getCountRegistrants };



function getEventDetails(queryId) {
    return fetch("/events/eventdetailsjson/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getRegistrants(queryId) {
    return fetch("/events/eventcontactlistjson/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getCountRegistrants() {
    return fetch("/events/eventcontactcountjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getEvents() {
    return fetch("/events/eventlistjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}

