import React from "react";
import { Drawer, Avatar, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { signOut } from "firebase/auth";

import { CryptoState } from "../../CryptoContext";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../coinsTable/CoinsTable";

import "./userSidebar.scss";
import { doc, setDoc } from "firebase/firestore";
import Footer from "../footer/Footer";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logged Out Successfully!",
    });

    toggleDrawer();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
            className="avatar"
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className="drawer"
          >
            <div className="drawer-container">
              <div className="profile">
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                  className="sidebar-avatar"
                />
                <span className="sidebar-name">
                  {user.displayName || user.email}
                </span>
                <div className="watchlist">
                  <span style={{ textShadow: "0 0 5px black" }}>WatchList</span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className="coin">
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              fontSize="small"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>
              <Button variant="contained" onClick={logOut} className="logout">
                Log Out
              </Button>
            </div>
            <Footer />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
