/** @jsx vNode */

import { vNode, createElement, render, updateElement, myAppEventHandler, addEvent, changeMainContainer, getMainContainer } from '/modules/events/node_modules/@isaac_walters/ocdla-view/view.js';
import { jsDateFormatter, slqDateFormatter } from '/modules/events/node_modules/@isaac_walters/date-formatter/date.js';
import { cityFormatter, stateFormatter, createMemberX } from '/modules/events/assets/js/lib/full/contactFieldFormat.js';
import { CACHE, HISTORY, vNodeHistory } from '/modules/events/node_modules/@isaac_walters/cache-module/cache.js';
import { getDetailsofEvent, getListofContacts, getListofEvents, getCountofContacts } from '/modules/events/assets/js/lib/full/data.js';
import { EventListFull, EventFull }  from '/modules/events/assets/js/lib/full/render.js';
import { switchToList, switchToDetails, doSearch } from '/modules/events/assets/js/lib/full/events.js';



function init() {
    //probably change to accually querry selecter with #, document.querrySelecter
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