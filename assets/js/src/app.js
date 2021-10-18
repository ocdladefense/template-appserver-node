/** @jsx vNode */

import { vNode } from '/modules/events/node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '/modules/events/node_modules/@ocdladefense/view/cache.js';

import { cityFormatter, stateFormatter, createMemberX } from '/modules/events/assets/js/lib/full/contactFieldFormat.js';

import { getDetailsofEvent, getListofContacts, getListofEvents, getCountofContacts } from '/modules/events/assets/js/lib/full/data.js';

import { EventListFull, EventFull } from '/modules/events/assets/js/lib/full/render.js';

import { switchToList, switchToDetails, doSearch } from '/modules/events/assets/js/lib/full/events.js';



function init() {
    // Probably change to document.querySelector.
    changeMainContainer("main");

    let events = getListofEvents();
    let eventsContactCount = getCountofContacts();

    Promise.all([events, eventsContactCount]).then(function(data) {
        CACHE.set("events", data[0]);
        CACHE.set("eventsContactCount", data[1]);
        let initTree = <EventListFull events={data[0]} searchBar={""} datesChecked={false} contactsChecked={false} />;
        HISTORY.clear();
        HISTORY.set(0, initTree);
        render(getMainContainer(), initTree);
    });

    document.addEventListener("click", myAppEventHandler);
}

addEvent("search", function() {
    let stringEntered = document.getElementById("searchBar").value;
    let orderDatesAcs = document.getElementById("dateCheckBox").checked;
    let orderAttendeesDesc = document.getElementById("contactsChecked").checked;

    return doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc);
});
addEvent("list", switchToList);
addEvent("details", switchToDetails);


domReady(init);