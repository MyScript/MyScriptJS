import Constants from './configuration/Constants';
import LoggerConfig from './configuration/LoggerConfig';
import DefaultConfiguration from './configuration/DefaultConfiguration';
import DefaultPenStyle from './configuration/DefaultPenStyle';
import DefaultTheme from './configuration/DefaultTheme';
import { Editor } from './Editor';
import { register, getAvailableLanguageList } from './EditorFacade';

const MyScript = {
  Constants,
  LoggerConfig,
  Editor,
  DefaultConfiguration,
  DefaultPenStyle,
  DefaultTheme,
  register,
  getAvailableLanguageList
};

export {
  MyScript as default,
  Constants,
  LoggerConfig,
  Editor,
  DefaultConfiguration,
  DefaultPenStyle,
  DefaultTheme,
  register,
  getAvailableLanguageList
};

