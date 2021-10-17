export { getDetailsofEvent, getListofContacts, getListofEvents, getCountofContacts };

function getDetailsofEvent(queryId) {
    return fetch("/events/eventdetailsjson/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getListofContacts(queryId) {
    return fetch("/events/eventcontactlistjson/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getListofEvents() {
    return fetch("/events/eventlistjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getCountofContacts() {
    return fetch("/events/eventcontactcountjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}