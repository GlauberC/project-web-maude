<?php 

    // Receive parameter
    $parameter = $_GET["param"];

    // Fix Parameter
    $parameter = escapeshellarg($parameter);

    // Command Maude
    $DIR_MAUDE = exec('which maude');
    $DIR_FILE_MAUDE = "../../maude-system/process.maude";
    $MODF = "-no-banner";
    $result =  shell_exec("timeout 30 sh -c \"echo red metaREW\($parameter\) . | $DIR_MAUDE $DIR_FILE_MAUDE $MODF 2>&1 \"");

    // Export Result
    echo $result;
?>