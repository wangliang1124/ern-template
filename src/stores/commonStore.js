import { computed, makeAutoObservable, runInAction } from 'mobx';
import { Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { isLandscape } from '~/utils/screen';

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  darkMode = false;

  isLandscape = false;

  isTablet = isTablet();

  changeTheme = (darkMode) => {
    runInAction(() => {
      this.darkMode = darkMode;
    });
  };

  dimensionChange = () => {
    runInAction(() => {
      this.isLandscape = isLandscape();
    });
  };
}

const commonStore = new CommonStore();

Dimensions.addEventListener('change', () => {
  console.log('----- dimensions change -----');
  commonStore.dimensionChange();
});

export default commonStore;
