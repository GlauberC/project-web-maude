<?php 

    // Receive parameter
    $parameter = $_GET["param"];
    $type = $_GET["type"];

    // Command Maude
    $DIR_MAUDE = exec('which maude');
    $DIR_FILE_MAUDE = "../../maude-system/process.maude";
    $MODF = "-no-banner";

    //Function metaRed
    if($type == 'metaRed'){
        $parameter = escapeshellarg($parameter);
        $result =  shell_exec("timeout 30 sh -c \"echo red metaRed\($parameter\) . | $DIR_MAUDE $DIR_FILE_MAUDE $MODF 2>&1 \"");

    // Function MetaApply
    }else if($type == 'metaApp'){
        $input =  explode("///", $parameter);
        if(preg_match('/then.+/i', $input[1])){
            $ask = '';
            $then = '';
            preg_match('/then.+/i', $input[1], $then);
            $then = str_replace('then', '', $then[0]);
            preg_match('/ask \'\w+\s*/i', $input[1], $ask);
            preg_match("/\'\w+/i", $ask[0], $ask);
            $ask = $ask[0];

            $subs = "('C:Constraint <- upTerm($ask) ; ('P:Process <- upTerm($then))";
            $command = "($input[0]), 'askthen, $subs )";
            $command = escapeshellarg($command);
            $result =  shell_exec("timeout 30 sh -c \"echo red metaApp\($command \) . | $DIR_MAUDE $DIR_FILE_MAUDE $MODF 2>&1 \"");
        }else{
            $tell = '';
            preg_match("/\'\w+/i", $input[1], $tell);
            $tell = $tell[0];

            $subs = "( 'C:Constraint  <- upTerm($tell )";
            $command = "($input[0]), 'tell, $subs )";
            $command = escapeshellarg($command);
            $result =  shell_exec("timeout 30 sh -c \"echo red metaApp\($command \) . | $DIR_MAUDE $DIR_FILE_MAUDE $MODF 2>&1 \"");
        }
    }
    

    // Export Result
    echo $result;
?>