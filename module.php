<?php 

use Http\Http as Http;
use File\FileList as FileList;
use File\File as File;
use Salesforce\SalesforceAttachment as SalesforceAttachment;
use Salesforce\OAuthRequest as OAuthRequest;
use Http\HttpRequest as HttpRequest;
use Salesforce\OAuthResponse as OAuthResponse;
use Salesforce\RestApiRequest as RestApiRequest;
use Http\HttpHeader as HttpHeader;
use Salesforce\OAuthConfig;


class EventModule extends Module{
    //private $deps = array("salesforce","authorizeNet");

    public function __construct(){
        parent::__construct();
        $this->routes = eventModRoutes();
        //$this->dependencies = $this->deps;
        $this->name = "event";
    }

    //public function __construct() {
    //    parent::__construct();
    //}

	public function htmlEventFunction() {
		$tpl = new Template("eventHome");
		$tpl->addPath(__DIR__ . "/templates");

		$html = $tpl;

		return $tpl;
    }

    public function htmlEventFullFunction() {
		$tpl = new Template("eventFull");
		$tpl->addPath(__DIR__ . "/templates");

		$html = $tpl;

		return $tpl;
    }

    public function jsonEventFunction() {
        $api = $this->loadForceApi();

		$results = $api->query("SELECT Name, Id, Start_Date__c, Banner_Location_Text__c FROM Event__c ORDER BY Start_Date__c DESC");

		$records = $results->getRecords();
		
		return $records;
    }

    public function jsonContactCountFunction() {
        $api = $this->loadForceApi();

		$results = $api->query("SELECT Product2.Event__c, Product2.Event__r.Name, COUNT(Id) FROM OrderItem WHERE Product2.Event__c != NULL GROUP BY Product2.Event__c, Product2.Event__r.Name");
        $json = [];

        foreach($results->getRecords() as $record) {
            $json[$record["Event__c"]] = $record;
        }

        //var_dump($json);

		//$records = $results->getRecords();
		
		return $json;
    }

	public function htmlEventDetailsFunction($eventId) {
		$tpl = new Template("eventDetails");
		$tpl->addPath(__DIR__ . "/templates");
	
		$html = $tpl -> render(array("event" => $eventId));
	
		return $html;
	}

	public function jsonEventDetailsFunction($eventId) {
        $api = $this->loadForceApi();

		$results = $api->query("SELECT Name, Id, Start_date__c FROM Event__c WHERE Id = '$eventId'");

		$records = $results->getRecords();
		
		return $records[0];
    }

    public function jsonContactListFunction($eventId) {
        $api = $this->loadForceApi();

		$results = $api->query("SELECT Product2.Name, Contact__r.Ocdla_Current_Member_Flag__c, Order.EffectiveDate, Contact__r.Name, Contact__r.MailingState, Contact__r.MailingCity FROM OrderItem WHERE OrderItem.Product2.Event__c = '$eventId'");

		$records = $results->getRecords();
		
		return $records;
    }
}

function eventModRoutes(){
    $eventModRoutes = array(
        "get-chapter-materials" => array(
            "callback" => "getChapterMaterials",
            "files" => array("MaterialWrapper.php")
        ),
        "get-json-materials" => array(
            "callback" => "getJsonMaterials",
            "files" => array("MaterialWrapper.php"),
            "content-type" => "json"
        )
    );
    return $eventModRoutes;
}

function getChapterMaterials($eventName){
    $mw = new MaterialWrapper();
    $chapterMaterials = $mw->getMaterialsFromFileSystem($eventName);
    $mw->writeToFile($eventName,$chapterMaterials);
    //$chapterMaterials = $mw->readFromFile($eventName);

    ?><pre><?php
    print_r($chapterMaterials);
    ?></pre><?php
    exit;
}


function getJsonMaterials($eventName){
    $mw = new MaterialWrapper();
    $chapterMaterials = $mw->readFromFile($eventName);

    return json_decode($chapterMaterials);

}
