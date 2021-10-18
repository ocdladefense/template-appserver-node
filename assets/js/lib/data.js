export { getEvents, getEventDetails, getRegistrants, getCountRegistrants };

function getEventDetails(queryId) {
  return fetch("/events/eventdetailsjson/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getRegistrants(queryId) {
  return fetch("/events/eventcontactlistjson/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getCountRegistrants() {
  return fetch("/events/eventcontactcountjson").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getEvents() {
  return fetch("/events/eventlistjson").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}