import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Card, Input, Spinner } from '@material-tailwind/react';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { theme } = localStorage;
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error, { theme: theme === "dark" ? "dark" : "light" });
    }
  };

  return (
    <div className={`bg-[url(./img/background.png)] dark:bg-[url(./img/GalaxyBackground.png)] bg-no-repeat bg-cover min-h-screen absolute w-full justify-center items-center flex top-0`}>

      <Card className=' w-max h-max md:min-w-[30rem] min-w-full max-w-xl dark:bg-slate-800 dark:text-slate-300 p-5'>
        <h1>Se connecter</h1>

        <form onSubmit={submitHandler}>
          <div className='my-2' >
            <Input
              label='E-mail'
              type='email'
              color='blue'
              value={email}
              className='dark:text-slate-300'
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className='my-2'>
            <Input
              label='Mot de passe'
              type='password'
              color='blue'
              className='dark:text-slate-300'

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>

          <Button color='blue'
            type='submit' className='flex gap-2 items-center'>

            {isLoading ? "En cours..." : "Se connecter"}
            {isLoading && <Spinner />}
          </Button>
        </form>
        <div className='py-3'>
          <div>
            Pas de compte ? <Link to='/register' className=' text-blue-600'>{"S'inscrire"}</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
