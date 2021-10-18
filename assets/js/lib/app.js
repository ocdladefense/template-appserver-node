/** @jsx vNode */
import { vNode, addEvent, getMainContainer, changeMainContainer, myAppEventHandler } from '/modules/events/node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '/modules/events/node_modules/@ocdladefense/view/cache.js';
import { cityFormatter, stateFormatter, createMemberX } from '/modules/events/assets/js/lib/contactFieldFormat.js';
import { getEvents, getEventDetails, getRegistrants, getCountRegistrants } from '/modules/events/assets/js/lib/data.js';
import { EventListFull, EventFull } from '/modules/events/assets/js/lib/render.js';
import { switchToList, switchToDetails, doSearch } from '/modules/events/assets/js/lib/events.js';

function init() {
  // Probably change to document.querySelector.
  changeMainContainer("main");
  var events = getEvents();
  var eventsContactCount = getCountRegistrants();
  Promise.all([events, eventsContactCount]).then(function (data) {
    CACHE.set("events", data[0]);
    CACHE.set("eventsContactCount", data[1]);
    var initTree = vNode(EventListFull, {
      events: data[0],
      searchBar: "",
      datesChecked: false,
      contactsChecked: false
    });
    HISTORY.clear();
    HISTORY.set(0, initTree);
    render(getMainContainer(), initTree);
  });
  document.addEventListener("click", myAppEventHandler);
}

addEvent("search", function () {
  var stringEntered = document.getElementById("searchBar").value;
  var orderDatesAcs = document.getElementById("dateCheckBox").checked;
  var orderAttendeesDesc = document.getElementById("contactsChecked").checked;
  return doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc);
});
addEvent("list", switchToList);
addEvent("details", switchToDetails);
domReady(init);