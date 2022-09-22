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
  description: yup.string().required("field is required"),
  mrp: yup.string().required("field is required"),
  selling: yup.string().required("field is required"),
  // image: yup.string().required("field is required"),
});

const ServiceForm = () => {
  const { state } = useLocation();
console.log("state",state);


  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: (state && state.name) || "",
      description: (state && state.description) || "",
      mrp: (state && state.mrp) || "",
      selling: (state && state.selling) || "",
      // image: (state && state.image) || "",

    },

    resolver: yupResolver(schema),
  });
  const { reset, control, watch, formState, handleSubmit, setValue } = methods;
  const { errors } = formState;

  const form = watch();

  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllService(  ));
  }, []);

  

  const { id } = routeParams;

  console.log("id",id);
  useEffect(() => {
    dispatch(getByServiceId( { id: state.id}))
  }, [])

  const onSubmit = async (data) => {
    if (id === "new") {
      console.log("data----=========Addd--->",data);
      await dispatch(addNewService(data));
      navigate("/service");
    } else {
      await dispatch(updateService( { id: state.id, data}));
      navigate("/service");
    }
  };

  return (
    <Container>
      <SimpleCard title={id === "new" ? "Add Product" : "Update Product"}>
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
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[field.name]}
                  helperText={errors?.["description"]?.message}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  sx={{ m: 1, width: 300 }}
                />
              )}
            />

<Controller
              name="mrp"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[field.name]}
                  helperText={errors?.["mrp"]?.message}
                  id="outlined-basic"
                  label="Mrp"
                  variant="outlined"
                  sx={{ m: 1, width: 300 }}
                />
              )}
            />

<Controller
              name="selling"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[field.name]}
                  helperText={errors?.["selling"]?.message}
                  id="outlined-basic"
                  label="Selling"
                  variant="outlined"
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
