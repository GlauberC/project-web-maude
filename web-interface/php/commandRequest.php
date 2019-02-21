<?php 

    $command = $_GET["commandInput"];
    $command = escapeshellarg($command);
    echo $command;
    
    
    $DIR_MAUDE = exec('which maude');
    $DIR_FILE_MAUDE = "../../maude-system/process.maude";
    $MODF = "-no-banner";
    $result =  shell_exec("timeout 30 sh -c \"echo $command . | $DIR_MAUDE $DIR_FILE_MAUDE $MODF 2>&1 \"");
    echo $result;
?>