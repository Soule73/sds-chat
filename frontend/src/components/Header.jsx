import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { UserIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className=" fixed w-full bg-white top-0 z-30 shadow-sm flex justify-between flex-wrap py-1 px-2 md:px-5 ">
      <div>
        <NavLink className=" text-2xl italic no-underline text-black font-bold " to="/">
          SDS Social
        </NavLink>
      </div>

      <div className=" flex">
        <Menu>
          <MenuHandler>
            <IconButton variant="outlined" className="  rounded-full" >
              <UserIcon className=" w-6 h-6 " />
            </IconButton>
          </MenuHandler>
          {userInfo ?
            <MenuList className=" px-1">
              <MenuItem className=" text-sm">
                <Link to={'/profile'}>
                  Profile({userInfo.name})
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Se déconnecter</MenuItem>
            </MenuList> :
            <MenuList>
              <MenuItem>
                <Link to='/login'>
                  Se connecter
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/register'>
                  S&apos;inscrire
                </Link>
              </MenuItem>
            </MenuList>
          }
        </Menu>
      </div>
    </nav>
  );
};

export default Header;
