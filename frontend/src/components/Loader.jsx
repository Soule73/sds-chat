import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <Spinner
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

export default Loader;
