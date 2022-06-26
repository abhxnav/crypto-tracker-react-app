import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: "1px solid turquoise",
      borderRadius: 5,
      padding: 10,
      display: "flex",
      justifyContent: "center",
      fontFamily: "Ubuntu",
      cursor: "pointer",
      backgroundColor: selected ? "turquoise" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "turquoise",
        color: "black",
      },
      width: "22%",
      margin: 5,
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
