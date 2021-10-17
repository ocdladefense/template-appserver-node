/** @jsx vNode */


/**

This is our list of components to be used in the app.

**/



export { EventListFull, EventFull, EventList, EventSearch };


import { vNode, createElement, render, updateElement, tree, parseComponent, nodeList } from '/modules/events/node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '/modules/events/node_modules/@ocdladefense/view/cache.js';

import { cityFormatter, stateFormatter, createMemberX } from '/modules/events/assets/js/lib/full/contactFieldFormat.js';




const EventListFull = function(props) {
    return(
        <div>
            <EventSearch searchBar={props.searchBar} datesChecked={props.datesChecked} contactsChecked={props.contactsChecked} /> 
            <EventList events={props.events} />
        </div>
    )
};

const EventSearch = function(props) {
    let searchBar = props.searchBar;
    let datesChecked = props.datesChecked;
    let contactsChecked = props.contactsChecked;

    return (
        <div class="flex-parent event-list" id="searchArea">
            <h1>Upcoming OCDLA Seminars</h1>
            <br />
            <h3>Search for Events</h3>
            <input type="text" id="searchBar" placeholder="Enter name or location" style="float:left;" value={searchBar} />
            <input type="button" id="submitSearch" data-action="search" value="search" />
            <br />
            <p style="float:left;">Dates from Oldest to Newest: </p>
            <input type="checkbox" id="dateCheckBox" checked={datesChecked ? true : null} />
            <br />
            <p style="float:left;">Number of Attendees from Highest to Lowest: </p>
            <input type="checkbox" id="contactsChecked" checked={contactsChecked ? true : null} />
            <br />
        </div>
    )
};

const EventList = function(props) {
    let events = props.events;

    let list = [];
    for (let i = 0; i < events.length; i++) {
        list.push(<EventListItem event={events[i]} />);
    }

    return (
        <div class="flex-parent event-list" id="contactList3">
            {list}
        </div>
    )
};

const EventListItem = function(props) {
    
    let Count = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
    return (
        <div class="event-list-item">
            <h3><a class="eventButton eventButton2" href={"#" + props.event.Id} data-action="details" data-event-id={props.event.Id}>{props.event.Name}</a></h3>
            <p>{props.event.Banner_Location_Text__c}</p>
            <p>{props.event.Start_Date__c}</p>
            <p>Attendees: {CACHE.get("eventsContactCount")[props.event.Id] ? Count : "None"}</p>
        </div>
    )
};

const EventFull = function(props) {
    return(
        <div>
            <EventDetails event={props.event} />
            <ContactList contacts={props.contacts} />
        </div>
    )
};

const EventDetails = function(props) {
    let event = props.event;

    return (
        <div>
            <h1 class="marginMaker2">
                {event.Name}
            </h1>
            <h3 class="marginMaker">
                {event.Start_Date__c}
            </h3>
            <a href={"https://ocdla.force.com/OcdlaEvent?id=" + event.Id} target="_blank" class="marginMaker">
                Link to the event page in more detail.
            </a>
        </div>
    )
};


const ContactList = function(props) {
    let contacts = props.contacts;

    let attendees = [];
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].Contact__r != null) {
            attendees.push(<Attendee contact={contacts[i]} />);
        }
    }

    return (
        <div class="flex-parent contact-list" id="contactList3">
            <br />
            <h3>List of Attendees</h3>
            <p>An X by the name indicates membership.</p>
            <ul class="table-row should-be-invisible table-headers">
                <li class="table-cell">Name</li>
                <li class="table-cell">Order Date</li>
                <li class="table-cell">Ticket Type</li>
                <li class="table-cell">Location</li>
            </ul>
            {attendees}
        </div>
    )
};

const Attendee = function(props) {

    let contact = props.contact;

    return (
        <ul class="table-row">
            <li class="table-cell attendee-name">{contact.Contact__r.Name + createMemberX(contact.Contact__r.Ocdla_Current_Member_Flag__c)}</li>
            <li class="table-cell attendee-order-date">{contact.Order.EffectiveDate}</li>
            <li class="table-cell attendee-ticket-name">{contact.Product2.Name}</li>
            <li class="table-cell attendee-city">{(contact.Contact__r.MailingCity ?? ' ') + stateFormatter(contact.Contact__r.MailingState)}</li>
        </ul>
    )
};
