"use strict";


//  --- here is the GUI stuff ---

function get_a_class_named(curr, searched_name) {
  if (!curr) {
    log_to_history("get_a_class_named, no curr for " + searched_name);
  }
  var notes = null;
  for (var i = 0; i < curr.childNodes.length; i++) {
    if (curr.childNodes[i].className == searched_name) {
      notes = curr.childNodes[i];
      break;
    }
  }
  return notes;
}


function gui_set_player_name(name, seat){       // seat start at 1
  var table = document.getElementById('poker_table');
  var current = 'seat' + seat;
  var seatloc = table.children[current];
  var chipsdiv = get_a_class_named(seatloc, 'name-chips');
//  var chipsdiv = seatloc.getElementById('name-chips');
  var namediv = get_a_class_named(chipsdiv, 'player-name');
  namediv.textContent = name;
}


function hilite_player(seat, color){
  var table = document.getElementById('poker_table');
  var current = 'seat' + seat;
  var seatloc = table.children[current];
  var chipsdiv = get_a_class_named(seatloc, 'name-chips');
//  var chipsdiv = seatloc.getElementById('name-chips');
  var namediv = get_a_class_named(chipsdiv, 'player-name');
  if (color == "")
    namediv.style.backgroundColor = 'gray';
  else
    namediv.style.backgroundColor = color;
}


function gui_set_bankroll(amount, seat){
  var table = document.getElementById('poker_table');
  var current = 'seat' + seat;
  var seatloc = table.children[current];
  var chipsdiv = get_a_class_named(seatloc, 'name-chips');
//  var chipsdiv = seatloc.getElementById('name-chips');
  var namediv = get_a_class_named(chipsdiv, 'chips');
  if (!isNaN(amount)) {
    amount = "$" + amount;
  }
  namediv.textContent = amount;
}


function gui_set_bet(bet, seat){
  var table = document.getElementById('poker_table');
  var current = 'seat' + seat;
  var seatloc = table.children[current];
  var betdiv = get_a_class_named(seatloc, 'bet');

  betdiv.textContent = bet;
}



function fix_the_ranking(rank) {
  if (rank == 14) {
    rank = 'ace';
  } else if (rank == 13) {
    rank = 'king';
  } else if (rank == 12) {
    rank = 'queen';
  } else if (rank == 11) {
    rank = 'jack';
  }
  return rank;
}

function fix_the_suiting(suit) {
  if (suit == 'c')
    suit = 'clubs';
  else if (suit == 'd')
    suit = 'diamonds';
  else if (suit == 'h')
    suit = 'hearts';
  else if (suit == 's')
    suit = 'spades';
  else
    alert('Unknown suit ' + suit);

  return suit;
}


function get_card_image_url(card) {
  var suit = card.substring(0, 1);
  var rank = card.substring(1);
  rank = fix_the_ranking(rank);         // 14 -> 'ace' etc
  suit = fix_the_suiting(suit);         // c  -> 'clubs' etc

  return "url(\'static/images/" + rank + '_of_' + suit + ".png')";
}


function setCard(diva, card){
  // card may be "" -> do not show card
  //             "blinded" -> show back
  //             "s14" -> show ace of spades
  var image;
  if (typeof card == 'undefined' || card == "")
    image = "url('static/images/outline.gif')";
  else if (card == "blinded")
    image = "url('static/images/cardback.gif')";
  else
    image = get_card_image_url(card);
//    image = "url('static/images/2_of_spades.png')";


  var komage = diva.style;
  komage['background-image'] = image;
//  log_to_history(image);
}

function gui_set_player_cards(card_a, card_b, seat){
  var table = document.getElementById('poker_table');
  var current = 'seat' + seat;
  var seatloc = table.children[current];
  var cardsdiv = get_a_class_named(seatloc, 'holecards');
  var card1 = get_a_class_named(cardsdiv,'card holecard1');
  var card2 = get_a_class_named(cardsdiv,'card holecard2');

//  log_to_history("Player " + seat);
  setCard(card1, card_a);
  setCard(card2, card_b);
}

function gui_lay_board_card(n, the_card) {
  // Write the card no 'n'
  // the_card = "c9";

  var current = '';

  if (n == 0) {
    current = 'flop1';
  } else if (n == 1) {
    current = 'flop2';
  } else if (n == 2) {
    current = 'flop3';
  } else if (n == 3) {
    current = 'turn';
  } else if (n == 4) {
    current = 'river';
  }

//  log_to_history("Card to board " + current);
  var table = document.getElementById('poker_table');
  var seatloc = table.children['board'];

  var cardsdiv = seatloc.children[current];
  setCard(cardsdiv, the_card);
}

function gui_write_basic_general(pot_size) {
  var table = document.getElementById('poker_table');
  var pot_div = table.children['pot'];
  var total_div = pot_div.children['total-pot'];

  var the_pot = 'Total pot: ' + pot_size;
  total_div.innerHTML = the_pot;
}


var log_text = [];
var log_index = 0;

function log_to_history(text_to_write) {
  for (var idx = log_index; idx > 0; --idx) {
    log_text[idx] = log_text[idx-1];
  }

  log_text[0] = text_to_write;
  if (log_index < 40) {
    log_index = log_index + 1;
  }
  var text_to_output = '<br><b>' + log_text[0] + '</b>';
  for (var idx = 1; idx < log_index; ++idx) {
    text_to_output += '<br>' + log_text[idx];
  }
  var board = document.getElementById('history');
  board.innerHTML = text_to_output;
}


function gui_place_button(seat){
  var table_seat = seat;  // interface start at 1
  var button = document.getElementById('button');
  button.className = 'seat' + table_seat + '-button';
}


function clickin_helper(button, button_text, func_on_click) {
  if (button_text == 0) {
    button.style.visibility = 'hidden';
  } else {
    button.style.visibility = 'visible';
    button.innerHTML = button_text;
    button.onclick = func_on_click;
  }
}

function setup_clickin(show_fold, call_text, raise_text) {
  // Here we have a coupling of the funtions 'human_fold', 'human_call' and 'human_raise'
  var buttons = document.getElementById('action-options');
  var fold = buttons.children['fold-button'];
  clickin_helper(fold, show_fold, human_fold);

  var call = buttons.children['call-button'];
  clickin_helper(call, call_text, human_call);

  var raise = buttons.children['raise-button'];
  clickin_helper(raise, raise_text, human_raise);
}

function get_speed_setting() {
  var buttons = document.getElementById('setup-options');
  var speed = buttons.children['speed-button'];
  var selector = speed.children['speed-selector'];
  var qqq = selector.children['select'];
  var www = qqq.children['options'];
  var value = qqq.value;
  var index = www.selectedIndex;

  var answer = index;
  alert('Speed = ' + answer);
}

function setup_option_buttons(name_func, speed_func, help_func) {
  var buttons = document.getElementById('setup-options');
  var name = buttons.children['name-button'];
  name.onclick = name_func;
  var speed = buttons.children['speed-button'];
  var selector = speed.children['speed-selector'];
  speed.onchange = get_speed_setting; // speed_func;
  var help = buttons.children['help-button'];
  help.onclick = help_func;
}

function write_game_response(text) {
  var response = document.getElementById('game-response');
  response.innerHTML = text;
}


function write_guick_raise(text) {
  var response = document.getElementById('quick-raises');
  if (text == "") {
    response.style.visibility = 'hidden';
  } else {
    response.style.visibility = 'visible';
    response.innerHTML = text;
  }
}
