import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import noneProfileImage from './assets/profile.png';

const { persistAtom } = recoilPersist();

export const accountNameValue = atom({
  key: 'accountname',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const introValue = atom({
  key: 'intro',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const profileImgSrc = atom({
  key: 'profileImg',
  default: noneProfileImage,
  effects_UNSTABLE: [persistAtom],
});

export const isLogin = atom({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userNameValue = atom({
  key: 'username',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const positionValue = atom({
  key: 'position',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const yearValue = atom({
  key: 'year',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const genreValue = atom({
  key: 'genre',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userDataAtom = atom({
  key: 'userData',
  default: {},
});

export const productImgSrc = atom({
  key: 'productImg',
  default: noneProfileImage,
  effects_UNSTABLE: [persistAtom],
});
