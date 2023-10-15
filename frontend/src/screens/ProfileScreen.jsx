import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Button, Card, Input } from '@material-tailwind/react';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Card className='dark:text-slate-300 dark:bg-slate-800  max-w-xl mx-auto p-5 mt-24'>
      <h1>Mettre à le profile</h1>

      <form onSubmit={submitHandler}>
        <div className='my-2' >
          <Input
            label='Name'
            type='name'
            color='blue'
            className=' dark:text-slate-300'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div className='my-2'>
          <Input
            type='email'
            label='email'
            color='blue'
            className=' dark:text-slate-300'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </div>
        <div className='my-2' >
          <Input
            label='Password'
            type='password'
            color='blue'
            className=' dark:text-slate-300'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>

        <div className='my-2' >
          <Input
            label='Confirm Password'
            type='password'
            color='blue'
            className=' dark:text-slate-300'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
        </div>

        <Button color='blue'
          type='submit' className='mt-3'>
          Enrégistrer
        </Button>

        {isLoading && <Loader />}
      </form>
    </Card>
  );
};

export default ProfileScreen;
