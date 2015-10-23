//(function () {
/* 
 *iNote - A simple noteapp for capturing your thoughts on the go
 *written by Temitope Fowotade
 */


 var saveNote = document.getElementById("save_note");
 var oldNoteArea = document.getElementById("old_note_area");
 
 
 
	function createNote () {
	  console.log("note created");
	  function createNoteItem () {
		  var noteItem = document.createElement("li");
		  var label = document.createElement("label");
		  var edit = document.createElement("button");
		  var del = document.createElement("button");
		  
		  //create noteItem (list item) with label, button.edit, button.trash
		  noteItem.appendChild(label);
		  noteItem.appendChild(edit);
		  noteItem.appendChild(del);
		  return noteItem;
		   
	  }
	  
	  //append noteItem = oldNoteArea's first child
	  oldNoteArea.appendChild(noteItem);
	}
    
	  
	  

	function editNote () {
	  
	}
      //onclick save, old note is updated.
	  
 
	function searchNotes () {
	  
	}

	
	function trashNotes () {
	  
	}
      //onclick trash, old note moves to the trash can.
	

	function emptyTrash () {
	  
	}
      //onclick empty trash, trash notes are deleted permanently.
	  
	  

    function restoreNote () {
	  
    }
      //onclick recover, trash note moves back to old notes.


	  
	saveNote.onclick = createNote;  
	
 
//}())
