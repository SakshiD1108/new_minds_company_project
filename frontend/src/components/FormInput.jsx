import { useState } from 'react';

const FormInput = props => {
  const [focused, setFocused] = useState(false);
  const { label, id, onChange, errorMessage, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className='w-full text-left'>
      {/* <label className='text-gray-500 text-sm'>{label}</label> */}
      <input
        onBlur={handleFocus}
        onFocus={() => inputProps.name === 'password' && setFocused(true)}
        focused={focused.toString()}
        onChange={onChange}
        {...inputProps}
        className='w-full bg-gray-100 text-xs px-4 py-3 rounded-md mb-3 mt-2 outline-none'
      />
      <span className='text-red-500 hidden text-xs leading-none'>
        {errorMessage}
      </span>
    </div>
  );
};

export default FormInput;
