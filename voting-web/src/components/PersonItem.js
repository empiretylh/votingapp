import React, { useContext } from 'react';
import { API_URL } from '../api/database';
import { EndTimeContext } from '../context/AppContext';

const PersonItem = ({ data, onOpenProfile, onVote, onUnVote, votedId }) => {
  const { isTimeUp } = useContext(EndTimeContext);

  const handleVote = (e) => {
    e.stopPropagation();
    onVote(data);
  };

  const handleUnVote = (e) => {
    e.stopPropagation();
    onUnVote(data);
  };

  const handleOpenProfile = () => {
    onOpenProfile(data);
  };

  const imageUrl = data?.profileimage
    ? `${API_URL}${data.profileimage}`
    : '/assets/queen.png';

  return (
    <div className="person-item">
      <div className="person-content">
        <div className="person-left" onClick={handleOpenProfile}>
          <img
            src={imageUrl}
            alt={data?.name}
            className="person-image"
            onError={(e) => {
              e.target.src = '/assets/queen.png';
            }}
          />
          <div className="person-info">
            <div className="person-name-row">
              <span className="person-name">{data?.name}</span>
              <img
                src="/assets/tick-mark.png"
                alt="verified"
                className="tick-icon"
              />
            </div>
            <p className="person-year">{data?.year}</p>
            <p className="person-photos-link" onClick={handleOpenProfile}>
              See {data?.is_male ? 'His' : 'Her'} Photos &gt;
            </p>
          </div>
        </div>

        <div className="person-right">
          <img
            src={data?.is_male ? '/assets/crown.png' : '/assets/queen_crown.png'}
            alt="crown"
            className="crown-badge"
          />
          {!isTimeUp && (
            <>
              {!votedId ? (
                <button className="vote-button" onClick={handleVote}>
                  <span>Vote</span>
                </button>
              ) : (
                <>
                  {votedId === data.id && (
                    <button className="vote-button" onClick={handleUnVote}>
                      <span>Un-Vote</span>
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonItem;
