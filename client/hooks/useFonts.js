import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
  });
