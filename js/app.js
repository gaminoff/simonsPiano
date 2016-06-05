// Tasks:
// playNote as reusable function

// Score
// BONUS:
// support mute 
// visual
// keep max score in localStorage

 

'use strict';
var NOTES;

var mute = false;
// This is my State:
var gState = {
    isUserTurn : false,
    seqNoteIndexes: [],
    currNoteIndexToClick: 0,
    score : 0
}

function init() {
    NOTES = createNotesModel(5);
    renderNotes(NOTES); 
    
 
    computerTurn();
    document.querySelector('#score').innerHTML = gState.score;
    upddateScore(gState);
}

function createNotesModel(size){
    var notes = [];
    
    for (var i = 0; i < size; i++) {
       var note = {sound : ''+(i+1)+'.wav'}; //, color: getRandomColor()};
       notes.push(note);
    }
    
    return notes;
}

function renderNotes(notes) {
    // mapping notes to html tags
    var strHtmls = notes.map(function(note, i){
        var strHtml =  '<div class="note" onclick="noteClicked(this)" data-note="'+i+'"' + 
                             'style="background:'+ note.color +'" data-sound="sound/'+(i+1)+'.wav"></div>';
                    if(i % 2 === 1 )         strHtml += '<div class="b" ></div>';
                     
        return strHtml;
    });
    
    
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}



function playSoundNote(elNote) {
    
    var sound = elNote.getAttribute('data-sound');
    var audioNote = new Audio(sound);
    if(!mute) audioNote.play();
   
}
function addRandomNote() {
    gState.seqNoteIndexes.push(getRandomIntInclusive(0,NOTES.length-1));
}

function playSeq() {
    
    var elNotes = document.querySelectorAll('.note');
    
    gState.seqNoteIndexes.forEach(function (seqNoteIndex, i) {
        
        setTimeout(function playNote() {
            elNotes[seqNoteIndex].classList.add('playing');
            playSoundNote(elNotes[seqNoteIndex]);           
            setTimeout(function donePlayingNote() {
           
                elNotes[seqNoteIndex].classList.remove('playing');
            }, 400);
            
            //console.log('Playing: ', NOTES[seqNoteIndex].sound);
        }, 800 * i);
        
    });
    
    setTimeout(function () {
        console.log('Done Playing Sequence!!');
        gState.isUserTurn = true;
    }, 1000 * gState.seqNoteIndexes.length);
   
}

function noteClicked(elNote) {
    
    if (!gState.isUserTurn) return;
    playSoundNote(elNote);
    
    elNote.classList.add('playing');        
    setTimeout(function donePlayingNote() {
        
            elNote.classList.remove('playing');
        }, 500);
 
    
    var noteIndex = +elNote.getAttribute('data-note');
   // console.log('noteIndex is: ', noteIndex);
    
    
    // User clicked the right note
    if (noteIndex === gState.seqNoteIndexes[gState.currNoteIndexToClick]) {
        console.log('User OK!');
        gState.currNoteIndexToClick++;
        
        if (gState.currNoteIndexToClick === gState.seqNoteIndexes.length) {
     
            computerTurn();
            upddateScore(gState);
        }
        
    } else {
        console.log('User Wrong!');
        gameover(gState);
    }
    
    console.log('Note', NOTES[noteIndex]);
   
    
}

function computerTurn() {
    
    setTimeout( function() {
        
     gState.isUserTurn = false;
     gState.currNoteIndexToClick  = 0;
     //alert('User Turn is Over');
     
     addRandomNote();
     playSeq();
    }, 1500);
}

function gameover(state) {
    
    var loseAudio =  new Audio('sound/lose.mp3');
    loseAudio.play();
    state.isUserTurn = false;
    state.seqNoteIndexes = [];
    state.currNoteIndexToClick = 0;
    state.score = 0;
    document.querySelector('#score').style.visibility =  'hidden';
    setTimeout(function() {
        computerTurn();
        
    }, 2000);
}

function upddateScore(state) {
    
    document.querySelector('#score').style.visibility =  'visible';
    state.score ++;
    document.querySelector('#score').innerHTML = state.score;
    
}
function turnSound(elSound) {
    
    if(elSound.getAttribute('data') === 'mute'){
        mute = true;
        elSound.setAttribute("data" , "song");
        elSound.innerHTML = 'song';
    }
    else    if(elSound.getAttribute('data') === 'song'){
                mute = false;
                elSound.setAttribute("data" , "mute");
                elSound.innerHTML = 'mute';
    }    
}