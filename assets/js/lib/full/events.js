/** @jsx vNode */
export { switchToList, switchToDetails, doSearch };
import { vNode } from '/modules/events/node_modules/@isaac_walters/ocdla-view/view.js';
import { CACHE, HISTORY, vNodeHistory } from '/modules/events/node_modules/@isaac_walters/cache-module/cache.js';
import { EventListFull, EventFull, EventList, EventSearch } from '/modules/events/assets/js/lib/full/render.js';
import { getDetailsofEvent, getListofContacts, getListofEvents, getCountofContacts } from '/modules/events/assets/js/lib/full/data.js';

function switchToDetails(id) {
  var event = getDetailsofEvent(id);
  var contacts = getListofContacts(id);
  return Promise.all([event, contacts]).then(function (data) {
    var virtualNodes = vNode(EventFull, {
      event: data[0],
      contacts: data[1]
    });
    document.getElementById("switchButton").classList.value = "switchButton";
    window.scrollTo(0, 0);
    return virtualNodes;
  });
}

function switchToList() {
  var virtualNodes = HISTORY.getRecent(1);
  document.getElementById("switchButton").classList.value = "hiddenButton";
  window.scrollTo(0, 0);
  return Promise.resolve(virtualNodes);
}

function doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc) {
  var cached = CACHE.get("events");
  var copied = JSON.parse(JSON.stringify(cached));
  var results = copied.filter(function (event) {
    return doesEventFit(event, stringEntered);
  });

  if (orderDatesAcs == true) {
    results.sort(oldestToNewestSort);
  }

  if (orderAttendeesDesc == true) {
    results.sort(contactsHighestToLowest);
  }

  var virtualNodes = vNode("div", null, vNode(EventListFull, {
    events: results,
    searchBar: stringEntered,
    datesChecked: orderDatesAcs,
    contactsChecked: orderAttendeesDesc
  }));
  return Promise.resolve(virtualNodes);
}

function doesEventFit(testedEvent, stringEntered) {
  if (testedEvent.Name && testedEvent.Name.toLowerCase().includes(stringEntered.toLowerCase()) || testedEvent.Banner_Location_Text__c && testedEvent.Banner_Location_Text__c.toLowerCase().includes(stringEntered.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

function oldestToNewestSort(a, b) {
  if (a.Start_Date__c < b.Start_Date__c) {
    return -1;
  }

  if (a.Start_Date__c > b.Start_Date__c) {
    return 1;
  } else {
    return 0;
  }
}

function contactsHighestToLowest(a, b) {
  var count = CACHE.get("eventsContactCount");
  var aCount = count[a.Id] && count[a.Id].expr0;
  var bCount = count[b.Id] && count[b.Id].expr0;

  if (!aCount && !bCount) {
    return 0;
  }

  if (!aCount) {
    return 1;
  }

  if (!bCount) {
    return -1;
  }

  if (aCount > bCount) {
    return -1;
  }

  if (aCount < bCount) {
    return 1;
  }

  if (aCount == bCount) {
    return 0;
  }
}