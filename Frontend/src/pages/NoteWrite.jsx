// Import necessary modules
import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getNote } from '../actions/note.action';
import Navbar from '../components/Navbar';

// NoteWrite component
const NoteWrite = () => {
  // State variables to store notes and error
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch notes data from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Get username from localStorage
        const username = localStorage.getItem('username');
        if (!username) {
          setError('Username not found in localStorage');
          return;
        }
        // Fetch notes data
        const userNotes = await getNote(username);
        setNotes(userNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Error fetching notes');
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      {           }
      <Navbar style={styles.navbar} />
      
      <div style={styles.container}>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <div style={styles.notesContainer}>
            {notes.map((note) => (
              <Card key={note.id} style={styles.card}>
                <CardContent>
                  <Typography variant="h6" noWrap>{note.name}</Typography>
                  <Typography style={styles.noteText}>{note.notes}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  navbar: {
    paddingBottom: '1rem', 
  },
  container: {
    paddingTop: "5rem",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  notesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: "4rem",
  },
  card: {
    width: '300px',
    margin: '10px',
    padding: '10px',
    overflow: 'auto',
  },
  noteText: {
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
};

export default NoteWrite;
