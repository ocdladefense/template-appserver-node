/** @jsx vNode */

export { switchToList, switchToDetails, doSearch };


import { vNode } from '/modules/events/node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '/modules/events/node_modules/@ocdladefense/view/cache.js';


import { EventListFull, EventFull, EventList, EventSearch }  from '/modules/events/assets/js/lib/full/render.js';
import { getDetailsofEvent, getListofContacts, getListofEvents, getCountofContacts } from '/modules/events/assets/js/lib/full/data.js';




function switchToDetails(id) {
    let event = getDetailsofEvent(id);
    let contacts = getListofContacts(id);
    
    return Promise.all([event, contacts]).then(function(data) {
        document.getElementById("switchButton").classList.value = "switchButton";

        return <EventFull event={data[0]} contacts={data[1]} />;
    });
}



function switchToList() {
    document.getElementById("switchButton").classList.value = "hiddenButton";

		// Need to change this function call to getLast();
    return Promise.resolve(HISTORY.getRecent(1));
}


function doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc) {
    let cached = CACHE.get("events");
    let copied = JSON.parse(JSON.stringify(cached));
    let results = copied.filter(event => doesEventFit(event, stringEntered));

    if (orderDatesAcs == true) {
        results.sort(oldestToNewestSort);
    }
    if (orderAttendeesDesc == true) {
        results.sort(contactsHighestToLowest);
    }

    let virtualNodes = <div><EventListFull events={results} searchBar={stringEntered} datesChecked={orderDatesAcs} contactsChecked={orderAttendeesDesc} /></div>;
    
    return Promise.resolve(virtualNodes);
}




function doesEventFit(testedEvent, stringEntered) {
    if (testedEvent.Name && testedEvent.Name.toLowerCase().includes(stringEntered.toLowerCase()) || testedEvent.Banner_Location_Text__c && testedEvent.Banner_Location_Text__c.toLowerCase().includes(stringEntered.toLowerCase())) {
        return true;
    }
    else {
        return false;
    }
}



function oldestToNewestSort(a, b) {
    if (a.Start_Date__c < b.Start_Date__c) {
        return -1;
    }
    if (a.Start_Date__c > b.Start_Date__c) {
        return 1;
    }
    else {
        return 0;
    }

}



function contactsHighestToLowest(a, b) {
    
    let count = CACHE.get("eventsContactCount");
    let aCount = count[a.Id] && count[a.Id].expr0;
    let bCount = count[b.Id] && count[b.Id].expr0;

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




