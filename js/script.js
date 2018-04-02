$(document).ready(function() {
  
    //$(".choice").css("opacity", "1");

    var winCom = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"], ["a", "d", "g"], ["b", "e", "h"], ["c", "f", "i"], 
    ["a", "e", "i"], ["g", "e", "c"]];
    
    var round = 0;
    
    var options_pl = [];
    var options_comp = [];
    var moves_pl = [];
    var moves_comp = [];
    var field_pl = "";
    var field_comp = "";
    var new_options = [];
    var win = 0;
    

    
    $(".clickable").click(function(){
        round += 1;
        $(this).html("O");
        $(this).removeClass("clickable");
        field_pl = $(this).data("field");
        setTimeout(respond_comp, 150);
        moves_pl.push(field_pl);
        
        console.log("moves_pl and moves_comp:");
        console.log(moves_pl);
        console.log(moves_comp);

//UPDATE REMAINING OPTIONS FOR COMP
        if(round >= 2){
            
            for(var i = 0; i < options_comp.length; i++){
                if(options_comp[i].indexOf(field_pl) == -1){
                    console.log(options_comp[i]);
                    new_options.push(options_comp[i]);
                } 
            }
            
            //console.log("options_comp in round "+round+":");
            //console.log(new_options);
            //console.log("should not contain:");
            //console.log(field_pl);
        }

        if(round >= 3){
            check_win();
        }

        if(round >= 5){
            if (win == 0){
                console.log("IT'S A TIE!");
                $("#tie").css("opacity", "1");
            }
        }

    });

    var check_win = function(){
        //CHECK IF PLAYER 1 WON
        console.log("CHECKING!");
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
                for(var k = 0; k < winCom[i].length; k++){
                    $("[data-field = "+winCom[i][k]+"]").css("background-color", "#FFFF99");
                }
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
                $("#computer").css("opacity", "1");
                for(var k = 0; k < winCom[i].length; k++){
                    $("[data-field = "+winCom[i][k]+"]").css("background-color", "#FFFF99");
                }
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
                    $("[data-field = "+field_comp+"]").html("X");
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
                
            console.log("options_comp in round 1:");
            console.log(options_comp);
            
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

            console.log("risk:");
            console.log(risk);
            
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
                    var ind = Math.floor(Math.random() * 4); 
                    field_comp = ["b", "d", "h", "f"][ind];
                } else if(moves_pl.indexOf("a") > -1 && moves_pl.indexOf("i") > -1){
                    var ind = Math.floor(Math.random() * 4); 
                    field_comp = ["b", "d", "h", "f"][ind];
                }
                else{   
                //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                    var random = Math.floor(Math.random() * choice.length); 
                    field_comp = choice[random];
                }
                
            }

    //MAKE YOUR MOVE
            $("[data-field = "+field_comp+"]").html("X");
            //UPDATE YOUR LIST OF MOVES
            moves_comp.push(field_comp);
            console.log(field_comp);


            //UPDATE THE OPTIONS REMAINING FOR PLAYER 1

            for(var i = 0; i < options_pl.length; i++){
                //REMOVE ALL OPTIONS THAT INCLUDE THE FIELD JUST CHOSEN BY COMP
                if(options_pl[i].indexOf(field_comp) > -1){
                    options_pl.splice(i, 1);
                } 
            }
            console.log("options_pl after 2 round:");
            console.log(options_pl);


        // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
        new_options = [];
        //END OF ROUND 2    
        } else if(round == 3) {

            //update options after last move by pl 1
            options_comp = new_options;

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
            console.log("risk:");
            console.log(risk);


//ACT: 1: IF THERE IS OPPORTUNITY, WIN. 2: IF THERE IS RISK, ELIMINATE IT. 3: IF NO OPPORTUNITY TO WIN OR RISK, ATTACK.

            if(opportunity.length > 0){

                //FIND THE REMAINING MOVE IN THE OPPORTUNITY COMBINATION

                for(var j=0; j < opportunity.length; j++){
                    if(moves_comp.indexOf(opportunity[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = opportunity[j];
                        $("[data-field = "+field_comp+"]").html("X");
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
                        $("[data-field = "+field_comp+"]").html("X");
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                    }
                }

            }else{

                            var choice = []; 
                        //CHECK WHICH OF THE AVAILABLE OPTIONS IS GOOD FOR ATTACK
                            for(var i = 0; i <options_comp.length; i++){
                               //WHERE DID YOU ALREADY MARK A FIELD?
                                if ((options_comp[i].indexOf(moves_comp[0]) > -1) || (options_comp[i].indexOf(moves_comp[1]) > -1)){
                                    var index = options_comp[i].indexOf(moves_comp[0]);
                                    //REMOVE THE MARKED FIELD FROM AVAILABLE OPTION
                                    options_comp[i].splice(index, 1);
                                    //INCLUDE THE REST OF FIELDS IN LIST OF POTENTIAL MOVES
                                    choice.push(options_comp[i][0]);
                                }
                            }
                        
                        console.log("choice length:");
                        console.log(choice);
                        
                        //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                        var random = Math.floor(Math.random() * choice.length); 
                        field_comp = choice[random];

                
                //OCCUPY THAT FIELD
                $("[data-field = "+field_comp+"]").html("X");
                moves_comp.push(field_comp); 
            }

            // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
            new_options = [];
            check_win();

        } else if (round == 4){
            



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
        

var act = function(){
//ACT: 1: IF THERE IS OPPORTUNITY, WIN. 2: IF THERE IS RISK, ELIMINATE IT. 3: IF NO OPPORTUNITY TO WIN OR RISK, ATTACK.
            
            if(opportunity.length > 0){
            
                //FIND THE REMAINING MOVE IN THE OPPORTUNITY COMBINATION
            
                for(var j=0; j < opportunity.length; j++){
                    if(moves_comp.indexOf(opportunity[j]) == -1){
                        //OCCUPY THAT FIELD
                        field_comp = opportunity[j];
                        $("[data-field = "+field_comp+"]").html("X");
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
                        $("[data-field = "+field_comp+"]").html("X");
                        //UPDATE YOUR LIST OF MOVES
                        moves_comp.push(field_comp);
                    }
                }
            } else {
                var choice = []; 
                //CHECK WHICH FIELDS ARE STILL AVAILABLE

                var fields_marked = moves_pl.concat(moves_comp);
                var fields_available = [];
                var all_fields = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

                for(var i = 0; i < all_fields.length; i++){
                    if(fields_marked.indexOf(all_fields[i]) == -1){
                        fields_available.push(all_fields[i]);
                    }
                }

                console.log("fields marked:");
                console.log(fields_marked);
                
                //RANDOMLY CHOOSE ONE OF THE FIELDS FROM THE LIST OF POTENTIAL MOVES 
                var random = Math.floor(Math.random() * fields_available.length); 
                field_comp = fields_available[random];
                
                //OCCUPY THAT FIELD
                $("[data-field = "+field_comp+"]").html("X");
                moves_comp.push(field_comp); 
            }

            // FINAL CLEAN-UP BEFORE UPDATING OPTIONS FOR COMP
            new_options = [];
            check_win();

        }

        
        setTimeout(act, 100);
    }
    
    };
});



