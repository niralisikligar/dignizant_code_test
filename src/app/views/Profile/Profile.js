import React from "react";
import { SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import {
  // getAllCompany,
  // getAllUsers,
  getByServiceId,
  addNewService,
  updateService,
  getAllService,
} from "../../redux/actions/service/index";


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const SubmitButton = styled("div")({
  marginTop: "-3.25rem !important",
});

const CardTitle = styled("div")(() => ({
  fontSize: "1rem",
  fontWeight: "400",
  textTransform: "capitalize",
  marginBottom: "16px",
}));



const schema = yup.object().shape({
  name: yup.string().required("field is required"),
  email: yup.string()
  .email("Invalid Email address")
  .required("Email is required!"),
  
});

const ServiceForm = () => {
  const { state } = useLocation();
console.log("state",state);


  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name:"",
      email:  "",
    },

    resolver: yupResolver(schema),
  });
  const { reset, control, watch, formState, handleSubmit, setValue } = methods;
  const { errors } = formState;

  const form = watch();

  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();

  const onSubmit = async () => {

  };

  return (
    <Container>
      <SimpleCard title="Update Profile">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubmitButton className="flex mx-2 float-end">
            <Button
              className="m-2 rounded-pill"
              variant="outlined"
              color="primary"
              onClick={() => navigate("/service")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="rounded-pill"
              style={{ background: "#003B6E" }}
              // color="secondary"
              type="submit"
            >
              Save
            </Button>
          </SubmitButton>
          <div className="d-flex flex-column">
     

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[field.name]}
                  helperText={errors?.["name"]?.message}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  sx={{ m: 1, width: 300 }}
                />
              )}
            />
                    <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                
                      type="text"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      label="Email"
                      sx={{ m: 1, width: 300 }}
                  
                    />
                  )}
                />

          </div>

        </form>
      </SimpleCard>
    </Container>
  );
};

export default ServiceForm;
