import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonItem from '../components/PersonItem';
import {
  CodeContext,
  NameIMEIContext,
  LoadingContext,
  EndTimeContext,
  DataContext,
} from '../context/AppContext';
import database from '../api/database';

const Home = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const { vCode, removeCode } = useContext(CodeContext);
  const { nameIMEI, removeNameID, setMenu } = useContext(NameIMEIContext);
  const { voteQueen, voteKing, unVoteKing, unVoteQueen } =
    useContext(LoadingContext);
  const { votedKing, votedQueen, query } = useContext(DataContext);
  const { isTimeUp, endtime } = useContext(EndTimeContext);

  useEffect(() => {
    if (endtime && endtime > 0) {
      const timerId = setInterval(() => {
        const now = new Date().getTime();
        const tl = Math.floor((endtime - now) / 1000);
        if (tl > 0) {
          setTimeLeft(tl);
        } else {
          setTimeLeft(0);
        }
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [endtime]);

  // Check voting code validity
  useEffect(() => {
    const checkCode = async () => {
      try {
        const response = await database.checkCode(vCode);
        if (response.data !== 1) {
          removeCode();
          removeNameID();
        }
      } catch (error) {
        console.error('Error checking code:', error);
      }
    };

    if (vCode) {
      checkCode();
    }
  }, [vCode, removeCode, removeNameID]);

  const vote = (data) => {
    if (data.is_male) {
      voteKing({
        votingcode: vCode,
        kingid: data.id,
        deviceid: nameIMEI.device_id,
      });
    } else {
      voteQueen({
        votingcode: vCode,
        queenid: data.id,
        deviceid: nameIMEI.device_id,
      });
    }
  };

  const unVote = (data) => {
    if (data.is_male) {
      unVoteKing({
        votingcode: vCode,
        deviceid: nameIMEI.device_id,
      });
    } else {
      unVoteQueen({
        votingcode: vCode,
        deviceid: nameIMEI.device_id,
      });
    }
  };

  const kingVotedId = useMemo(() => {
    if (votedKing?.data) {
      return votedKing.data !== 0 && votedKing.data.selection;
    }
    return 0;
  }, [votedKing]);

  const queenVotedId = useMemo(() => {
    if (votedQueen?.data) {
      return votedQueen.data !== 0 && votedQueen.data.selection;
    }
    return 0;
  }, [votedQueen]);

  const data = useMemo(() => {
    if (query?.data) {
      const selKing = query.data.sel_king || [];
      const selQueen = query.data.sel_queen || [];

      const kingWithVote = selKing.map((item) => ({
        ...item,
        vote: item.id === kingVotedId,
      }));

      const queenWithVote = selQueen.map((item) => ({
        ...item,
        vote: item.id === queenVotedId,
      }));

      const all = [...kingWithVote, ...queenWithVote];

      // Sort to show voted items first
      all.sort((a, b) => (b.vote ? 1 : -1));

      // Filter by search text
      const filtered = all.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );

      return filtered;
    }
    return [];
  }, [query, kingVotedId, queenVotedId, searchText]);

  const openProfile = (personData) => {
    navigate('/profile', { state: { data: personData } });
  };

  const handleRefresh = () => {
    if (query?.refetch) query.refetch();
    if (votedKing?.refetch) votedKing.refetch();
    if (votedQueen?.refetch) votedQueen.refetch();
  };

  return (
    <div
      className="home-screen"
      style={{ backgroundImage: 'url(/assets/main.png)' }}
    >
      <div className="top-view">
        <img
          src="/assets/particle.gif"
          alt="particles"
          className="particle-bg"
        />
        <div className="top-view-header">
          <h1 className="logo-text">VOTING</h1>
          <img
            src="/assets/question.png"
            alt="menu"
            className="menu-icon"
            onClick={() => setMenu(true)}
          />
        </div>
        <div className="top-view-content">
          <img
            src="/assets/crown.png"
            alt="crown"
            className="crown-image"
          />
          <p className="app-title">Youth Choice Voting System</p>
          {isTimeUp ? (
            <>
              <p className="time-up-text">Voting time is over</p>
              <p className="developer-text">Developed By EMPIRE</p>
            </>
          ) : (
            <>
              <p className="developer-text">Developed By Thura Lin Htut</p>
              <p className="countdown-text">{timeLeft} s</p>
            </>
          )}
        </div>
      </div>

      <div className="content-area">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search With Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <img
            src="/assets/search.png"
            alt="search"
            className="search-icon"
            onClick={handleRefresh}
          />
        </div>

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
                votedId={item.is_male ? kingVotedId : queenVotedId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
