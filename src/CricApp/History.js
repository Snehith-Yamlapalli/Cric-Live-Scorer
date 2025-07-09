import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import { auth } from '../components/firebase';

export default function History() {
  const [matches, setMatches] = useState([]); // will hold { id, name }[]
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const dbRef = firebase.database().ref(userId);
    const handleValue = snapshot => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([matchId, matchObj]) => {
        const name = matchObj.INFO?.MatchBetween || matchId;
        return { id: matchId, name };
      });
      setMatches(list);
    };

    dbRef.on('value', handleValue);
    return () => dbRef.off('value', handleValue);
  }, [userId]);

  if (!userId) {
    return <div>Please sign in to view your match history.</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-3">Your Match History</h1>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul className="list-group">
          {matches.map(({ id, name }) => (
            <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
              <h4>{name}</h4>
              <Link to={`/livescoreCard/${id}`} className="btn btn-primary">
                Go to ScoreCard
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
