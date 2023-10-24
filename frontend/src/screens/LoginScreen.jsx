import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Card, Input, Spinner } from '@material-tailwind/react';
import { UserCircleIcon } from "@heroicons/react/24/solid";

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
    <div className={`bg-[url(./img/background.png)] dark:bg-[url(./img/GalaxyBackground.png)] bg-no-repeat bg-cover min-h-screen absolute w-full justify-center px-2 items-center flex top-0`}>

      <Card className=' bg-slate-50/80 w-max h-max md:min-w-[30rem] flex flex-col  justify-between min-h-[40vh] min-w-full max-w-xl dark:text-slate-100 backdrop-blur-3xl dark:bg-slate-800/5 p-5'>
        <h1 className=' text-3xl md:text-5xl text-center w-full'>Se connecter</h1>

        <div className=' flex justify-center items-center py-2 '>
          <UserCircleIcon className=' w-32 h-32 dark:fill-slate-100' />
        </div>

        <form onSubmit={submitHandler}>
          <div className='my-2' >
            <Input
              label='E-mail'
              type='email'
              color="orange"
              value={email}
              className=' dark:text-slate-100'
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className='my-2'>
            <Input
              label='Mot de passe'
              type='password'
              color="orange"
              className='dark:text-slate-100'

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>

          <Button color="orange"
            type='submit' className='flex gap-2 items-center'>

            {isLoading ? "En cours..." : "Se connecter"}
            {isLoading && <Spinner />}
          </Button>
        </form>
        <div className=' pt-3 text-end'>
          Pas de compte ? <Link to='/register' className=' text-orange-900'>{"S'inscrire"}</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
