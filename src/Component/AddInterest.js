import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  Button,
  styled,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Autocomplete,
} from "@mui/material";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addUser ,editUser} from "../Services/api";
import { Controller, useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const options = [
  { id: 1, name: "Angular" },
  { id: 2, name: "React Js" },
  { id: 3, name: "Vue Js" },
  { id: 4, name: "Flutter" },
  { id: 5, name: "Node Js" },
];

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const schema = yup.object().shape({
  fullname: yup.string().required("field is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  gender: yup
    .string()
    .required()
    .oneOf(["female", "male"], "Selecting the gender is required"),

  tags: yup.array("").min(1, "At least 1 interest required"),
});

const ServiceForm = () => {
  const { state } = useLocation();

  console.log("state--->", state);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: (state && state.fullname) || "",
      email: (state && state.email) || "",
      gender: (state && state.gender) || "",
      tags: (state && state.tags) || [],
    },

    resolver: yupResolver(schema),
  });

  const { reset, control, watch, formState, handleSubmit, setValue } = methods;
  const { errors } = formState;

  const form = watch();
  console.log("form", form.tags);

  useEffect(() => {
    const getSelectedValue = () => {
      let newValue = [];
      const found = options.filter((item) => item.id === form.tags);
      console.log("options", options);
      if (found) {
        console.log("found", found);
        console.log("newValue", newValue);
      }

      return newValue;
    };

    getSelectedValue();
  }, [options]);

  const getSelectedLabel = () => {
    let newValue = [];
    options?.forEach((item) => {
      const found = form.tags.find((selectedId) => selectedId === item.name);

      if (found) {
        newValue.push(item);
      }
    });
    return newValue;
  };

  const navigate = useNavigate();
  const routeParams = useParams();
  const { id } = routeParams;

  const onSubmit = async (user) => {
    if (id === "new") {
      await addUser(user);
      navigate("/");
    }else {
      await editUser(id , user);
      navigate("/");
    }

  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Typography variant="h4">
              {id === "new" ? "Add Interest" : "Update Interest"}
            </Typography>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[field.name]}
                  helperText={errors?.["fullname"]?.message}
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                  sx={{ m: 1, width: 500 }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[field.name]}
                  helperText={errors?.["email"]?.message}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  sx={{ m: 1, width: 500 }}
                />
              )}
            />
            <Controller
              className="mt-8 mb-16"
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl className="mt-8 mb-16 mx-14">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...field}
                  >
                    <FormControlLabel
                      value={"female"}
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value={"male"}
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={options}
                  getOptionLabel={(item) => item.name}
                  value={getSelectedLabel()}
                  onChange={(event, newValue) => {
                    console.log("newValue", newValue);
                    setValue(
                      "tags",
                      newValue.map((item) => item.name)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors["tags"]}
                      helperText={errors?.["tags"]?.message}
                      label="Interest"
                      variant="outlined"
                      sx={{ m: 1, width: 500 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />

            <div>
              <Button
                className="m-2 rounded-pill"
                variant="outlined"
                color="primary"
                onClick={() => navigate("/")}
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
            </div>
          </Container>
        </form>
      </FormProvider>
    </>
  );
};

export default ServiceForm;
