function clean (node) {
	for(var n = 0; n < node.childNodes.length; n++) {
		var child = node.childNodes[n];
		if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
			node.removeChild(child);
			n--;
		}
		else if (child.nodeType === 1) {
		  clean(child);
		}
	}
}

clean(document.body);



var ref = new Firebase("https://inoteapp.firebaseio.com");
var usersRef = new Firebase("https://inoteapp.firebaseio.com/users");
var auth = ref.getAuth();

var updateBtn = document.getElementById("update_note");
var titleNote = document.getElementById("title_area");
var contentNote = document.getElementById("content_area");
var welcomeUser = document.getElementById("welcome_username");



if( auth !== null ) {
	welcomeUsers();
}

function welcomeUsers() {
	var myUser = usersRef.child(auth.uid);
	myUser.once("value", function(snapshot) {
		var username = snapshot.val().username;
		welcomeUser.innerHTML = "Hello, " + username;
	});
}


function editNote () {
	var noteTitle = localStorage.getItem("title");
	var noteContent = localStorage.getItem("content");

	titleNote.value = noteTitle;
	contentNote.value = noteContent;
}
editNote();



function updateNote() {
	if (titleNote.value !== "" && contentNote.value !== "") {
		var title = titleNote.value;
		var content = contentNote.value;
		var liId = JSON.parse(localStorage.getItem("notekey"));


		var myUser = usersRef.child(auth.uid);
		var notesRef = myUser.child("notes");
		var notepath = notesRef.child(liId);
		notepath.set({
				title: title,
				content: content,
				noteid: liId
		},  function() {
          	console.log("Note updated successfully: ", auth.uid);
          	}
          );

    titleNote.value = "";
		contentNote.value = "";

		localStorage.removeItem("title");
		localStorage.removeItem("content");
		localStorage.removeItem("notekey");

		alert("note updated");
		location = "notepage.html";
	}
}

updateBtn.onclick = updateNote;


