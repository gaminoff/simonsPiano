
// Note, this is running after the init
function runTests() {
    console.log('Running the Tests');
    
   testInit();
    
   testAddRandomNote()
    
    console.log('**** Testing the renderNotes *****');
    
    renderNotes(NOTES);
     var elPiano = document.querySelector('.piano');
     console.assert(elPiano.childNodes.length === NOTES.length, 'Should render child elements by NOTES.length');
    
}

function testInit() {
    console.log('**** Testing the init *****');
    console.assert(gState.seqNoteIndexes.length === 1, 'Should have one note in the seq');
    console.assert(gState.isUserTurn === false, 'Should set the computer as first turn');
    
}

function testAddRandomNote() {
    console.log('**** Testing the addRandomNote *****');
    addRandomNote();
    console.assert(gState.seqNoteIndexes.length === 2 , 'Should add a random note to seq');
}