import { ClipLoader } from 'react-spinners';

const Loader = ({ color, size, ...otherProps }) => {
  return (
    <div {...otherProps}>
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
};

export default Loader;
