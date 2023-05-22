import { Circles } from 'react-loader-spinner';
import { Wrap } from './Loader.styled';

export const Loader = () => {
    return (
        <Wrap>
            <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
        </Wrap>
    )
}