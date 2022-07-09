import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { followCoin, unfollowCoin } from '../../Redux/coinFollowSlice';

interface IconFollowInterFace {
  state: boolean;
  title?: string;
  idCoin: string;
}

function IconFllow({ state, title = 'Follow', idCoin }: IconFollowInterFace) {
  // State
  const [stateIcon, setState] = useState(() => state);
  const dispatch = useDispatch();

  const OnAddFollowCoin = (idCoin: string) => {
    if (stateIcon) {
      // Xoá coin trong mảng FortFolio
      dispatch(unfollowCoin(idCoin));
      setState((prev) => !prev);
    } else {
      // Thêm coin vào mảng FortFolio
      dispatch(followCoin(idCoin));
      setState((prev) => !prev);
    }
  };
  return (
    <span onClick={() => OnAddFollowCoin(idCoin)}>
      {stateIcon ? (
        <img
          src="https://img.icons8.com/tiny-color/16/000000/experimental-star-tiny-color.png"
          alt="star"
          style={{ transform: 'translateY(-2px)' }}
        />
      ) : (
        <img
          src="https://img.icons8.com/plumpy/24/000000/star--v1.png"
          alt="star"
          style={{ transform: 'translateY(-2px)', width: '16px' }}
        />
      )}
      {title}
    </span>
  );
}

export default IconFllow;
