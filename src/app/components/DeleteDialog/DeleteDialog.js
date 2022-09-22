import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const DeleteDialog = ({ handleClosePopup, deletePopUp, onClickDelete }) => {
  const location = useLocation();

  return (
    <div>
      <Dialog
        open={deletePopUp}
        onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ background: "#1976d2" }}
        ></DialogTitle>
        <DialogContent style={{ width: "370px", height: "100px" }}>
          <DialogContentText
            className="d-flex align-items-center justify-content-center"
            id="alert-dialog-description"
            style={{ color: "black", fontSize: "16px", marginTop: "20px" }}
          >
            {location.pathname === "/service" && (
              <span>Are you sure you want to delete Service?</span>
            )}
            {location.pathname === "/user" && (
              <span>Are you sure you want to delete User?</span>
            )}
            {location.pathname === "/company" && (
              <span>Are you sure you want to delete Company?</span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex align-items-center justify-content-center">
          <Button variant="outlined" onClick={handleClosePopup}>
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onClickDelete();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
DeleteDialog.propTypes = {
  handleClosePopup: PropTypes.func,
  deletePopUp: PropTypes.bool,
  onClickDelete: PropTypes.func,
};
DeleteDialog.defaultProps = {
  handleClosePopup: () => {},
  deletePopUp: false,
  onClickDelete: () => {},
};

export default DeleteDialog;
