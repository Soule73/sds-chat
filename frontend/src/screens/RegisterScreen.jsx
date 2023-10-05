import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Card, Input } from '@material-tailwind/react';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

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
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Card className=' max-w-xl mx-auto p-5 mt-24'>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div className='my-2'>
          <Input
            label='Name'
            type='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>

        <div className='my-2'>
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
        <div className='my-2'>
          <Input
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
        </div>

        <Button type='submit' className='mt-3'>
          Register
        </Button>

        {isLoading && <Loader />}
      </form>

      <div className='py-3'>
        <div>
          Already have an account? <Link to={`/login`} className=' text-blue-600'>Login</Link>
        </div>
      </div>
    </Card>
  );
};

export default RegisterScreen;
