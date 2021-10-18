/** @jsx vNode */

/**

This is our list of components to be used in the app.

**/
export { EventListFull, EventFull, EventList, EventSearch };
import { vNode } from '/modules/events/node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '/modules/events/node_modules/@ocdladefense/view/cache.js';
import { cityFormatter, stateFormatter, createMemberX } from '/modules/events/assets/js/lib/contactFieldFormat.js';

var EventListFull = function EventListFull(props) {
  return vNode("div", null, vNode(EventSearch, {
    searchBar: props.searchBar,
    datesChecked: props.datesChecked,
    contactsChecked: props.contactsChecked
  }), vNode(EventList, {
    events: props.events
  }));
};

var EventSearch = function EventSearch(props) {
  var searchBar = props.searchBar;
  var datesChecked = props.datesChecked;
  var contactsChecked = props.contactsChecked;
  return vNode("div", {
    "class": "flex-parent event-list",
    id: "searchArea"
  }, vNode("h1", null, "Upcoming OCDLA Seminars"), vNode("br", null), vNode("h3", null, "Search for Events"), vNode("input", {
    type: "text",
    id: "searchBar",
    placeholder: "Enter name or location",
    style: "float:left;",
    value: searchBar
  }), vNode("input", {
    type: "button",
    id: "submitSearch",
    "data-action": "search",
    value: "search"
  }), vNode("br", null), vNode("p", {
    style: "float:left;"
  }, "Dates from Oldest to Newest: "), vNode("input", {
    type: "checkbox",
    id: "dateCheckBox",
    checked: datesChecked ? true : null
  }), vNode("br", null), vNode("p", {
    style: "float:left;"
  }, "Number of Attendees from Highest to Lowest: "), vNode("input", {
    type: "checkbox",
    id: "contactsChecked",
    checked: contactsChecked ? true : null
  }), vNode("br", null));
};

var EventList = function EventList(props) {
  var events = props.events;
  var list = [];

  for (var i = 0; i < events.length; i++) {
    list.push(vNode(EventListItem, {
      event: events[i]
    }));
  }

  return vNode("div", {
    "class": "flex-parent event-list",
    id: "contactList3"
  }, list);
};

var EventListItem = function EventListItem(props) {
  var Count = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
  return vNode("div", {
    "class": "event-list-item"
  }, vNode("h3", null, vNode("a", {
    "class": "eventButton eventButton2",
    href: "#" + props.event.Id,
    "data-action": "details",
    "data-event-id": props.event.Id
  }, props.event.Name)), vNode("p", null, props.event.Banner_Location_Text__c), vNode("p", null, props.event.Start_Date__c), vNode("p", null, "Attendees: ", CACHE.get("eventsContactCount")[props.event.Id] ? Count : "None"));
};

var EventFull = function EventFull(props) {
  return vNode("div", null, vNode(EventDetails, {
    event: props.event
  }), vNode(ContactList, {
    contacts: props.contacts
  }));
};

var EventDetails = function EventDetails(props) {
  var event = props.event;
  return vNode("div", null, vNode("h1", {
    "class": "marginMaker2"
  }, event.Name), vNode("h3", {
    "class": "marginMaker"
  }, event.Start_Date__c), vNode("a", {
    href: "https://ocdla.force.com/OcdlaEvent?id=" + event.Id,
    target: "_blank",
    "class": "marginMaker"
  }, "Link to the event page in more detail."));
};

var ContactList = function ContactList(props) {
  var contacts = props.contacts;
  var attendees = [];

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].Contact__r != null) {
      attendees.push(vNode(Attendee, {
        contact: contacts[i]
      }));
    }
  }

  return vNode("div", {
    "class": "flex-parent contact-list",
    id: "contactList3"
  }, vNode("br", null), vNode("h3", null, "List of Attendees"), vNode("p", null, "An X by the name indicates membership."), vNode("ul", {
    "class": "table-row should-be-invisible table-headers"
  }, vNode("li", {
    "class": "table-cell"
  }, "Name"), vNode("li", {
    "class": "table-cell"
  }, "Order Date"), vNode("li", {
    "class": "table-cell"
  }, "Ticket Type"), vNode("li", {
    "class": "table-cell"
  }, "Location")), attendees);
};

var Attendee = function Attendee(props) {
  var _contact$Contact__r$M;

  var contact = props.contact;
  return vNode("ul", {
    "class": "table-row"
  }, vNode("li", {
    "class": "table-cell attendee-name"
  }, contact.Contact__r.Name + createMemberX(contact.Contact__r.Ocdla_Current_Member_Flag__c)), vNode("li", {
    "class": "table-cell attendee-order-date"
  }, contact.Order.EffectiveDate), vNode("li", {
    "class": "table-cell attendee-ticket-name"
  }, contact.Product2.Name), vNode("li", {
    "class": "table-cell attendee-city"
  }, ((_contact$Contact__r$M = contact.Contact__r.MailingCity) !== null && _contact$Contact__r$M !== void 0 ? _contact$Contact__r$M : ' ') + stateFormatter(contact.Contact__r.MailingState)));
};