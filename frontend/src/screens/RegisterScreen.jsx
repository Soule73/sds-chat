import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Card, Input, Spinner } from '@material-tailwind/react';
import { UserPlusIcon } from "@heroicons/react/24/solid";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { theme } = localStorage;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error, { theme: theme === "dark" ? "dark" : "light" });
      }
    }
  };
  return (
    <div className={`bg-[url(./img/background.png)] dark:bg-[url(./img/GalaxyBackground.png)] bg-no-repeat bg-cover min-h-screen absolute w-full justify-center px-2 items-center flex top-0`}>

      <Card className=' bg-slate-50/80 w-max h-max md:min-w-[30rem] flex flex-col  justify-between min-h-[60vh] min-w-full max-w-xl dark:text-slate-100 backdrop-blur-3xl dark:bg-slate-800/5 p-5'>
        <h1 className='text-3xl md:text-5xl text-center w-full'>Inscription</h1>

        <div className=' flex justify-center items-center py-2 '>

          <UserPlusIcon className=' w-32 h-32 dark:fill-slate-100' />
        </div>
        <form onSubmit={submitHandler}>
          <div className='my-2'>
            <Input
              label='Nom'
              type='name'
              color="orange"
              className=' dark:text-slate-100'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </div>

          <div className='my-2'>
            <Input
              label='E-mail'
              type='email'
              color="orange"
              className=' dark:text-slate-100'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className='my-2'>
            <Input
              label='Mot de passe'
              type='password'
              color="orange"
              className=' dark:text-slate-100'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          <div className='my-2'>
            <Input
              label='Confirmer le mot de passe'
              type='password'
              color="orange"
              className=' 0dark:text-slate-1000'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
          </div>
          <Button color="orange"
            type='submit' className='flex gap-2 items-center'>

            {isLoading ? "En cours..." : "Inscription"}
            {isLoading && <Spinner />}
          </Button>
        </form>

        <div className=' pt-3 text-end'>
          Déjà inscrit(e) ? <Link to={`/login`} className=' text-orange-900'>Se connecter</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterScreen;
