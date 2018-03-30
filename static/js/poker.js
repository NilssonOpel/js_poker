var game;
var server;
var targetSeat = 0;

testhand = {
  "PokerHand": {
    "Blinds": [
      {
        "Player": "TAP_OR_SNAP",
        "Type": "SmallBlind",
        "Amount": "5"
      },
      {
        "Player": "OsoWhisper",
        "Type": "BigBlind",
        "Amount": "10"
      }
    ],
    "HoleCards": [
                  "h13",
                  "c11"
    ],
    "Rounds": [
      {
        "Actions": [
          {
            "Player": "Sevillano720",
            "Type": "Fold",
            "Amount": "5"
          },
          {
            "Player": "LC1492",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "Dodenburg",
            "Type": "Fold",
            "Amount": "5"
          },
          {
            "Player": "TeeJay5",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "15"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "Söta Åsa",
            "Type": "Call",
            "Amount": "15"
          },
          {
            "Player": "Давид Харис",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "LC1492",
            "Type": "Call",
            "Amount": "10"
          }
        ]
      },
      {
        "CommunityCards": [
        "d10",
        "d11",
        "c8"
        ],
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Bet",
            "Amount": "10"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "LC1492",
            "Type": "Fold"
          },
          {
            "Player": "TeeJay5",
            "Type": "Call",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "TeeJay5",
            "Type": "Fold"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "10"
          }
        ]
      },
      {
        "CommunityCards": "s5",
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Check"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Bet",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "20"
          }
        ]
      },
      {
        "CommunityCards": "c9",
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Check"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Bet",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "20"
          }
        ]
      }
    ],
    "Context": {
      "Site": "PartyPoker",
      "Currency": "USD",
      "ID": "2229799540",
      "Table": "Table  12551 ",
      "TimeStamp": "2005-06-19T04:15:10",
      "Format": "CashGame",
      "Button": "1",
      "BigBlind": "10",
      "SmallBlind": "5",
      "BettingType": "FixedLimit",
      "PokerVariant": "TexasHoldEm"
    },
    "Results": [
      {
        "Player": "OsoWhisper",
        "HoleCards": [
            "s9",
            "s12"
        ],
        "WonPots": { "Amount": "258" }
      },
      {
        "Player": "TAP_OR_SNAP",
        "HoleCards": [
        "d9",
        "h10"
        ]
      }
    ],
    "Players": [
      {
        "Name": "Söta Åsa",
        "Stack": "347",
        "Seat": "0"
      },
      {
        "Name": "TeeJay5",
        "Stack": "526",
        "Seat": "1"
      },
      {
        "Name": "TAP_OR_SNAP",
        "Stack": "301",
        "Seat": "2"
      },
      {
        "Name": "OsoWhisper",
        "Stack": "177.77",
        "Seat": "3"
      },
      {
        "Name": "Sevillano720",
        "Stack": "742",
        "Seat": "4"
      },
      {
        "Name": "Dodenburg",
        "Stack": "458.5",
        "Seat": "5"
      },
      {
        "Name": "LCia1492",
        "Stack": "641",
        "Seat": "6"
      },
      {
        "Name": "Давид Харис",
        "Stack": "793",
        "Seat": "7"
      },
    ],
    "Rake": "2.00",
    "Hero": "TeeJay5"
  }
};

function catchUp(){
    var round = testhand['PokerHand']['Rounds'].length - 1;

    setBoard(testhand);
    setHeroCards(testhand);
    setOpponentCards(testhand);
    setPlayerNames(testhand);
    setPlayerStacks(testhand);
    setPots(testhand);

    curActions = testhand['PokerHand']['Rounds'][round]['Actions'];
    curBets = [0,0,0,0,0,0,20,37];
    addCommittedAmounts(curActions, curBets, testhand);
    for (var i = 0; i < curBets.length; i++)
        gui_set_bet(curBets[i], i);

    gui_place_button(targetSeat);
    targetSeat = (targetSeat + 1) % 8;
}

function updateGameState() {
/*
  var sidebar = $('#poker_table');
    var requestData = {
        url: sidebar.data('uid')
    };
    */
    catchUp();

    window.setTimeout(updateGameState, 1000);
}


function setPlayerNames(hand){
    players = hand['PokerHand']['Players'];
    for(var i = 0; i < players.length; i++) {

      var message = "Index " + i + " " + players[i]['Name'] + " " + players[i]['Seat'];
      gui_log_to_history(message);
      gui_set_player_name(players[i]['Name'], parseInt(players[i]['Seat']));
    }
}


function setPlayerStacks(hand){
    committed = [0,0,0,0,0,0,0];
    blinds = hand['PokerHand']['Blinds'];
    addCommittedAmounts(blinds, committed, hand);

    var rounds = hand['PokerHand']['Rounds'];
    for (var i = 0; i < rounds.length; i++)
        addCommittedAmounts(rounds[i], committed, hand);

    players = hand['PokerHand']['Players'];
    for(var i = 0; i < players.length; i++){
        stack = parseFloat(players[i]['Stack']);
        seat = parseInt(players[i]['Seat']);
        gui_set_bankroll(stack - committed[seat], seat);
    }
}


function addCommittedAmounts(actions, committed, hand){
    for(var aidx = 0; aidx < actions.length; aidx++){
        var amt = actions[aidx]['Amount'];
        if(amt == null)
            continue;
        amt = parseFloat(amt);
        seat = findSeatNumber(actions[aidx]['Player'], hand);
        committed[seat] += amt;
    }
}


function setHeroCards(hand) {
    var hero = hand['PokerHand']['Hero'];
    var seat = findSeatNumber(hero, hand);
    var hc = hand['PokerHand']['HoleCards'];
    setHoleCards(hc, seat);
}

function setOpponentCards(hand){
    results = hand['PokerHand']['Results'];
    if (results == null)
        return;
    for (var i = 0; i < results.length; i++){
        hc = results[i]['HoleCards'];
        if (hc == null)
            continue;
        setHoleCards(hc, findSeatNumber(results[i]['Player'], hand));
    }
}

function findSeatNumber(player, hand){
    seats = hand['PokerHand']['Players']
    for (var i = 0; i < seats.length; i++){
        if (seats[i]['Name'] == player)
            return parseInt(seats[i]['Seat'])
    }
    return -1;
}

function setHoleCards(hc, seat){
    gui_set_player_cards(hc[0], hc[1], seat);
}

function setBoard(hand){
    var round = testhand['PokerHand']['Rounds'].length - 1;
    if (round >= 1){
        setFlop(testhand['PokerHand']['Rounds'][1]['CommunityCards']);
        if(round >= 2){
            setTurn(testhand['PokerHand']['Rounds'][2]['CommunityCards']);
            if(round >= 3){
                setRiver(testhand['PokerHand']['Rounds'][3]['CommunityCards']);
            }
        }
    }
}

function setFlop(flop) {
  gui_lay_board_card(0, flop[0]);
  gui_lay_board_card(1, flop[1]);
  gui_lay_board_card(2, flop[2]);
}

function setTurn(turn) {
  gui_lay_board_card(3, turn);
}

function setRiver(river) {
  gui_lay_board_card(4, river);
}


//////////////////////////////////////////////////////

function setPots(hand){
    // TODO: Handle side pots on all-ins
    var curPot = 0.0;
    var totalPot = 0.0;
    blinds = hand['PokerHand']['Blinds'];
    round = hand['PokerHand']['Rounds'].length - 1;
    for(var i = 0; i < blinds.length; i++){
        var amt = blinds[i]['Amount'];
        if (amt == null)
            continue;
        amt = parseFloat(amt);
        totalPot += amt;
        if (round > 0)
            curPot += amt;
    }

    var rounds = hand['PokerHand']['Rounds'];
    for (var i = 0; i < rounds.length; i++){
        actions = rounds[i]['Actions'];
        for (var j = 0; j < actions.length; j++){
            var amt = actions[j]['Amount'];
            if (amt == null)
                continue;
            amt = parseFloat(amt);
            totalPot += amt;
            if (round > i)
                curPot += amt;
        }
    }
    gui_write_basic_general(totalPot);
}




function foldClicked(){

}

function callClicked(){

}

function raiseClicked(){

}

function resetTable(){

}

function init() {
  updateGameState();
}
