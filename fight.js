var btn_fight = document.querySelector(".btn-fight");
var enemy = document.querySelector(".enemy");
var enemy_fields;
var clone_team_builder;
var wrapper = document.querySelector(".wrapper");
var timeout = 500;
var check_alive = true;
var check_lose_enemy = false;
var delete_array = [];
var check_win_array = []; 
var vorteil_check_array = []; 
var team_stats_check = false;
var enemy_stats_check = false;
var pokemon_information_container = document.querySelector(".pokemon-information-container");
var pokemon_stats = document.querySelector(".pokemon-stats");
var stats_name = document.querySelectorAll(".stats-name");
var stats_lv = document.querySelectorAll(".stats-lv");
var stats_hp_balken = document.querySelectorAll(".stats-hp_balken");
var stats_hp = document.querySelectorAll(".stats-hp");
var stats_hp_full = document.querySelectorAll(".stats-hp-full");
var stats_atk = document.querySelectorAll(".stats-atk");
var vorteil_zeiger = document.querySelector(".vorteil_zeiger");
var transition_animation = document.querySelector(".transition-animation");
var max_balken_hp_team;
var max_balken_hp_enemy;
var strength_weakness_atk;
var show_current_atk;
var win_count_up = 0;

console.log(stats_name[0]);
console.log(stats_lv[0]);
console.log(stats_hp[0]);
console.log(stats_hp_full[0]);
console.log(stats_atk[0]);

// stats_hp_balken[1].style.width = "70%";


function strength_weakness(first_obj, second_obj){
  console.log("first and seconds")
    console.log(first_obj[5].Typ);
    console.log(second_obj[5].Typ);

    if("water" === first_obj[5].Typ && "fire" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK / 2);
      show_current_atk = second_obj[5].ATK / 2;
      vorteil_check_array.push('nachteil');
      return current_hp;
    }

    else if("water" === first_obj[5].Typ && "grass" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK * 2);
      show_current_atk = second_obj[5].ATK * 2;
      vorteil_check_array.push('vorteil');
      return current_hp;
    }

    else if("water" === first_obj[5].Typ && "water" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK / 2);
      show_current_atk = second_obj[5].ATK / 2;
      vorteil_check_array.push('nachteil');
      return current_hp;
    }

    else if("fire" === first_obj[5].Typ && "grass" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK / 2);
      show_current_atk = second_obj[5].ATK / 2;
      vorteil_check_array.push('nachteil');
      return current_hp;
    }

    else if("fire" === first_obj[5].Typ && "fire" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK / 2);
      show_current_atk = second_obj[5].ATK / 2;
      vorteil_check_array.push('nachteil');
      return current_hp;
    }

    else if("fire" === first_obj[5].Typ && "water" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK * 2);
      show_current_atk = second_obj[5].ATK * 2;
      vorteil_check_array.push('vorteil');
      return current_hp;
    }

    else if("grass" === first_obj[5].Typ && "grass" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK / 2);
      show_current_atk = second_obj[5].ATK / 2;
      vorteil_check_array.push('nachteil');
      return current_hp;
    }

    else if("grass" === first_obj[5].Typ && "water" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK / 2);
      show_current_atk = second_obj[5].ATK / 2;
      vorteil_check_array.push('nachteil');
      return current_hp;
    }

    else if("grass" === first_obj[5].Typ && "fire" === second_obj[5].Typ){
      current_hp = first_obj[5].HP - (second_obj[5].ATK * 2);
      show_current_atk = second_obj[5].ATK * 2;
      vorteil_check_array.push('vorteil');
      return current_hp;
    }else{
      current_hp = first_obj[5].HP - second_obj[5].ATK;
      show_current_atk = second_obj[5].ATK;
      vorteil_check_array.push('gleich');
      return current_hp;
    }

    return;


}


function end_round_result(win){

  transition_animation.classList.add("transition-animation_on")

  setTimeout(function(){
  
 

  enemy.innerHTML = "";
  team_builder.innerHTML = "";
  btn_roll.classList.remove("hidden");
  selection.classList.remove("hidden");
  // gold.classList.remove("hidden");
  enemy.classList.add("hidden");
  btn_fight.classList.remove("hidden");
  wrapper.classList.remove("fight-modus");
  document.body.classList.remove("change-arena");

  pokemon_information_container.classList.remove("hidden");
  pokemon_stats.classList.add("hidden");
  vorteil_zeiger.classList.add("hidden");
  
  team_builder.innerHTML = clone_team_builder;
  selection.innerHTML = "";

  team_stats_check = false;
  enemy_stats_check = false;
  

  if((win === "team") && (feld_anzahl < 6)){
    feld_anzahl = feld_anzahl + 1;
  }

  if(win === "team"){
    win_count_up = win_count_up + 1;
  }

  generate_char();

  fighters.forEach(function (fighter) {
    if (fighter.firstChild !== null) {
      fighter.firstChild.draggable = true;
    }
  });

  current_pokeball = current_pokeball + 3;
  pokeball.innerHTML = default_pokeball;

  current_gold = current_gold + 5
  gold.innerHTML = current_gold;

  transition_animation.classList.remove("transition-animation_on")


}, 2000);
}



function display_stats(stats_value, obj, value_check, check, index, fields){
  
  if(team_stats_check === check && value_check === index){
    stats_name[stats_value].innerHTML = obj[5].EvoNAME;
    stats_lv[stats_value].innerHTML = obj[5].EvoLV;
    stats_hp_full[stats_value].innerHTML = obj[5].HP;
    stats_hp[stats_value].innerHTML = obj[5].HP;
    stats_atk[stats_value].innerHTML = obj[5].ATK;

  }
//checkt ob es schon einmal durchgelaufen ist, geht auf true
  if(team_stats_check === check &&  value_check === "team"){
    team_stats_check = true;
    //hp balken rechnung
    stats_hp_balken[0].style.width = (100 / obj[5].HP) * obj[5].HP + '%';
    max_balken_hp_team = obj[5].HP;
    //hide lv bar when fight
    fields[5].childNodes[3].classList.add("hide");
   

  }else if(team_stats_check === check &&  value_check === "enemy"){
    enemy_stats_check = true;
    stats_hp_balken[1].style.width = (100 / obj[5].HP) * obj[5].HP + '%';
    max_balken_hp_enemy = obj[5].HP;
    //hide lv bar when fight
    fields[5].childNodes[3].classList.add("hide");
  }else{
    return;
  }
}

function attack(first_obj, first_field, second_obj, value){
  var current_hp;

  current_hp = strength_weakness(first_obj, second_obj);

  //Voeteil check pfeil
  if(vorteil_check_array.length === 2){
    if(vorteil_check_array[0] === vorteil_check_array[1]){
      vorteil_zeiger.classList.remove("vorteil_team");
      vorteil_zeiger.classList.remove("vorteil_enemy");
    }else{
      if(vorteil_check_array[0] === "vorteil"){
        vorteil_zeiger.classList.remove("vorteil_team");
        vorteil_zeiger.classList.add("vorteil_enemy");

      }else{
        vorteil_zeiger.classList.remove("vorteil_enemy");
        vorteil_zeiger.classList.add("vorteil_team");

      }
    }
  }

  // current_hp = first_obj[5].HP - second_obj[5].ATK;

    if(current_hp <= 0){
      current_hp = 0;
      check_alive = false;
      delete_array.push(value);

       //ATTACK ANIMATION LOSE
      if(value === "enemy"){
        stats_hp[1].innerHTML = current_hp;
        enemy.children[5].classList.add("attack-animation-lose");
        stats_hp_balken[1].style.width = (100 / max_balken_hp_enemy) * current_hp + '%';
      }else{
        stats_hp[0].innerHTML = current_hp;
        team_builder.children[5].classList.add("attack-animation-lose");
        stats_hp_balken[0].style.width = (100 / max_balken_hp_team) * current_hp + '%';
      }

    }else{
      delete_array.push("");


      //ATTACK ANIMATION WIN
      if(value === "enemy"){
        stats_hp[1].innerHTML = current_hp;
        enemy.children[5].classList.add("attack-animation");
        stats_hp_balken[1].style.width = (100 / max_balken_hp_enemy) * current_hp + '%';
      }else{
        stats_hp[0].innerHTML = current_hp;
        team_builder.children[5].classList.add("attack-animation");
        stats_hp_balken[0].style.width = (100 / max_balken_hp_team) * current_hp + '%';
      }
    }

    //show atk value during fight
    first_field[5].children[4].innerHTML = show_current_atk;
    setTimeout(function(){
      first_field[5].children[4].classList.add("show-atk-animation");
    }, 50);
    //unshow atk balue when animation atk ends
    setTimeout(function(){
      first_field[5].children[4].innerHTML = "";
      first_field[5].children[4].classList.remove("show-atk-animation");
    }, 400);
    

    first_field[5].children[2].innerHTML = current_hp;
    first_obj[5].HP = current_hp;
    
}


function fight(){

    console.log("start");
    console.log(delete_array);
    
   
    //ATTACK ANIMATION
    
    


    attack(enemy_object_array, enemy_fields, team_builder_obj_array_clone, "enemy");
    attack(team_builder_obj_array_clone, fighters, enemy_object_array, "team");

    vorteil_check_array = []; 

    // console.log(enemy_object_array)
    // console.log(team_builder_obj_array_clone)

  setTimeout(function(){
      
    //ATTACK ANIMATION REMOVE
    team_builder.children[5].classList.remove("attack-animation");
    enemy.children[5].classList.remove("attack-animation");
    team_builder.children[5].classList.remove("attack-animation-lose");
    enemy.children[5].classList.remove("attack-animation-lose");


    if(!check_alive){
      // console.log("dead");
      // console.log(delete_array);

      if(delete_array[0] === "enemy"){
        console.log("first")
        enemy_fields[5].innerHTML = "";
        enemy_object_array[5] = "";
      }

      if(delete_array[1] === "team"){
        console.log("second")
        fighters[5].innerHTML = "";
        team_builder_obj_array_clone[5] = "";
      }
        
      delete_array = [];
      check_alive = true;


      console.log("after dead");
      console.log(delete_array);

      setTimeout(function(){
        start_auto_fight(enemy_object_array, enemy_fields, "enemy", 1);
        start_auto_fight(team_builder_obj_array_clone, fighters, "team", 0);
      }, timeout);
    }else{
      delete_array = [];
      check_alive = true;
      setTimeout(fight, timeout);
    }

  }, timeout);

}


function start_auto_fight(obj, fields, value, stats_value){


    
  var count_up = 0;
  if(check_win_array.length === 2){
    check_win_array = [];
  }
  
  console.log("hier paskda dnaksdn")
  console.log(obj);
  console.log(fields);
  console.log(value);

  for(var i = 5; i >= 0; --i){
    
    if(typeof obj[i] === 'object'){

      if(obj[i] !== obj[5]){
        obj[5] = obj[i];
        obj[i] = "";
      
        fields[5].innerHTML = fields[i].innerHTML;
        fields[i].innerHTML = "";

    
        display_stats(stats_value, obj, value, true, "team", fields);
        display_stats(stats_value, obj, value, true, "enemy", fields);

  


      }
   
       display_stats(stats_value, obj, value, false, "team", fields);
       display_stats(stats_value, obj, value, false, "enemy", fields);

       
      
  
      // HIER GEDANEKN MACHEN!!!!!! WENN GEWONNEN DANN FÜHRT ER TROTZDEM AUS|| Lösung=> gib wert mit ob enemy verloren hat
      if((value === "team") && (!check_lose_enemy)){
        setTimeout(fight, timeout);
      }
      check_win_array.push("");

      if((check_win_array[0] === "enemy") && (check_win_array[1] === "")){
        console.log("TEAM WINS!!");
        end_round_result("team");
        return;
      }
      

      return;
    }else{
      count_up = count_up + 1;
    }
    if(count_up === 6){
      check_lose_enemy = true;
      check_win_array.push(value);
    
        if((check_win_array[0] === "enemy") && (check_win_array[1] === "team")){
          console.log("DRAW!!");
          end_round_result("draw");
          return;
        }else if((check_win_array[0] === "") && (check_win_array[1] === "team")){
          console.log("ENEMY WINS!!");

          end_round_result("enemy");
          return;
        }

    }
  }
}





//GENERIERT ELEMENTE INHALTE FÜR ENEMY SELECTION!!!
function generate_enemy_fields(array, obj){
  

  for (let index = 0; index < 6; index++) {
    if(array[index] !== ""){
    field_element = document.createElement("div");
    field_element.classList.add("field");
    enemy.appendChild(field_element);

    // get_random_value = Math.floor(Math.random() * char_selection_array.length);
    picked_char = array[index];

    char_element = document.createElement("img");
    char_element.classList.add(picked_char);
    char_element.setAttribute("data-level", obj[picked_char].LV);
    char_element.setAttribute("data-position", index);
    char_element.setAttribute("draggable", "false");
    char_element.setAttribute("src", "./img/" + picked_char + ".png");

    field_element.appendChild(char_element);

    //clont obj um die refence werte nicht zu beeinflussen
    const deepCloneEnemy = JSON.parse(
      JSON.stringify(obj[picked_char])
    );
    //generiert einen array mit der richtigen obj der chars
    enemy_object_array.push(deepCloneEnemy);
  }else{
    field_element = document.createElement("div");
    field_element.classList.add("field");
    enemy.appendChild(field_element);

    //clont obj um die refence werte nicht zu beeinflussen
    const deepCloneEnemy = JSON.parse(
      JSON.stringify("")
    );
    //generiert einen array mit der richtigen obj der chars
    enemy_object_array.push(deepCloneEnemy);
  }
  }
  enemy_fields = document.querySelectorAll(".enemy .field");
  enemy_fields.forEach(function (char) {
    if (char.childNodes[0]) {
      selection_array.push(char.childNodes[0].className);
      char_werte = char.childNodes[0].className;

      atk_element = document.createElement("span");
      atk_content = document.createTextNode(obj[char_werte].ATK);
      atk_element.classList.add("atk");
      atk_element.setAttribute("draggable", "false");
      atk_element.appendChild(atk_content);

      hp_element = document.createElement("span");
      hp_content = document.createTextNode(obj[char_werte].HP);
      hp_element.classList.add("hp");
      hp_element.setAttribute("draggable", "false");
      hp_element.appendChild(hp_content);

      lv_element = document.createElement("span");
      lv_content = document.createTextNode("Lv " + obj[char_werte].LV);
      lv_element.classList.add("lv");
      lv_element.setAttribute("draggable", "false");
      lv_element.appendChild(lv_content);

      show_atk_element = document.createElement("span");
      show_atk_element.classList.add("show-atk");

      char.appendChild(atk_element);
      char.appendChild(hp_element);
      char.appendChild(lv_element);
      char.appendChild(show_atk_element);

    } else {
      selection_array.push("");
    }
  });
}





btn_fight.addEventListener("click", function () {

  //transiton animation wird sofort getriggert
  transition_animation.classList.add("transition-animation_on")

  setTimeout(function(){
    console.log(enemy)
    console.log(team_builder.children[5])
  
  
    //MACHT NICHT RELEVANTE ELEMENTE HIDDEN
    btn_roll.classList.add("hidden");
    selection.classList.add("hidden");
    // gold.classList.add("hidden");
    enemy.classList.remove("hidden");
    btn_fight.classList.add("hidden");
    wrapper.classList.add("fight-modus");
    document.body.classList.add("change-arena");
    pokemon_information_container.classList.add("hidden");
    pokemon_stats.classList.remove("hidden");
    vorteil_zeiger.classList.remove("hidden");
  
    check_lose_enemy = false;
    enemy_object_array = [];
    team_builder_obj_array_clone = [];
  
    // if() count up!!! wegen enemy change round 2

    if(win_count_up === 0){
      generate_enemy_fields(enemy_array1, enemy_obj1);
    }else if(win_count_up === 1){
      generate_enemy_fields(enemy_array2, enemy_obj2);
    }else if(win_count_up === 2){
      generate_enemy_fields(enemy_array3, enemy_obj3);
    }else if(win_count_up === 3){
      generate_enemy_fields(enemy_array4, enemy_obj4);
    }
    
  
    clone_team_builder = team_builder.innerHTML;
  
    console.log("asdasd")
    console.log(team_builder);
    console.log(team_builder_obj_array);
   
    //SETZT FÜR FIGHTER SELECTION DRAGGLE AUF FALSE
    fighters.forEach(function (fighter, index) {
      if (fighter.firstChild !== null) {
        fighter.firstChild.draggable = false;
      }
  
      const deepClone_team = JSON.parse(JSON.stringify(team_builder_obj_array[index]));
      //array clone für team  
      team_builder_obj_array_clone.push(deepClone_team);
    });
  
   //end of transition animation
    transition_animation.classList.remove("transition-animation_on")
    
    //wartet 2s bevor kampf startet
   setTimeout(function(){
     console.log("true yes")
     start_auto_fight(enemy_object_array, enemy_fields, "enemy", 1);
     start_auto_fight(team_builder_obj_array_clone, fighters, "team", 0);
   }, 2000);

  }, 2000);


});



