$(document).ready(function() {
  
    //$(".choice").css("opacity", "1");

    var winCom = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"], ["a", "d", "g"], ["b", "e", "h"], ["c", "f", "i"], 
    ["a", "e", "i"], ["g", "e", "c"]];
    
    var round = 0;
    var player1 = "";
    var player2 = "";
    var options_pl = [];
    var options_comp = [];
    var moves_pl = [];
    var moves_comp = [];
    var field_pl = "";
    var field_comp = "";
    var new_options = [];
    var win = 0;
    var fields_marked = [];

    $(".content").css("opacity", "1");
    $(".popup").css("opacity", "1");
    $(".popup").css("visibility", "visible");

    $(".cross").click(function(){
        player1 = "X";
        player2 = "O";

        $(".content").css("opacity", "0");
        $(".popup").css("opacity", "0");
        $(".popup").css("visibility", "hidden");

    });

    $(".circle").click(function(){
        player1 = "O";
        player2 = "X";

        $(".content").css("opacity", "0");
        $(".popup").css("opacity", "0");
        $(".popup").css("visibility", "hidden");

    });

    $(".restart").click(function(){
        reset();
    });

    var reset = function(){
        $(".cell").empty();
        $(".cell").css("background-color", "white");

        round = 0;
        player1 = "";
        player2 = "";
        options_pl = [];
        options_comp = [];
        moves_pl = [];
        moves_comp = [];
        field_pl = "";
        field_comp = "";
        new_options = [];
        win = 0;
        fields_marked = [];

        $(".content").css("opacity", "1");
        $(".popup").css("opacity", "1");
        $(".popup").css("visibility", "visible");
        $(".announcement").css("opacity", "0");

    };
    
    $(".cell").click(function(){
        field_pl = $(this).data("field");
        fields_marked = moves_pl.concat(moves_comp);

            if ((fields_marked.indexOf(field_pl) == -1) &&  win == 0 ){
                round += 1;
                    $(this).html(player1);
                    moves_pl.push(field_pl);
                    setTimeout(respond_comp, 100);

                //UPDATE REMAINING OPTIONS FOR COMP
                    if(round >= 2){
                        for(var i = 0; i < options_comp.length; i++){
                            if(options_comp[i].indexOf(field_pl) == -1){
                                new_options.push(options_comp[i]);
                            } 
                        }

                    }
                //CHECK IF SOMEONE WON
                    if(round >= 3){
                        check_win();
                    }
                //CHECK IF IT"S A TIE
                    if(round >= 5){
                        if (win == 0){
                            $("#tie").css("opacity", "1");

                            setTimeout(reset, 2000);

                            $(".restart").css("opacity", "1");
                            $(".restart").css("visibility", "visible");
                        }
                    }
            }
    });

    var check_win = function(){
        //CHECK IF PLAYER 1 WON
        for(var i = 0; i<winCom.length; i++){
            var hits = 0;
            var combination;
            for (var j = 0; j< winCom[i].length; j++){
                if(moves_pl.indexOf(winCom[i][j]) > -1){
                    hits += 1;
                }
            }
            if (hits == 3){

                $("#you").css("opacity", "1");
                $(".restart").css("opacity", "1");
                $(".restart").css("visibility", "visible");
                for(var k = 0; k < winCom[i].length; k++){
                    $("[data-field = "+winCom[i][k]+"]").css("background-color", "#FFFF99");
                }
                win = 1;
                setTimeout(reset, 2000);
            }
        }
        //CHECK IF COMPUTER WON
        for(var i = 0; i<winCom.length; i++){
            var hits = 0;
            for (var j = 0; j<winCom[i].length; j++){
                if(moves_comp.indexOf(winCom[i][j]) > -1){
                    hits += 1;
                }
            }
            if (hits == 3){

                $("#computer").css("opacity", "1");
                $(".restart").css("opacity", "1");
                $(".restart").css("visibility", "visible");
                for(var k = 0; k < winCom[i].length; k++){
                    $("[data-field = "+winCom[i][k]+"]").css("background-color", "#FFFF99");
                }
                win = 1;
                setTimeout(reset, 2000);
            }
        }
    }    
    
    var respond_comp = function(){

        if(round == 1){

                    if (field_pl != "e"){  
                        field_comp = "e";
                    
                    } else {

                        field_comp = "a";
                        var index = Math.floor(Math.random() * 4); 
                        field_comp = ["a", "c", "g", "i"][index];
                    }
                    $("[data-field = "+field_comp+"]").html(player2);
                    $("[data-field = "+field_comp+"]").removeClass("clickable");
                    moves_comp.push(field_comp);
                
                
                for(var i = 0; i < winCom.length; i++){
                    if(winCom[i].indexOf(field_pl) == -1){
                        options_comp.push(winCom[i]);
                    } 
                }

                for(var i = 0; i < winCom.length; i++){
                    if(winCom[i].indexOf(field_comp) == -1){
                        options_pl.push(winCom[i]);
                    }
                }

        } else if(round == 2){
            
//PREPARE: 1. CHECK IF OPPONENT IS ABOUT TO WIN, IF NOT CHECK YOUR OPTIONS FOR ATTACK:

            //update options after last move by pl 1
            options_comp = new_options;
            
            var risk = [];

            //CHECK RISKS: IF PLAYER 1 MARKED 2 FIELDS WHICH LINE UP - THERE IS A RISK!
            //RISK = A WINNING COMBINATION WHICH CONTAINS BOTH MOVES OF PLAYER 1
            for(var i = 0; i<options_pl.length; i++){
                if(options_pl[i].indexOf(field_pl) > -1 && options_pl[i].indexOf(moves_pl[0]) > -1){
                    risk = options_pl[i];
                }
            }

            //CHECK OPTIONS FOR ATTACK
            var choice = []; 
                //CHECK WHICH OF THE AVAILABLE OPTIONS IS GOOD FOR ATTACK
                    for(var i = 0; i <options_comp.length; i++){
                       //WHERE DID YOU ALREADY MARK A FIELD?
                        if (options_comp[i].indexOf(moves_comp[0]) > -1){
                            //PUT ALL REMAINING LETTERS IN THE "CHOICE" ARRAY
                            for(var j = 0; j < options_comp[i].length; j++){
                                if(options_comp[i][j] != moves_comp[0]){
                                    choice.push(options_comp[i][j]);
                                }
                            }
                        }
                    }

//ACT:   
            //1: IF THERE IS A RISK, ELIMINATE IT.
            if (risk.length > 0){

                    //FIND THE REMAINING MOVE IN THE RISKY COMBINATION

                    for(var j=0; j < risk.length; j++){
                        if(moves_pl.indexOf(risk[j]) == -1){
                            //OCCUPY THAT FIELD
                            field_comp = risk[j];

                        }
                    }
            //2: IF NO IMMEDIATE RISK, CHECK POTENTIAL RISK AND THEN ATTACK.
            } else {
                //AVOID POTENTIAL RISK
                if (moves_pl.indexOf("b") > -1 && moves_pl.indexOf("d") > -1){
                    field_comp = "a";
                }else if(moves_pl.indexOf("b") > -1 && moves_pl.indexOf("f") > -1){
                    field_comp = "c";
                } else if(moves_pl.indexOf("f") > -1 && moves_pl.indexOf("h") > -1){
                    field_comp = "i";
                } else if(moves_pl.indexOf("d") > -1 && moves_pl.indexOf("h") > -1){
                    field_comp = "g";
                } else if(moves_pl.indexOf("c") > -1 && moves_pl.indexOf("g") > -1){
                    field_comp = "b";
                } else if(moves_pl.indexOf("a") > -1 && moves_pl.indexOf("i") > -1){
                    field_comp = "h";
                } else if(moves_pl.indexOf("a") > -1 && moves_pl.indexOf("e") > -1 && moves_comp[0] == "i"){
                    field_comp = "c";
                } else if(moves_pl.indexOf("g") > -1 && moves_pl.indexOf("e") > -1 && moves_comp[0] == "c"){
                    field_comp = "a";
                } else if(moves_pl.indexOf("c") > -1 && moves_pl.indexOf("e") > -1 && moves_comp[0] == "g"){
                    field_comp = "i";
                } else if(moves_pl.indexOf("e") > -1 && moves_pl.indexOf("i") > -1 && moves_comp[0] == "a"){
                    field_comp = "c";
                }else{   
                //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                    var random = Math.floor(Math.random() * choice.length); 
                    field_comp = choice[random];
                }      
            }

    //MAKE YOUR MOVE
            $("[data-field = "+field_comp+"]").html(player2);
            //UPDATE YOUR LIST OF MOVES
            moves_comp.push(field_comp);

        // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
            new_options = [];
        //END OF ROUND 2    
        } else if(round == 3) {

            //update options after last move by pl 1
            options_comp = new_options;

            //UPDATE THE OPTIONS REMAINING FOR PLAYER 1

            for(var i = 0; i < options_pl.length; i++){
                //REMOVE ALL OPTIONS THAT INCLUDE THE FIELD JUST CHOSEN BY COMP
                if(options_pl[i].indexOf(field_comp) > -1){
                    options_pl.splice(i, 1);
                } 
            }

//PREPARE: 1. CHECK IF YOU CAN WIN IN THIS MOVE, CHECK IF OPPONENT IS ABOUT TO WIN, IF NOT CHECK YOUR OPTIONS FOR ATTACK:
            
            //CHECK IF YOU CAN WIN IN THIS ROUND
            
            var opportunity = [];
            for(var i = 0; i<options_comp.length ; i++){
                if(options_comp[i].indexOf(field_comp) > -1 && options_comp[i].indexOf(moves_comp[0]) > -1){
                    opportunity = options_comp[i];
                }
            }
      
            //CHECK RISKS: IF PLAYER 1 MARKED 2 FIELDS WHICH LINE UP - THERE IS A RISK!
            //FOCUS ON OPTION WHICH INCLUDES THE FIELD JUST CLICKED BY PLAYER 1
            //RISK = A WINNING COMBINATION WHICH ALREADY CONTAINS 2 MOVES OF PLAYER 1
                       
            var risk = [];
            for(var i = 0; i<options_pl.length; i++){
                if ((options_pl[i].indexOf(field_pl) > -1) && ((options_pl[i].indexOf(moves_pl[1]) > -1 || options_pl[i].indexOf(moves_pl[0]) > -1))){
                    risk = options_pl[i];
                }
                
            }

//ACT: 1: IF THERE IS OPPORTUNITY, WIN. 2: IF THERE IS RISK, ELIMINATE IT. 3: IF NO OPPORTUNITY TO WIN OR RISK, ATTACK.

            if(opportunity.length > 0){

                //FIND THE REMAINING MOVE IN THE OPPORTUNITY COMBINATION

                for(var j=0; j < opportunity.length; j++){
                    if(moves_comp.indexOf(opportunity[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = opportunity[j];
                        $("[data-field = "+field_comp+"]").html(player2);
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                    }
                }


            } else if(risk.length > 0){

                //FIND THE REMAINING MOVE IN THE RISKY COMBINATION

                for(var j=0; j < risk.length; j++){
                    if(moves_pl.indexOf(risk[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = risk[j];
                        $("[data-field = "+field_comp+"]").html(player2);
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                    }
                }

            }else{
                            var choice = []; 
                        //CHECK WHICH OF THE AVAILABLE OPTIONS IS GOOD FOR ATTACK - options not blocked by player 1
                            for(var i = 0; i <options_comp.length; i++){
                               //WHERE DID YOU ALREADY MARK A FIELD in a previous round?
                               //if an option already contains one or both of your previous moves: 
                               if (options_comp[i].indexOf(moves_comp[0]) > -1) {
                                   for (var j = 0; j < options_comp[i].length; j++){
                                       if (moves_comp.indexOf(options_comp[i][j]) == -1 && moves_pl.indexOf(options_comp[i][j]) == -1){
                                           choice.push(options_comp[i][j]);
                                       }
                                   }

                               } else if (options_comp[i].indexOf(moves_comp[1]) > -1){
                                for (var j = 0; j < options_comp[i].length; j++){
                                    
                                    if (moves_comp.indexOf(options_comp[i][j]) == -1 && moves_pl.indexOf(options_comp[i][j]) == -1){
                                        choice.push(options_comp[i][j]);
                                    }
                                }

                                }
                            }
                        
                        //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                        var random = Math.floor(Math.random() * choice.length); 
                        field_comp = choice[random];
                        console.log("random choice made (field_comp marked) in round 3:");
                        console.log(field_comp);

                
                //OCCUPY THAT FIELD
                $("[data-field = "+field_comp+"]").html(player2);
                moves_comp.push(field_comp); 

            }

            // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
            new_options = [];
            check_win();


        } else if (round == 4){

            //UPDATE THE OPTIONS REMAINING FOR PLAYER 1

            for(var i = options_pl.length - 1; i >= 0; i--){

                //REMOVE ALL OPTIONS THAT INCLUDE THE FIELD JUST CHOSEN BY COMP

                if((options_pl[i].indexOf(field_comp) > -1) || (options_pl[i].indexOf(moves_comp[0]) > -1) || (options_pl[i].indexOf(moves_comp[1]) > -1)){

                    options_pl.splice(i, 1);
                } 
            }

            //update options after last move by pl 1
            options_comp = new_options;
//PREPARE: 1. CHECK IF YOU CAN WIN IN THIS MOVE, CHECK IF OPPONENT IS ABOUT TO WIN, IF NOT CHECK YOUR OPTIONS FOR ATTACK:
            
            //CHECK IF YOU CAN WIN IN THIS ROUND
            
            var opportunity = [];
            for(var i = 0; i<options_comp.length ; i++){
                if((options_comp[i].indexOf(field_comp) > -1) && (options_comp[i].indexOf(moves_comp[1]) > -1 || options_comp[i].indexOf(moves_comp[0]) > -1)){
                    opportunity = options_comp[i];
                }
            }

            //CHECK RISKS: IF PLAYER 1 MARKED 2 FIELDS WHICH LINE UP - THERE IS A RISK!
            //FOCUS ON OPTION WHICH INCLUDES THE FIELD JUST CLICKED BY PLAYER 1
            //RISK = A WINNING COMBINATION WHICH ALREADY CONTAINS 2 MOVES OF PLAYER 1
            var risk = [];
            for(var i = 0; i<options_pl.length; i++){
                if ((options_pl[i].indexOf(field_pl) > -1) && (options_pl[i].indexOf(moves_pl[2]) > -1 || options_pl[i].indexOf(moves_pl[1]) > -1 || options_pl[i].indexOf(moves_pl[0]) > -1)){
                    risk = options_pl[i];
                }  
            }
        


//ACT: 1: IF THERE IS OPPORTUNITY, WIN. 2: IF THERE IS RISK, ELIMINATE IT. 3: IF NO OPPORTUNITY TO WIN OR RISK, ATTACK.
            
            if(opportunity.length > 0){
            
                //FIND THE REMAINING MOVE IN THE OPPORTUNITY COMBINATION
            
                for(var j=0; j < opportunity.length; j++){
                    if(moves_comp.indexOf(opportunity[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = opportunity[j];
                        $("[data-field = "+field_comp+"]").html(player2);
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                        check_win();
                    }
                }
            
            
            } else if(risk.length > 0){
                //FIND THE REMAINING MOVE IN THE RISKY COMBINATION

                for(var j=0; j < risk.length; j++){
                    if(moves_pl.indexOf(risk[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = risk[j];
                        $("[data-field = "+field_comp+"]").html(player2);
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                        check_win();
                    }
                }
            } else {
                //CHECK WHICH FIELDS ARE STILL AVAILABLE

                        var fields_marked = moves_pl.concat(moves_comp);
                        var fields_available = [];
                        var all_fields = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

                        for(var i = 0; i < all_fields.length; i++){
                            if(fields_marked.indexOf(all_fields[i]) == -1){
                                fields_available.push(all_fields[i]);
                            }
                        }


                        //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                        var random = Math.floor(Math.random() * fields_available.length); 
                        field_comp = fields_available[random];

                        //OCCUPY THAT FIELD
                        $("[data-field = "+field_comp+"]").html(player2);
                        moves_comp.push(field_comp); 
                        check_win();
            }
    
        }
        
    }

});



