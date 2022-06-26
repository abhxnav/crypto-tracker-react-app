import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";

import "./coinsTable.scss";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className="coinsTable">
        <Typography variant="h4" className="coinsTable-title">
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Cryptocurrency...."
          variant="outlined"
          className="coinsTable-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper} className="coinsTable-container">
          {loading ? (
            <LinearProgress className="coinsTable-progress" />
          ) : (
            <Table className="coinsTable-table">
              <TableHead className="coinsTable-table-head">
                <TableRow className="coinsTable-table-row">
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                      className="coinsTable-table-cell"
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody className="coinsTable-table-body">
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className="coinsTable-table-row"
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="coinsTable-table-cell-coin"
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            className="crypto-img"
                          />
                          <div className="crypto-name">
                            <span className="symbol">{row.symbol}</span>
                            <span className="text">{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          className="pagination"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
