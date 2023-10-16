import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Card, Input, Spinner } from '@material-tailwind/react';

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
        console.log(err?.data?.message || err.error)
        toast.error(err?.data?.message || err.error, { theme: theme === "dark" ? "dark" : "light" });
      }
    }
  };
  return (
    <div className={`bg-[url(./img/background.png)] dark:bg-[url(./img/GalaxyBackground.png)] bg-no-repeat bg-cover min-h-screen absolute w-full justify-center items-center flex top-0`}>

      <Card className=' dark:text-slate-300 dark:bg-slate-800 max-w-xl min-w-full md:min-w-[30rem] p-5 mt-24'>
        <h1>Inscription</h1>
        <form onSubmit={submitHandler}>
          <div className='my-2'>
            <Input
              label='Nom'
              type='name'
              color='blue'
              className=' dark:text-slate-300'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </div>

          <div className='my-2'>
            <Input
              label='E-mail'
              type='email'
              color='blue'
              className=' dark:text-slate-300'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className='my-2'>
            <Input
              label='Mot de passe'
              type='password'
              color='blue'
              className=' dark:text-slate-300'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          <div className='my-2'>
            <Input
              label='Confirmer le mot de passe'
              type='password'
              color='blue'
              className=' dark:text-slate-300'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
          </div>
          <Button color='blue'
            type='submit' className='flex gap-2 items-center'>

            {isLoading ? "En cours..." : "Inscription"}
            {isLoading && <Spinner />}
          </Button>
        </form>

        <div className='py-3'>
          <div>
            Déjà inscrit(e) ? <Link to={`/login`} className=' text-blue-600'>Se connecter</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterScreen;
