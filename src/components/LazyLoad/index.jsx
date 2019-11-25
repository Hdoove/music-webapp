import Loadable from 'react-loadable';
import Loading from './LoadingComponent';

export default function LazyLoad(loader, opts) {
  return Loadable(
    Object.assign(
      {
        loader,
        loading: Loading
      },
      opts
    )
  );
}
