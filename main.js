/**
* Created by George on 30/04/2017.
 * To disarm the bomb you have to cut some wires.
 These wires are either white, black, purple, red, green or orange.
 The rules for disarming are simple:
 If you cut a white cable you can't cut white or black cable.
 If you cut a red cable you have to cut a green one
 If you cut a black cable it is not allowed to cut a white, green or orange one
 If you cut a orange cable you should cut a red or black one
 If you cut a green one you have to cut a orange or white one
 If you cut a purple cable you can't cut a purple, green, orange or white cable
 If you have anything wrong in the wrong order, the bomb will explode.
 There can be multiple wires with the same colour and these instructions are for one wire at a time. Once you cut a wire you can forget about the previous ones.
*/

let rules = {
    "white": {
        next : {
            "disallowed" : ["white", "black"]
        }
    },
    "red": {
        next : {
            "allowed" : ["green"]
        }
    },
    "black": {
        next : {
            "disallowed" : ["white", "green", "orange"]
        }
    },
    "orange": {
        next : {
            "allowed" : ["red", "black"]
        }
    },
    "green": {
        next : {
            "allowed" : ["orange", "white"]
        }
    },
    "purple": {
        next : {
            "disallowed" : ["purple", "green", "orange", "white"]
        }
    }
}

function ctuDefuseTheBomb(sequense) {

    if(sequense == undefined) return false;

    let nextInOrder;
    let current;

    for (var i = 0; i < sequense.length; i++){

        let goodToGo = false;

        if(sequense[i+1] !== undefined) {
            nextInOrder = sequense[i+1];
        }else {
            return "Bomb Diffused";
        }

        current = sequense[i];

        let nextInOrderAllowed = rules[current].next["allowed"];
        let nextInOrderDisallowed = rules[current].next["disallowed"];

        if(nextInOrderAllowed !== undefined){
            for (var j=0; j < nextInOrderAllowed.length; j++) {
                if(nextInOrder == nextInOrderAllowed[j]){
                    goodToGo = true;
                }
            }

            if(goodToGo == false) return "Boom";
        }

        if(nextInOrderDisallowed !== undefined){
            for (var j=0; j < nextInOrderDisallowed.length; j++) {
                if(nextInOrder == nextInOrderDisallowed[j]){
                    return "Boom";
                }
            }
        }
    }
}

ctuDefuseTheBomb(["white", "red", "green", "white"]);
ctuDefuseTheBomb(["white", "orange", "green", "white"]);
