<?php
class MaterialWrapper{

    public function __construct(){
        
        // $fs = $application->getFileSystemService();
        // $fs = $application->getService("fileSystem");
        createRequiredDirectories();
    }


    public function getMaterialsFromFileSystem($eventName){
        $url = "/content/uploads/chapter-material-files/".$eventName;
        $pathToChapterDirectories = getPathToContent()."/uploads/chapter-material-files/".$eventName;
        $chapterDirectories = filterScanResults(scandir($pathToChapterDirectories));
        $chapters = array();
        $materials = array();
        $eventData = array();
        
    
        for($i = 0; $i < count($chapterDirectories); $i++){
            $chapters[$i] = array("name" => $chapterDirectories[$i]);
            $files = filterScanResults(scandir($pathToChapterDirectories."/".$chapterDirectories[$i]));

            for($j = 0; $j < count($files); $j++){
                $fileParts = explode(".", $files[$j]);
                $chapters[$i]["materials"][$j]["name"] = $files[$j];
                $chapters[$i]["materials"][$j]["filetype"] = $fileParts[count($fileParts)-1];
                $chapters[$i]["materials"][$j]["filesize"] = renderFileSizeString($pathToChapterDirectories."/".$chapterDirectories[$i]."/".$files[$j]);
                $chapters[$i]["materials"][$j]["link"] = $url."/".$chapterDirectories[$i]."/".$files[$j];
            }
        }
        $eventData = array("chapters" => $chapters);
        return $eventData;
    }
    public function getMaterialsFromSalesforce(){
        return "get 'em from salesforce!";

    }
    public function writeToFile($eventName, $chaptersArray){
        $jsonChapters = json_encode($chaptersArray);
        file_put_contents(getPathToContent()."/json/json-chapter-materials/".$eventName.".json",$jsonChapters);
    }
    public function readFromFile($fileName){
        $materials = file_get_contents(getPathToContent()."/json/json-chapter-materials/".$fileName.".json");
        return $materials;
    }
}
//Helper Functions

function renderFileSizeString($path){
    $fileSize = fileSize($path);

    if($fileSize < 1000000){
        $fileSizeString = round($fileSize/1000)." kb";
    }
    else{
        $fileSizeString = round($fileSize/1000000)." mb";
    }
    return $fileSizeString;
}
function createRequiredDirectories(){
    $dirs = scandir(getPathToContent());
    if(!in_array("uploads",$dirs)){
        mkdir(getPathToContent()."/uploads");
    }
    $dirs = scandir(getPathToContent());
    if(!in_array("json",$dirs)){
        mkdir(getPathToContent()."/json");
    }
    $dirs = scandir(getPathToContent()."/uploads");
    if(!in_array("chapter-material-files",$dirs)){
        mkdir(getPathToContent()."/uploads/chapter-material-files");
    }
    $dirs = scandir(getPathToContent()."/json");
    if(!in_array("json-chapter-materials",$dirs)){
        mkdir(getPathToContent()."/json/json-chapter-materials");
    }
}