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
        console.log("check after each click");
        console.log(round);
        console.log("all fields marked:");
        console.log(fields_marked);

            if ((fields_marked.indexOf(field_pl) == -1) &&  win == 0 ){
                round += 1;
                    $(this).html(player1);
                    moves_pl.push(field_pl);
                    setTimeout(respond_comp, 100);

                    console.log("moves_pl and moves_comp:");
                    console.log(moves_pl);
                    console.log(moves_comp);

                //UPDATE REMAINING OPTIONS FOR COMP
                    if(round >= 2){

                        console.log("line 96 updating options for comp");
                        console.log("round:");
                        console.log(round);

                        for(var i = 0; i < options_comp.length; i++){
                            if(options_comp[i].indexOf(field_pl) == -1){
                                new_options.push(options_comp[i]);
                                console.log("iteration of the loop getting options for comp:");
                                console.log(options_comp[i]);
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
                            console.log("IT'S A TIE!");
                            $("#tie").css("opacity", "1");
                            console.log("all 4 moves made by computer until round 4")
                            console.log(moves_comp);
                            setTimeout(reset, 2000);

                            $(".restart").css("opacity", "1");
                            $(".restart").css("visibility", "visible");
                        }
                    }

            }
                    

    });

    var check_win = function(){
        //CHECK IF PLAYER 1 WON
        console.log("CHECKING!");
        console.log(round);
        for(var i = 0; i<winCom.length; i++){
            var hits = 0;
            var combination;
            for (var j = 0; j< winCom[i].length; j++){
                if(moves_pl.indexOf(winCom[i][j]) > -1){
                    hits += 1;
                }
            }
            if (hits == 3){
                console.log("YOU WON!");
                $("#you").css("opacity", "1");
                $(".restart").css("opacity", "1");
                $(".restart").css("visibility", "visible");
                console.log("all moves made by computer")
                console.log(moves_comp);
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
                console.log("COMPUTER WON!");
                console.log("all moves made by computer")
                console.log(moves_comp);
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

        console.log("Done CHECKING!");


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
                        console.log("adding winCom to options_comp in loop of round 1:");
                        console.log(winCom[i]);
                        console.log(field_pl);
                        options_comp.push(winCom[i]);
                    } 
                }

                for(var i = 0; i < winCom.length; i++){
                    if(winCom[i].indexOf(field_comp) == -1){
                        console.log("adding winCom to options_pl in loop of round 1:");
                        console.log(winCom[i]);
                        console.log(field_pl);
                        options_pl.push(winCom[i]);
                    }
                }

                console.log("options_pl and options_comp after 1st round:");
                console.log(options_pl);
                console.log(options_comp);
            
        } else if(round == 2){
            
//PREPARE: 1. CHECK IF OPPONENT IS ABOUT TO WIN, IF NOT CHECK YOUR OPTIONS FOR ATTACK:

            //update options after last move by pl 1
            options_comp = new_options;
            console.log("update options after last move by pl 1:");
            console.log(options_pl);
            
            var risk = [];

            //CHECK RISKS: IF PLAYER 1 MARKED 2 FIELDS WHICH LINE UP - THERE IS A RISK!
            //RISK = A WINNING COMBINATION WHICH CONTAINS BOTH MOVES OF PLAYER 1
            for(var i = 0; i<options_pl.length; i++){
                if(options_pl[i].indexOf(field_pl) > -1 && options_pl[i].indexOf(moves_pl[0]) > -1){
                    risk = options_pl[i];
                }
            }

            console.log("risk:");
            console.log(risk);
            console.log("chosen from these options:");
            console.log(options_pl);
            
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

            console.log("choice length:");
            console.log(choice);
        

//ACT:   
            //1: IF THERE IS A RISK, ELIMINATE IT.
            if (risk.length > 0){

                    //FIND THE REMAINING MOVE IN THE RISKY COMBINATION

                    for(var j=0; j < risk.length; j++){
                        if(moves_pl.indexOf(risk[j]) == -1){
                            //OCCUPY THAT FIELD
                            field_comp = risk[j];

                            console.log("move made to avoid risk:");
                            console.log(field_comp);
                            console.log("risk avoided:");
                            console.log(risk);

                        }
                    }
            //2: IF NO IMMEDIATE RISK, CHECK POTENTIAL RISK AND THEN ATTACK.
            } else {
                console.log("reacting to potential risk");
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
                    console.log(choice.length);
                    console.log("choice[random] = "+ choice[random]);
                }
                
            }

    //MAKE YOUR MOVE
            $("[data-field = "+field_comp+"]").html(player2);
            //UPDATE YOUR LIST OF MOVES
            moves_comp.push(field_comp);
            console.log("move made by comp in round 2");
            console.log(field_comp);
            console.log("all 2 moves made by computer until round 2")
            console.log(moves_comp);


            


        // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
        new_options = [];
        console.log("finished round 2");
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
            console.log("I'm in round 3 but I'm updating options_pl after 2 round:");
            console.log("options_pl after 2 round:");
            console.log(options_pl);

//PREPARE: 1. CHECK IF YOU CAN WIN IN THIS MOVE, CHECK IF OPPONENT IS ABOUT TO WIN, IF NOT CHECK YOUR OPTIONS FOR ATTACK:
            
            //CHECK IF YOU CAN WIN IN THIS ROUND
            
            var opportunity = [];
            for(var i = 0; i<options_comp.length ; i++){
                if(options_comp[i].indexOf(field_comp) > -1 && options_comp[i].indexOf(moves_comp[0]) > -1){
                    opportunity = options_comp[i];
                }
            }

            console.log("comp_opportunity in round 3:");
            console.log(opportunity);
      
            //CHECK RISKS: IF PLAYER 1 MARKED 2 FIELDS WHICH LINE UP - THERE IS A RISK!
            //FOCUS ON OPTION WHICH INCLUDES THE FIELD JUST CLICKED BY PLAYER 1
            //RISK = A WINNING COMBINATION WHICH ALREADY CONTAINS 2 MOVES OF PLAYER 1
            
            
            
            
            var risk = [];
            for(var i = 0; i<options_pl.length; i++){
                if ((options_pl[i].indexOf(field_pl) > -1) && ((options_pl[i].indexOf(moves_pl[1]) > -1 || options_pl[i].indexOf(moves_pl[0]) > -1))){
                    risk = options_pl[i];
                }
                
            }
            console.log("risk in round 3:");
            console.log(risk);


//ACT: 1: IF THERE IS OPPORTUNITY, WIN. 2: IF THERE IS RISK, ELIMINATE IT. 3: IF NO OPPORTUNITY TO WIN OR RISK, ATTACK.

            if(opportunity.length > 0){

                //FIND THE REMAINING MOVE IN THE OPPORTUNITY COMBINATION

                for(var j=0; j < opportunity.length; j++){
                    if(moves_comp.indexOf(opportunity[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = opportunity[j];
                        console.log("used opportunity (field_comp marked) in round 3:");
                        console.log(field_comp);
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
                        console.log("avoided risk (field_comp marked) in round 3:");
                        console.log(field_comp);
                        $("[data-field = "+field_comp+"]").html(player2);
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                    }
                }

            }else{
                console.log("Preparing to make a random move");
                            var choice = []; 
                            console.log("these are the options_comp in round 3:");
                            console.log(options_comp);
                        //CHECK WHICH OF THE AVAILABLE OPTIONS IS GOOD FOR ATTACK - options not blocked by player 1
                            for(var i = 0; i <options_comp.length; i++){
                               //WHERE DID YOU ALREADY MARK A FIELD in a previous round?
                               console.log("going through option:");
                               console.log(options_comp[i]);
                               //if an option already contains one or both of your previous moves: 
                               if (options_comp[i].indexOf(moves_comp[0]) > -1) {
                                console.log("fitting option is:");
                                console.log(options_comp[i]);
                                   for (var j = 0; j < options_comp[i].length; j++){
                                       if (moves_comp.indexOf(options_comp[i][j]) == -1 && moves_pl.indexOf(options_comp[i][j]) == -1){
                                           choice.push(options_comp[i][j]);
                                       }
                                   }

                               } else if (options_comp[i].indexOf(moves_comp[1]) > -1){
                                console.log("fitting option is:");
                                console.log(options_comp[i]);
                                for (var j = 0; j < options_comp[i].length; j++){
                                    
                                    if (moves_comp.indexOf(options_comp[i][j]) == -1 && moves_pl.indexOf(options_comp[i][j]) == -1){
                                        choice.push(options_comp[i][j]);
                                    }
                                }
                                    //var index = options_comp[i].indexOf(moves_comp[0]);
                                    
                                    //REMOVE THE MARKED FIELD FROM AVAILABLE OPTION
                                    //options_comp[i].splice(index, 1);
                                    //INCLUDE THE REST OF FIELDS IN LIST OF POTENTIAL MOVES
                                    //choice.push(options_comp[i][0]);
                                }
                            }
                        
                        console.log("choice length:");
                        console.log(choice);
                        
                        //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                        var random = Math.floor(Math.random() * choice.length); 
                        field_comp = choice[random];
                        console.log("random choice made (field_comp marked) in round 3:");
                        console.log(field_comp);

                
                //OCCUPY THAT FIELD
                $("[data-field = "+field_comp+"]").html(player2);
                moves_comp.push(field_comp); 

                console.log("move made randomly by comp in round 3");
                console.log(field_comp);
                console.log("all 3 moves made by computer until round 3")
                console.log(moves_comp);
            }

            // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
            new_options = [];
            check_win();

            console.log("completed round 3");

        } else if (round == 4){
            console.log("started round 4");
            

            //UPDATE THE OPTIONS REMAINING FOR PLAYER 1

            for(var i = options_pl.length - 1; i >= 0; i--){

                //REMOVE ALL OPTIONS THAT INCLUDE THE FIELD JUST CHOSEN BY COMP
                console.log("checking options_pl[i]:");
                console.log(options_pl[i]);
                console.log("checking if includes field_comp:");
                console.log(field_comp);
                if((options_pl[i].indexOf(field_comp) > -1) || (options_pl[i].indexOf(moves_comp[0]) > -1) || (options_pl[i].indexOf(moves_comp[1]) > -1)){
                    console.log("before splicing:");
                    console.log(options_pl);
                    options_pl.splice(i, 1);
                    console.log("after splicing:");
                    console.log(options_pl);

                } 
            }
            console.log("I'm in round 4 but I'm updating options_pl after 3rd round:");
            console.log("options_pl after 3 round:");
            console.log(options_pl);


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
            console.log(new_options);
            console.log(field_comp +", "+moves_comp[0] +", "+moves_comp[1]);


            console.log("comp_opportunity in round 4:");
            console.log(opportunity);

            //CHECK RISKS: IF PLAYER 1 MARKED 2 FIELDS WHICH LINE UP - THERE IS A RISK!
            //FOCUS ON OPTION WHICH INCLUDES THE FIELD JUST CLICKED BY PLAYER 1
            //RISK = A WINNING COMBINATION WHICH ALREADY CONTAINS 2 MOVES OF PLAYER 1
            var risk = [];
            for(var i = 0; i<options_pl.length; i++){
                if ((options_pl[i].indexOf(field_pl) > -1) && (options_pl[i].indexOf(moves_pl[2]) > -1 || options_pl[i].indexOf(moves_pl[1]) > -1 || options_pl[i].indexOf(moves_pl[0]) > -1)){
                    risk = options_pl[i];
                }  
            }
            console.log("risk:");
            console.log(risk);
            console.log(options_pl);
        


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
                        console.log("Reacting to an opportunity and choosing:");
                        console.log(field_comp);
                        console.log("opportunity:");
                        console.log(risk);
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
                        console.log("Reacting to risk and choosing:");
                        console.log(field_comp);
                        console.log("risk avoided:");
                        console.log(risk);
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
                    
                        console.log("fields available until round 4:");
                        console.log(fields_available);
                    
                        console.log("fields marked until round 4:");
                        console.log(fields_marked);
                    
                        console.log("choice made (field_comp marked) in round 3:");
                        console.log(field_comp);

                        //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                        var random = Math.floor(Math.random() * fields_available.length); 
                        field_comp = fields_available[random];
                        console.log(field_comp);

                        //OCCUPY THAT FIELD
                        $("[data-field = "+field_comp+"]").html(player2);
                        moves_comp.push(field_comp); 
                        console.log("move made randomly by comp in round 4:)");
                        console.log(field_comp);
                        check_win();
            }
    
        }
        
    }

});



