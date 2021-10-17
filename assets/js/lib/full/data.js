export { getDetailsofEvent, getListofContacts, getListofEvents, getCountofContacts };

function getDetailsofEvent(queryId) {
  return fetch("/events/eventdetailsjson/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getListofContacts(queryId) {
  return fetch("/events/eventcontactlistjson/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getListofEvents() {
  return fetch("/events/eventlistjson").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getCountofContacts() {
  return fetch("/events/eventcontactcountjson").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}