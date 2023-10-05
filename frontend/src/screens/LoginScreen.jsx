import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Button, Card, Input } from '@material-tailwind/react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card className=' max-w-xl mx-auto p-5 mt-24'>
      <h1>Sign In</h1>

      <form onSubmit={submitHandler}>
        <div className='my-2' >
          <Input
            label='Email Address'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </div>

        <div className='my-2'>
          <Input
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>

        <Button
          disabled={isLoading}
          type='submit'
          className='mt-3'
        >
          Sign In
        </Button>
      </form>

      {isLoading && <Loader />}

      <div className='py-3'>
        <div>
          New Customer? <Link to='/register' className=' text-blue-600'>Register</Link>
        </div>
      </div>
    </Card>
  );
};

export default LoginScreen;
