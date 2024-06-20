
import { Player } from '@lottiefiles/react-lottie-player';


const LottieAnimation = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        src={"/loadingAnimation.json"}
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
};

export default LottieAnimation;
