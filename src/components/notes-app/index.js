

import React, { useState } from "react";
import "./index.css";

export default function NotesApp() {

  const [noteTitle, setNoteTitle] = useState('')
  const [noteStatus, setNoteStatus] = useState('')
  const [notesToShow, setNotesToShow] = useState("all")
  const [notes, setNotes] = useState([
    {id: 1,
      status:"completed",
      title:"its completed"},
      {id: 2,
        status:"active",
        title:"this is active"}
  ])
  // add a new note
  const addNote = () => {
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        title: noteTitle,
        status: noteStatus
      }
    ]);
  };
// handle form submit
  const onSubmit = e => {
    e.preventDefault();
    if (noteTitle === "") return;
    addNote();
    setNoteTitle('');
    setNoteStatus('')
  };

  // here we update the task we want to show
  const updateTodosToShow = show => {
    setNotesToShow(show)
    }
    // finally here we filter the task base on completed, active or alll of the task to show
    let notesToDisplay = []
		if (notesToShow === "all") {
			notesToDisplay = notes;
		} else if (notesToShow === "active") {
			notesToDisplay = notes.filter(item => item.status=='active');
		} else if (notesToShow === "completed") {
			notesToDisplay = notes.filter(item => item.status=='completed');			
		}
  console.log(notesToDisplay);
  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <form onSubmit={onSubmit}>
          <input data-testid="input-note-name" type="text" className="large mx-8"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <input data-testid="input-note-status" type="text" className="large mx-8"
            placeholder="Note Status"
            value={noteStatus}
            onChange={(e) => setNoteStatus(e.target.value)}
          />
          <button className="" data-testid="submit-button">Add Note</button>
        </form>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li className="tab-item slide-up-fade-in" data-testid="allButton" onClick={() => updateTodosToShow("all")}>All</li>
          <li className="tab-item slide-up-fade-in" data-testid="activeButton" onClick={() => updateTodosToShow("active")}>Active</li>
          <li className="tab-item slide-up-fade-in" data-testid="completedButton" onClick={() => updateTodosToShow("completed")}>Completed</li>
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">

            {notesToDisplay?.map(note => (
              <tr key={note.id}>
                <td >{note.title}</td>
                <td >{note.status}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

