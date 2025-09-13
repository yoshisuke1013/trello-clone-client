import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";
import { listsAtom } from "../../modules/lists/list.state";
import { listRepository } from "../../modules/lists/list.repository";
import SortableBoard from "./SortableBoard";
import { Sidebar } from "./Sidebar";
import "./Home.css";

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const currentUser = useAtomValue(currentUserAtom);
  const setLists = useSetAtom(listsAtom);

  const fetchLists = async () => {
    const lists = await listRepository.find(currentUser!.boardId);
    setLists(lists);
  };

  useEffect(() => {
    fetchLists();
  }, [currentUser]);

  if (currentUser == null) return <Navigate to={"/signin"} />;

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <button className="apps-button" onClick={() => setShowSidebar(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
          </button>
          <div className="trello-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V5.82c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v12.36zm10.44-6.24c0 .795-.645 1.44-1.44 1.44H15c-.795 0-1.44-.645-1.44-1.44V5.82c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v6.12z" />
            </svg>
            Trello
          </div>
        </div>
      </header>
      <div className="board-header">
        <h1 className="board-title">マイボード</h1>
      </div>
      <SortableBoard />
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      {/* <CardModal /> */}
    </div>
  );
}

export default Home;
