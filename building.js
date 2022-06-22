var pokemon_info_text_all = document.querySelectorAll(".pokemon-info-text");
var pokemon_info_image = document.querySelector(".pokemon-img img");
var pokebank = document.querySelector(".pokemon-info-bank");
var team_builder_array = [];
var selection_array = [];
var team_builder_obj_array = [];
var team_builder_obj_array_clone = [];
var selection_object_array = [];
var enemy_object_array = [];
var default_gold = 5;
var champ_cost = 3;
var current_gold;
var default_pokeball = 3;
var pokeball_cost = 1;
var current_pokeball;
var arena_round = 1;
var feld_anzahl = 3;
var char_check,
  dragSrcEl,
  pre_style,
  pre_element,
  dragStart_char,
  dragOver_char,
  pre_element_fight,
  char_werte,
  atk_element,
  hp_element,
  lv_element,
  current_data_level,
  current_data_level_fight,
  obj_current_char,
  field_element,
  char_element,
  get_random_value,
  picked_char,
  dragOver_char_level,
  dragStart_char_level,
  drag_insgesammt_level,
  fighters,
  characters,
  sell_hero,
  fight_position,
  pokemon_stats_previos_check;

var pre_handleDrop_element = 0;


function reload_bank(){
  //zeigt aktuelle pokebank an 
  for (var i = 0; i < char_selection_array.length; i++) {
      pokebank_content = document.createElement("img");
      pokebank_content.src  = "./img/" + char_selection_array[i] + ".png";
      pokebank.appendChild(pokebank_content.cloneNode(true));
  }
}

function pokmeon_show_stats(object_arr, postion){
  pokemon_info_image.classList.remove("slide_animation");
  
  pokemon_info_image.src = "./img/" + object_arr[postion].EvoNAME + ".png";
  
  setTimeout(() => {
    pokemon_info_image.classList.add("slide_animation");
  }, 50);
  
  pokemon_info_text_all[0].innerHTML = object_arr[postion].EvoNAME;
  pokemon_info_text_all[1].innerHTML = object_arr[postion].EvoLV;
  pokemon_info_text_all[2].innerHTML = object_arr[postion].HP;
  pokemon_info_text_all[3].innerHTML = object_arr[postion].ATK;
}

function level_up_char(value, current_obj) {
  console.log(current_obj);
  current_obj.LV = current_obj.LV + 1
  console.log(current_obj.LV);
  console.log(value[0].src)

  //COUNT UP ANIMATION-------------------------------------------
  // value[2].classList.add("countup");
  // console.log(value[2]);


  if (current_obj.LV < 3) {
    current_obj.ATK = current_obj.ATK + 5;
    value[1].innerHTML = current_obj.ATK; 

    current_obj.HP = current_obj.HP + 15;
    value[2].innerHTML = current_obj.HP; 

    // value[3].innerHTML = "Lv " + 8;
    current_obj.EvoLV = 8;

    //pokemon current lv status
    value[3].children[1].style.opacity = "1";

  } else if (current_obj.LV === 3) {
    current_obj.ATK = current_obj.ATK + 10;
    value[1].innerHTML = current_obj.ATK; 

    current_obj.HP = current_obj.HP + 30;
    value[2].innerHTML = current_obj.HP; 
   
    // value[3].innerHTML = "Lv " + 16;
    current_obj.EvoLV = 16;

    value[3].children[0].src  = "./img/pokeball_lv_gold.png";
    value[3].children[1].src  = "./img/pokeball_lv_gold.png";
    value[3].children[2].src  = "./img/pokeball_lv_gold.png";

    value[3].children[0].style.opacity = "0.5";
    value[3].children[1].style.opacity = "0.5";

    

    value[0].src = "./img/" + current_obj.EVOLUTION[1] + ".png";
    current_obj.EvoNAME = current_obj.EVOLUTION[1];

  } else if (current_obj.LV === 4) {
    current_obj.ATK = current_obj.ATK + 5;
    value[1].innerHTML = current_obj.ATK; 

    current_obj.HP = current_obj.HP + 15;
    value[2].innerHTML = current_obj.HP; 

    // value[3].innerHTML = "Lv " + 24;
    current_obj.EvoLV = 24;

    value[3].children[0].src  = "./img/pokeball_lv_gold.png";
    value[3].children[1].src  = "./img/pokeball_lv_gold.png";
    value[3].children[2].src  = "./img/pokeball_lv_gold.png";

    value[3].children[0].style.opacity = "1";
    value[3].children[1].style.opacity = "0.5";
    value[3].children[2].style.opacity = "0.5";

    value[0].src = "./img/" + current_obj.EVOLUTION[1] + ".png";
    current_obj.EvoNAME = current_obj.EVOLUTION[1];
  
  }else if (current_obj.LV === 5) {
    current_obj.ATK = current_obj.ATK + 5;
    value[1].innerHTML = current_obj.ATK; 

    current_obj.HP = current_obj.HP + 15;
    value[2].innerHTML = current_obj.HP; 

    // value[3].innerHTML = "Lv " + 32;
    current_obj.EvoLV = 32;

    value[3].children[0].src  = "./img/pokeball_lv_gold.png";
    value[3].children[1].src  = "./img/pokeball_lv_gold.png";
    value[3].children[2].src  = "./img/pokeball_lv_gold.png";

    value[3].children[0].style.opacity = "1";
    value[3].children[1].style.opacity = "1";
    value[3].children[2].style.opacity = "0.5";

    value[0].src = "./img/" + current_obj.EVOLUTION[1] + ".png";
    current_obj.EvoNAME = current_obj.EVOLUTION[1];
  
  } else if (current_obj.LV === 6) {
    current_obj.ATK = current_obj.ATK + 10;
    value[1].innerHTML = current_obj.ATK; 

    current_obj.HP = current_obj.HP + 30;
    value[2].innerHTML = current_obj.HP; 

    // value[3].innerHTML = "Lv " + "MAX";
  
    current_obj.EvoLV = "MAX";
    
    value[3].children[0].src  = "./img/pokeball_lv_gold.png";
    value[3].children[1].src  = "./img/pokeball_lv_gold.png";
    value[3].children[2].src  = "./img/pokeball_lv_gold.png";

    value[3].children[0].style.opacity = "1";
    value[3].children[1].style.opacity = "1";
    value[3].children[2].style.opacity = "1";

    value[0].src = "./img/" + current_obj.EVOLUTION[2] + ".png";
    current_obj.EvoNAME = current_obj.EVOLUTION[2];

  } else {
    console.log("return");
  }
 
}

function handleDragStart(e) {
  this.style.opacity = "0.4";
  pre_element = e.target;
  dragStart_char = e.target.className;
  dragStart_char_level = e.target.dataset.level;
  pre_style = this;
  char_check = false;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", this.innerHTML);
}
function handleDragStart_fight(e) {
  this.style.opacity = "0.4";
  console.log(this)
  sell_hero.classList.add("sell-hero-visible");
  dragSrcEl = this;
  pre_element_fight = e.target;
  dragStart_char_level = e.target.dataset.level;
  char_check = true;
  dragStart_char = e.target.className;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", this.innerHTML);
}
function handleDragEnd(e) {
  this.style.opacity = "1";
  sell_hero.classList.remove("sell-hero-visible");
}
function handleDragOver_fight(e) {
  e.preventDefault();
  dragOver_char = e.target.className;
  dragOver_char_level = e.target.dataset.level;
  fight_position = this.dataset.position;
  
}
function handleDragOver(e) {
  dragOver_char = e.target.className;
}
function handleDrop(e) {
  e.preventDefault();

 
 
  //bricht ab wenn char auf level 6 
  drag_insgesammt_level = parseInt(dragOver_char_level) + parseInt(dragStart_char_level);
  if (drag_insgesammt_level > 6 && dragStart_char === dragOver_char) {
    return;

    //wenn aus selection drag => ersetzen
  } else if ((dragStart_char === dragOver_char) && (!char_check) && current_pokeball >= pokeball_cost){
    this.innerHTML = e.dataTransfer.getData("text");
    
    // array char obj werden hier geändert
    // console.log(pre_element.dataset.position);
    // console.log(this.dataset.position);

    // team_builder_obj_array[parseInt(this.dataset.position)] = selection_object_array[parseInt(pre_element.dataset.position)];
    selection_object_array[parseInt(pre_element.dataset.position)] = "";
    
    if(!e.path){
      console.log("firefox");
      // zählt hoch für data attribute wenn gleiche char
      console.log(this.firstChild.dataset.level);
      this.firstChild.dataset.level =
      parseInt(e.originalTarget.dataset.level) +
      parseInt(this.firstChild.dataset.level);

    }else{
      console.log("chrome");
      // zählt hoch für data attribute wenn gleiche char
      console.log(this.firstChild.dataset.level);
      this.firstChild.dataset.level =
      (parseInt(e.path[0].attributes[1].value) +
      parseInt(this.firstChild.dataset.level));

    }

  
    pre_style.style.opacity = "1";
    pre_element.remove();

    

    //WENN level aufsteigt dann erhöhe leben und attacke
    current_data_level = parseInt(this.firstChild.dataset.level);
    level_up_char(
      // current_data_level,
      this.children,
      team_builder_obj_array[parseInt(this.dataset.position)]
    );

    //champ kaufen gold abzug
    current_pokeball = current_pokeball - pokeball_cost;
    pokeball.innerHTML = current_pokeball;

    //COUNT UP FUNCTION !!!!!!!!!!!!---------------------------------------
    // runAnimations();

  //VON SELECTION AUF TEAM => nur auf leere felder
  } else if (
    (team_builder_obj_array[fight_position] === "") &&
    (!char_check) && current_pokeball >= pokeball_cost
  ) {
    this.innerHTML = e.dataTransfer.getData("text");
   
    // array char obj werden hier geändert
    team_builder_obj_array[parseInt(this.dataset.position)] = selection_object_array[parseInt(pre_element.dataset.position)];
    selection_object_array[parseInt(pre_element.dataset.position)] = "";



    pre_style.style.opacity = "1";
    pre_element.remove();

    //champ kaufen gold abzug
    current_pokeball = current_pokeball - pokeball_cost;
    pokeball.innerHTML = current_pokeball;


    
    //wenn aus team builder drag => tauschen
  } else if (
    dragStart_char !== dragOver_char &&
    char_check === true &&
    dragSrcEl !== this
  ) {


    //array char obj werde hier geändert
    console.log(this.dataset.position);
    console.log(dragSrcEl.dataset.position);

    var curent_char_obj = team_builder_obj_array[parseInt(this.dataset.position)];

    team_builder_obj_array[parseInt(this.dataset.position)] = team_builder_obj_array[parseInt(dragSrcEl.dataset.position)];
    team_builder_obj_array[parseInt(dragSrcEl.dataset.position)] = curent_char_obj; 

    console.log(team_builder_obj_array);

    this.style.opacity = "1";
    dragSrcEl.style.opacity = "1";
    sell_hero.classList.remove("sell-hero-visible");
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text");

    //wenn aus team builder gleiche chars dragen
  } else if (
    dragStart_char === dragOver_char &&
    char_check === true &&
    dragSrcEl !== this
  ) {

    //array char obj werde hier geändert
    var result_atk = team_builder_obj_array[parseInt(dragSrcEl.dataset.position)].ATK - char_stats_object[team_builder_obj_array[parseInt(dragSrcEl.dataset.position)].NAME].ATK;
    var result_hp = team_builder_obj_array[parseInt(dragSrcEl.dataset.position)].HP - char_stats_object[team_builder_obj_array[parseInt(dragSrcEl.dataset.position)].NAME].HP;
    var result_lv = team_builder_obj_array[parseInt(dragSrcEl.dataset.position)].LV - char_stats_object[team_builder_obj_array[parseInt(dragSrcEl.dataset.position)].NAME].LV;

    team_builder_obj_array[parseInt(this.dataset.position)].ATK = team_builder_obj_array[parseInt(this.dataset.position)].ATK + result_atk;
    team_builder_obj_array[parseInt(this.dataset.position)].HP = team_builder_obj_array[parseInt(this.dataset.position)].HP + result_hp;
    team_builder_obj_array[parseInt(this.dataset.position)].LV = team_builder_obj_array[parseInt(this.dataset.position)].LV + result_lv;


    team_builder_obj_array[parseInt(dragSrcEl.dataset.position)] = ""; 
    console.log(team_builder_obj_array);

    this.style.opacity = "1";
    dragSrcEl.style.opacity = "1";
    sell_hero.classList.remove("sell-hero-visible");
    this.innerHTML = e.dataTransfer.getData("text");
    // zählt hoch für data attribute wenn gleiche char
    if(!e.path){
      console.log("firefox");
      // zählt hoch für data attribute wenn gleiche char
      console.log(this.firstChild.dataset.level);
      this.firstChild.dataset.level =
      parseInt(e.originalTarget.dataset.level) +
      parseInt(this.firstChild.dataset.level);

    }else{
      console.log("chrome");
      // zählt hoch für data attribute wenn gleiche char
      console.log(this.firstChild.dataset.level);
      this.firstChild.dataset.level =
      (parseInt(e.path[0].attributes[1].value) +
      parseInt(this.firstChild.dataset.level));

    }
   
    pre_element_fight.remove();

    current_data_level_fight = parseInt(this.firstChild.dataset.level);

    level_up_char(
      // current_data_level_fight,
      this.children,
      team_builder_obj_array[parseInt(this.dataset.position)]
    );
  }else if(dragStart_char !== dragOver_char){
    console.log("gleich");
      return;
  }

  update_fields();

  return false;
}

function handleDrop_sell(e) {
  e.preventDefault();
  dragSrcEl.style.opacity = "1";
  sell_hero.classList.remove("sell-hero-visible");
  pre_element_fight.remove();
  
  //+1 Pokeball 
  current_pokeball= current_pokeball + 1;
  pokeball.innerHTML = current_pokeball;

  //removed pokemon info stats beim freilassen
  pokemon_info_image.src = "#";
  pokemon_info_text_all[0].innerHTML = "";
  pokemon_info_text_all[1].innerHTML = "";
  pokemon_info_text_all[2].innerHTML = "";
  pokemon_info_text_all[3].innerHTML = "";


  update_fields();
  team_builder_obj_array[parseInt(dragSrcEl.dataset.position)] = ""; 
  console.log(team_builder_obj_array);
}

function handleDragOver_sell(e) {
  e.preventDefault();
}

function update_fields(){
//array aus team builder und selection werden die aktuellen chars zugewiesen
team_builder_array = [];
selection_array = [];
fighters.forEach(function (fighter) {
  if (fighter.childNodes[0] && fighter.childNodes[0].className !== "atk") {
    team_builder_array.push(fighter.childNodes[0].className);
  } else {
    team_builder_array.push("");
  }
});
characters.forEach(function (char) {
  if (char.childNodes[0] && char.childNodes[0].className !== "atk") {
    selection_array.push(char.childNodes[0].className);
  } else {
    selection_array.push("");
  }
});

// HIER PASSIERT DIE MAGIE  => löscht den inhalt wenn der char seine position verlässt
selection_array.forEach(function (select, index) {
  if (select === "" || select === "atk") {
    characters[index].innerHTML = "";
  }
});
team_builder_array.forEach(function (build, index) {
  if (build === "" || build === "atk") {
    fighters[index].innerHTML = "";
  }
});

// console.log(selection_array);
// console.log(team_builder_array);
}


var btn_roll = document.querySelector(".btn-roll");
var selection = document.querySelector(".selection");
var team_builder = document.querySelector(".team-builder");
var gold = document.querySelector(".gold");
var pokeball = document.querySelector(".pokeball");

function reset_gold(){
  gold.innerHTML = default_gold;
  current_gold = default_gold;

  pokeball.innerHTML = default_pokeball;
  current_pokeball = default_pokeball;

}


btn_roll.addEventListener("click", function () {
  if(current_gold >= 1){
  selection.innerHTML = "";
  generate_char();
  current_gold = current_gold - 1;
  gold.innerHTML = current_gold;
}
});



//generiert selection child elemente ----------------------------------------->
function generate_char() {

  selection_object_array = [];
  //erstell die field elemente von selection
  for (let index = 0; index < feld_anzahl; index++) {
    field_element = document.createElement("div");
    field_element.classList.add("field");
    selection.appendChild(field_element);

  
    get_random_value = Math.floor(Math.random() * char_selection_array.length);
    picked_char = char_selection_array[get_random_value];

    console.log(char_stats_object[picked_char].EVOLUTION[char_stats_object[picked_char].LV - 1]);

    char_element = document.createElement("img");
    char_element.classList.add(picked_char);
    char_element.setAttribute("data-level", char_stats_object[picked_char].LV);
    char_element.setAttribute("data-position", index);
    char_element.setAttribute("draggable", "true");
    char_element.setAttribute("src", "./img/" + char_stats_object[picked_char].EVOLUTION[char_stats_object[picked_char].LV - 1] + ".png");

    field_element.appendChild(char_element);

   //clont obj um die refence werte nicht zu beeinflussen
   const deepClone = JSON.parse(JSON.stringify(char_stats_object[picked_char]));
   //generiert einen array mit der richtigen obj der chars
   selection_object_array.push(deepClone);
  }
  console.log(selection_object_array);
  console.log(team_builder_obj_array);


  //drag and drop selection event
  characters = document.querySelectorAll(".selection .field");
  characters.forEach(function (char) {
    char.addEventListener("dragstart", handleDragStart);
    char.addEventListener("dragend", handleDragEnd);
    char.addEventListener("dragover", handleDragOver);

    //HOVER POKEMON STATS
    char.addEventListener("mouseover", function(){
      if(char.children[0] && pokemon_stats_previos_check != selection_object_array[char.children[0].dataset.position]){
        pokmeon_show_stats(selection_object_array, char.children[0].dataset.position);
        pokemon_stats_previos_check =  selection_object_array[char.children[0].dataset.position];
      }
    })
  });

  //drag and drop team-builder event
  fighters = document.querySelectorAll(".team-builder .field");
  fighters.forEach(function (fighter) {
    fighter.addEventListener("dragover", handleDragOver_fight);
    fighter.addEventListener("drop", handleDrop);
    fighter.addEventListener("dragstart", handleDragStart_fight);
    fighter.addEventListener("dragend", handleDragEnd);

     //HOVER POKEMON STATS
   
     fighter.addEventListener("mouseover", function(){
      if(team_builder_obj_array[fighter.dataset.position].EvoNAME  && pokemon_stats_previos_check != team_builder_obj_array[fighter.dataset.position]){
      pokmeon_show_stats(team_builder_obj_array, fighter.dataset.position);
      pokemon_stats_previos_check =  team_builder_obj_array[fighter.dataset.position];
    }
    })
  
  });

  sell_hero = document.querySelector(".sell-hero");
  sell_hero.addEventListener("drop", handleDrop_sell);
  sell_hero.addEventListener("dragover", handleDragOver_sell);


  //generiert für char elemente atk und hp
  characters.forEach(function (char) {
    if (char.childNodes[0]) {
      selection_array.push(char.childNodes[0].className);
      char_werte = char.childNodes[0].className;

      atk_element = document.createElement("span");
      atk_content = document.createTextNode(char_stats_object[char_werte].ATK);
      atk_element.classList.add("atk");
      atk_element.setAttribute("draggable", "false");
      atk_element.appendChild(atk_content);

      hp_element = document.createElement("span");
      hp_content = document.createTextNode(char_stats_object[char_werte].HP);
      hp_element.classList.add("hp");
      hp_element.setAttribute("draggable", "false");
      hp_element.appendChild(hp_content);

      lv_element = document.createElement("span");
      //pokemon icons level anzeige
      // lv_content = document.createTextNode("Lv " + char_stats_object[char_werte].LV);
      lv_content = document.createElement("img");
      lv_content.classList.add("pokeball_lv");
      lv_content.src  = "./img/pokeball_lv.png";
      lv_element.classList.add("lv");
      lv_element.classList.add(char_stats_object[char_werte].Typ);
      lv_element.setAttribute("draggable", "false");

      // lv_element.appendChild(lv_content);
      // append child deep clone um selbe img einzufügen
      for(var i = 0; i < 3; i++){
        lv_element.appendChild(lv_content.cloneNode(true));
      }


      
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

  console.log(fighters);
}

generate_char();
reset_gold();
reload_bank()

//füllt array mit leeren team builder value
fighters.forEach(function(){
  team_builder_obj_array.push("");
})

