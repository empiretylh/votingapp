import React, { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Start from './screens/Start';
import Name from './screens/Name';
import Home from './screens/Home';
import King from './screens/King';
import Queen from './screens/Queen';
import Profile from './screens/Profile';
import Developer from './screens/Developer';
import BottomNav from './components/BottomNav';
import database from './api/database';
import { storage } from './utils/storage';
import {
  LoadingContext,
  CodeContext,
  NameIMEIContext,
  DataContext,
  EndTimeContext,
} from './context/AppContext';
import './App.css';

const AppContainer = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const [vCode, setVCodeState] = useState(null);
  const [nameIMEI, setNameIMEIState] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [endtime, setEndtime] = useState(null);
  const [endInterval, setEndInterval] = useState(900000);

  // Data states
  const [query, setQuery] = useState({ data: null, isFetching: false, refetch: () => {} });
  const [votedKing, setVotedKing] = useState({ data: null, isFetching: false, refetch: () => {} });
  const [votedQueen, setVotedQueen] = useState({ data: null, isFetching: false, refetch: () => {} });

  const [menu, setMenu] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // Load voting code and name from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const code = await storage.getItem('temp_code');
        const nameData = await storage.getItem('name_IMEI');
        
        if (code && code !== 'null') {
          setVCodeState(code);
        }
        
        if (nameData && nameData !== 'null') {
          setNameIMEIState(JSON.parse(nameData));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Fetch end time
  useEffect(() => {
    const fetchEndTime = async () => {
      if (!vCode) return;

      try {
        const response = await database.getEndTime(vCode);
        if (response?.data) {
          const nowdate = new Date().getTime();
          const endtimeValue = new Date(response.data).getTime();
          setEndtime(endtimeValue);

          if (endtimeValue) {
            const result = endtimeValue - nowdate;
            if (result <= 0) {
              setIsTimeUp(true);
              setShowTimeUpModal(true);
            } else {
              setEndInterval(result);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching end time:', error);
      }
    };

    fetchEndTime();
    const interval = setInterval(fetchEndTime, 10000);
    return () => clearInterval(interval);
  }, [vCode]);

  // Time up timer
  useEffect(() => {
    if (endInterval > 0 && !isTimeUp) {
      const timeup = setTimeout(() => {
        setIsTimeUp(true);
        setShowTimeUpModal(true);
      }, endInterval);

      return () => clearTimeout(timeup);
    }
  }, [endInterval, isTimeUp]);

  // Fetch voting data
  const fetchVotingData = async () => {
    if (!vCode) return;

    setQuery((prev) => ({ ...prev, isFetching: true }));
    try {
      const response = await database.getVoting(vCode);
      setQuery({
        data: response.data,
        isFetching: false,
        refetch: fetchVotingData,
      });
    } catch (error) {
      console.error('Error fetching voting data:', error);
      setQuery((prev) => ({ ...prev, isFetching: false }));
    }
  };

  // Fetch voted king
  const fetchVotedKing = async () => {
    if (!vCode || !nameIMEI) return;

    setVotedKing((prev) => ({ ...prev, isFetching: true }));
    try {
      const response = await database.getVotedKing(vCode, nameIMEI.device_id);
      setVotedKing({
        data: response.data,
        isFetching: false,
        refetch: fetchVotedKing,
      });
    } catch (error) {
      console.error('Error fetching voted king:', error);
      setVotedKing((prev) => ({ ...prev, isFetching: false }));
    }
  };

  // Fetch voted queen
  const fetchVotedQueen = async () => {
    if (!vCode || !nameIMEI) return;

    setVotedQueen((prev) => ({ ...prev, isFetching: true }));
    try {
      const response = await database.getVotedQueen(vCode, nameIMEI.device_id);
      setVotedQueen({
        data: response.data,
        isFetching: false,
        refetch: fetchVotedQueen,
      });
    } catch (error) {
      console.error('Error fetching voted queen:', error);
      setVotedQueen((prev) => ({ ...prev, isFetching: false }));
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (vCode) {
      fetchVotingData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vCode]);

  useEffect(() => {
    if (vCode && nameIMEI) {
      fetchVotedKing();
      fetchVotedQueen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vCode, nameIMEI]);

  // Vote functions
  const voteKing = async (data) => {
    setShowLoading(true);
    setIsVote(true);
    try {
      await database.voteKing(data);
      await fetchVotedKing();
    } catch (error) {
      console.error('Error voting king:', error);
    } finally {
      setShowLoading(false);
      setTimeout(() => setIsVote(false), 1000);
    }
  };

  const voteQueen = async (data) => {
    setShowLoading(true);
    setIsVote(true);
    try {
      await database.voteQueen(data);
      await fetchVotedQueen();
    } catch (error) {
      console.error('Error voting queen:', error);
    } finally {
      setShowLoading(false);
      setTimeout(() => setIsVote(false), 1000);
    }
  };

  const unVoteKing = async (data) => {
    setShowLoading(true);
    try {
      await database.uvk(data);
      await fetchVotedKing();
    } catch (error) {
      console.error('Error unvoting king:', error);
    } finally {
      setShowLoading(false);
    }
  };

  const unVoteQueen = async (data) => {
    setShowLoading(true);
    try {
      await database.uvq(data);
      await fetchVotedQueen();
    } catch (error) {
      console.error('Error unvoting queen:', error);
    } finally {
      setShowLoading(false);
    }
  };

  const setVCode = async (code) => {
    setVCodeState(code);
    await storage.setItem('temp_code', code);
  };

  const removeCode = async () => {
    setVCodeState(null);
    await storage.setItem('temp_code', null);
  };

  const setNameID = async (data) => {
    setNameIMEIState(data);
    await storage.setItem('name_IMEI', JSON.stringify(data));
  };

  const removeNameID = async () => {
    setNameIMEIState(null);
    await storage.setItem('name_IMEI', null);
  };

  const codeValue = useMemo(
    () => ({ vCode, setVCode, removeCode }),
    [vCode]
  );

  const nameIMEIValue = useMemo(
    () => ({ nameIMEI, setNameID, removeNameID, menu, setMenu }),
    [nameIMEI, menu]
  );

  const loadingValue = useMemo(
    () => ({
      showLoading,
      setShowLoading,
      isVote,
      setIsVote,
      voteQueen,
      voteKing,
      unVoteKing,
      unVoteQueen,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showLoading, isVote]
  );

  const endTimeValue = useMemo(
    () => ({ isTimeUp, setIsTimeUp, endInterval, endtime }),
    [isTimeUp, endInterval, endtime]
  );

  const dataValue = useMemo(
    () => ({ votedKing, votedQueen, query }),
    [votedKing, votedQueen, query]
  );

  return (
    <Router>
      <EndTimeContext.Provider value={endTimeValue}>
        <DataContext.Provider value={dataValue}>
          <NameIMEIContext.Provider value={nameIMEIValue}>
            <CodeContext.Provider value={codeValue}>
              <LoadingContext.Provider value={loadingValue}>
                <div className="app-container">
                  <Routes>
                    {vCode === null ? (
                      <Route path="*" element={<Start />} />
                    ) : nameIMEI === null ? (
                      <Route path="*" element={<Name />} />
                    ) : (
                      <>
                        <Route path="/main" element={<Home />} />
                        <Route path="/king" element={<King />} />
                        <Route path="/queen" element={<Queen />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/developer" element={<Developer />} />
                        <Route path="*" element={<Navigate to="/main" replace />} />
                      </>
                    )}
                  </Routes>

                  {/* Show bottom nav only when logged in */}
                  {vCode && nameIMEI && (
                    <BottomNav />
                  )}

                  {/* Time Up Modal */}
                  {showTimeUpModal && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h2 className="modal-title">VOTING TIME IS OVER.</h2>
                        <p className="modal-text">
                          You can't vote anymore. Thank you for your vote. Ask
                          your administrator for poll results.
                        </p>
                        <button
                          className="modal-button"
                          onClick={() => setShowTimeUpModal(false)}
                        >
                          <span>Close Now</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Menu Modal */}
                  {menu && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h2 className="modal-title" style={{ color: 'black' }}>
                          Voting
                        </h2>
                        <button
                          className="modal-button modal-button-blue"
                          onClick={() => {
                            removeCode();
                            removeNameID();
                            setMenu(false);
                          }}
                        >
                          <span>+ New Voting</span>
                        </button>
                        <button
                          className="modal-button"
                          onClick={() => setMenu(false)}
                        >
                          <span>x CLOSE</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Loading Overlay */}
                  {showLoading && (
                    <div className="loading-overlay">
                      <div className="loading-box">
                        {isVote ? (
                          <img
                            src="/assets/heart.png"
                            alt="heart"
                            className="heart-animation"
                          />
                        ) : (
                          <div className="loading-spinner" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </LoadingContext.Provider>
            </CodeContext.Provider>
          </NameIMEIContext.Provider>
        </DataContext.Provider>
      </EndTimeContext.Provider>
    </Router>
  );
};

export default AppContainer;
