/* eslint-disable react/prop-types */

const FormContainer = ({ children }) => {
  return (
    <div>
      <div className='justify-content-md-center mt-5'>
        <div className='card p-5'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
