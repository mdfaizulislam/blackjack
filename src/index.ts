// dependencies
import { AppController } from './controllers/AppController';
import { SceneController } from './controllers/SceneController';
import { Helper } from './generic/Helper';

AppController.initialize(
    Helper.getScreenWidth(),
    Helper.getScreenHeight(),
    0x6495ed
);

// pass in the screen size to avoid "asking up"
// AppController.changeScene(SceneController.getLoadingScene());
SceneController.loadLoadingScene();
