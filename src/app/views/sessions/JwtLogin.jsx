import { LoadingButton } from "@mui/lab";
import { Card, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";

import useAuth from "app/hooks/useAuth";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import * as Yup from "yup";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "linear-gradient(180deg, #00B3FF 0%, #003B6E 100%)",
  minHeight: "100% !important",
  flexDirection: "column",
  textDecoration: "none",
  "& img": {
    width: "100%",
    height: "auto",
  },
  "& .card": {
    maxWidth: "360px",
    minHeight: "337.71px",
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

const Small = styled("div")(() => ({
  color: "#7D858D",
  fontSize: "13px",
  textAlign: "center",
}));

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const defaultValues = {
  email: "",
  password: "",
};

const JwtLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    // setValue,
    formState,
    handleSubmit,
    // reset,
    // trigger,
    // setError,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const { login } = useAuth();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // dispatch(handleSignIn(values));
      await login(values.email, values.password);

      // navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
   
      <Card className="card">
        <Grid container style={{ display: "contents" }}>
          <div className="p-4">
            <h3>Welcome Back</h3>
            <Small>Log in to your account</Small>
          </div>
          <Grid item sm={12} xs={12}>
            <ContentBox>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <FlexBox justifyContent="end">
                  <NavLink
                    to="/session/signup"
                    style={{ color: " #00B3FF", textDecoration: "none" }}
                  >
                    Don't Have a Login?
                  </NavLink>
                </FlexBox>

                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={loading}
                  variant="contained"
                  sx={{ my: 2 }}
                  fullWidth
                  style={{ backgroundColor: "#003B6E" }}
                >
                  Login
                </LoadingButton>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
