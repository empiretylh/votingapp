import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonItem from '../components/PersonItem';
import {
  LoadingContext,
  CodeContext,
  DataContext,
  NameIMEIContext,
} from '../context/AppContext';

const Queen = () => {
  const navigate = useNavigate();
  const { voteQueen, unVoteQueen } = useContext(LoadingContext);
  const { vCode } = useContext(CodeContext);
  const { nameIMEI } = useContext(NameIMEIContext);
  const { votedQueen, query } = useContext(DataContext);

  const handleRefresh = () => {
    if (query?.refetch) query.refetch();
  };

  const queenVotedId = useMemo(() => {
    if (votedQueen?.data) {
      return votedQueen.data !== 0 && votedQueen.data.selection;
    }
    return 0;
  }, [votedQueen]);

  const data = useMemo(() => {
    if (query?.data) {
      const selQueen = query.data.sel_queen || [];
      
      const queenWithVote = selQueen.map((item) => ({
        ...item,
        vote: item.id === queenVotedId,
      }));

      // Sort to show voted items first
      queenWithVote.sort((a, b) => {
        if (a.vote === b.vote) return 0;
        return a.vote ? -1 : 1;
      });

      return queenWithVote;
    }
    return [];
  }, [query, queenVotedId]);

  const openProfile = (personData) => {
    navigate('/profile', { state: { data: personData } });
  };

  const vote = (personData) => {
    voteQueen({
      votingcode: vCode,
      queenid: personData.id,
      deviceid: nameIMEI.device_id,
    });
  };

  const unVote = () => {
    unVoteQueen({
      votingcode: vCode,
      deviceid: nameIMEI.device_id,
    });
  };

  return (
    <div
      className="queen-screen"
      style={{ backgroundImage: 'url(/assets/girlbg.png)' }}
    >
      <div className="category-header">
        <img
          src="/assets/queen_crown.png"
          alt="crown"
          className="category-icon"
          onClick={handleRefresh}
          style={{ cursor: 'pointer' }}
        />
        <h1 className="category-title">Queen Selection</h1>
      </div>

      <div className="content-area">
        <div className="scrollable-content">
          {query?.isFetching ? (
            <div className="loading-screen">
              <div className="loading-spinner" />
            </div>
          ) : (
            data.map((item, index) => (
              <PersonItem
                key={index}
                data={item}
                onOpenProfile={openProfile}
                onVote={vote}
                onUnVote={unVote}
                votedId={queenVotedId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Queen;
