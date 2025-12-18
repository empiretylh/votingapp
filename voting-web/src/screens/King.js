import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonItem from '../components/PersonItem';
import {
  LoadingContext,
  CodeContext,
  DataContext,
  NameIMEIContext,
} from '../context/AppContext';

const King = () => {
  const navigate = useNavigate();
  const { voteKing, unVoteKing } = useContext(LoadingContext);
  const { vCode } = useContext(CodeContext);
  const { nameIMEI } = useContext(NameIMEIContext);
  const { votedKing, query } = useContext(DataContext);

  const handleRefresh = () => {
    if (query?.refetch) query.refetch();
  };

  const kingVotedId = useMemo(() => {
    if (votedKing?.data) {
      return votedKing.data !== 0 && votedKing.data.selection;
    }
    return 0;
  }, [votedKing]);

  const data = useMemo(() => {
    if (query?.data) {
      const selKing = query.data.sel_king || [];
      
      const kingWithVote = selKing.map((item) => ({
        ...item,
        vote: item.id === kingVotedId,
      }));

      // Sort to show voted items first
      kingWithVote.sort((a, b) => {
        if (a.vote === b.vote) return 0;
        return a.vote ? -1 : 1;
      });

      return kingWithVote;
    }
    return [];
  }, [query, kingVotedId]);

  const openProfile = (personData) => {
    navigate('/profile', { state: { data: personData } });
  };

  const vote = (personData) => {
    voteKing({
      votingcode: vCode,
      kingid: personData.id,
      deviceid: nameIMEI.device_id,
    });
  };

  const unVote = () => {
    unVoteKing({
      votingcode: vCode,
      deviceid: nameIMEI.device_id,
    });
  };

  return (
    <div
      className="king-screen"
      style={{ backgroundImage: 'url(/assets/boybg.png)' }}
    >
      <div className="category-header">
        <img
          src="/assets/crown.png"
          alt="crown"
          className="category-icon"
          onClick={handleRefresh}
          style={{ cursor: 'pointer' }}
        />
        <h1 className="category-title">King Selection</h1>
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
                votedId={kingVotedId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default King;
