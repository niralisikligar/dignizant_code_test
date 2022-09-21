import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

const DeleteDialog = ({ handleClosePopup, deletePopUp, deleteUserData }) => (
  <div>
    <Dialog
      open={deletePopUp}
      onClose={handleClosePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will delete this record permanently.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="flex justify-between">
        <Button onClick={handleClosePopup}>No</Button>
        <Button onClick={deleteUserData} autoFocus>
          Yes, Delete it
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
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
