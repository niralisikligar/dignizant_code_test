import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Box, styled } from '@mui/material';
import { useCallback } from "react";
import useAuth from "app/hooks/useAuth";

import { useDropzone } from "react-dropzone";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import styleds from "styled-components";
import * as Yup from "yup";

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const StyledDropZone = styleds.div`
  height: 85px;
  width: 100%;
  border: 0.5px dotted grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JWTRegister = styled(JustifyBox)(() => ({
  // background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

const defaultValues = {
  name : "",
  email : "",
  image : "",
  password : "",
  password_confirmation : "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("field is required"),
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
    password_confirmation: Yup.string()
    .min(6, 'Password is required!')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { regi } = useAuth();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    // setValue,
    formState,
    handleSubmit,
    register,
    // reset,
    // trigger,
    // setError,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
  }, []);
  // drop zone for upload file
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // dispatch(handleSignIn(values));
      await regi(values.name,values.email, values.password,values.password,values.password_confirmation);

      // navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };



  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
        <div className="p-4">
            <h3 className='align-item-center'>Register</h3>      
          </div>

          <Grid item sm={12} xs={12}>
          <ContentBox>
              <form onSubmit={handleSubmit(onSubmit)}>

              <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="text"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      variant="outlined"
                      label="Name"
                      sx={{ mb: 3 }}
                      required
                    />
                  )}
                />


                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="text"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      label="Email"
                      sx={{ mb: 3 }}
                      required
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      sx={{ mb: 1.5 }}
                      InputProps={{
                        // className: 'pr-2',
                        type: showPassword ? "text" : "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              size="large"
                            >
                              <Icon className="text-15" color="action">
                                {showPassword ? "visibility" : "visibility_off"}
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                      <Controller
                  name="password_confirmation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="password_confirmation"
                      type="password"
                      error={!!errors.password_confirmation}
                      helperText={errors?.password_confirmation?.message}
                      variant="outlined"
                      sx={{ mb: 1.5 }}
                      InputProps={{
                        // className: 'pr-2',
                        type: showPassword ? "text" : "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              size="large"
                            >
                              <Icon className="text-15" color="action">
                                {showPassword ? "visibility" : "visibility_off"}
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                {/* <input  type="file" id ="fileupload" ref={register} style={{display:'none'}} /> */}
                <label htmlFor="fileupload" style={{cursor : "pointer"}}> Select Image  </label>
                <StyledDropZone {...getRootProps({ refKey: "innerRef" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </StyledDropZone>

                <FlexBox justifyContent="end">
                  <NavLink
                    to="/session/signin"
                    style={{ color: " #00B3FF", textDecoration: "none" }}
                  >
                    If you Have a Login?
                  </NavLink>
                </FlexBox>

                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={loading}
                  variant="contained"
                  sx={{ my: 2 }}
                  fullWidth
                  // style={{ backgroundColor: "#003B6E" }}
                >
                  Register
                </LoadingButton>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
