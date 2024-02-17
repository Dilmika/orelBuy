import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { isUserAuthenticated, userProfileAction } from '../../store/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../resources/routes-constants';
import { userApi, userApiProfile } from '../../utility/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultTheme = createTheme();

const SignIn: React.FC = () => {

    const dispatch = useDispatch();
    const [signInLoading, setSignInLoading] = useState(false);

    const navigate = useNavigate()

      const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
      });

      const formik = useFormik({
          initialValues: {
              email: '',
              password: '',
            },
            validationSchema: validationSchema,
            onSubmit: async (values : {email : string, password: string}) => {

              try {

                setSignInLoading(true)

                const {status, data} = await userApi.post('/login', {
                  email: values?.email, password: values?.password
                })

                if(status === 201){

                  localStorage.setItem('accessToken', data.access_token);
                  localStorage.setItem('refreshToken', data.refresh_token);
                  
                  const userData = await userApiProfile.get('/profile');

                  dispatch(isUserAuthenticated(true))
                  dispatch(userProfileAction({
                    avatar : userData?.data?.avatar,
                    email : userData?.data?.email,
                    role : userData?.data?.role,
                    name : userData?.data?.name,
                  }))
                  setSignInLoading(false)
                  navigate(ROUTES.HOMEPAGE_ROUTE)
              }
              } catch (error) {
                toast.error("Incorrect Login Credentials")
                setSignInLoading(false)
              }
            },
        });
        
    return (
      <div>
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h3" color={"red"}>
              OrelBuy
            </Typography>
            <Typography component="h1" variant="h6">
              Hello,Welcome to OrelBuy
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                margin="normal"
                required
                fullWidth
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={Boolean(formik?.errors?.email)}
                helperText={formik?.errors?.email as string}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password as string}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                loading={signInLoading}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
      </div>
    );
}

export default SignIn