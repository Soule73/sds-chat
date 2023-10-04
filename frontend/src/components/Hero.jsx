import { Button, Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='flex justify-center items-center w-full mt-16 '>
      <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        <h1 className='text-center mb-4'>MERN Authentication</h1>
        <p className='text-center mb-4'>
          This is a boilerplate for MERN authentication that stores a JWT in
          an HTTP-Only cookie. It also uses Redux Toolkit and the React
        </p>
        <div className='d-flex'>
          <Button color='blue' className='me-3'>
            <Link to='/login'>
              Sign In
            </Link>
          </Button>
          <Button color='gray' >
            <Link to='/register'>
              Register
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
