import Constants from './configuration/Constants';
import LoggerConfig from './configuration/LoggerConfig';
import DefaultConfiguration from './configuration/DefaultConfiguration';
import DefaultPenStyle from './configuration/DefaultPenStyle';
import DefaultTheme from './configuration/DefaultTheme';
import DefaultBehaviors from './configuration/DefaultBehaviors';
import * as InkModel from './model/InkModel';
import { Editor } from './Editor';
import { register, getAvailableLanguageList } from './EditorFacade';
import * as RecognizerContext from './model/RecognizerContext';

const MyScript = {
  Constants,
  // Default instantiations
  DefaultConfiguration,
  DefaultBehaviors,
  DefaultPenStyle,
  DefaultTheme,
  // Helper functions
  register,
  getAvailableLanguageList,
  // Internals
  LoggerConfig,
  Editor,
  InkModel,
  RecognizerContext,
};

export {
  MyScript as default,
  Constants,
  // Default instantiations
  DefaultConfiguration,
  DefaultBehaviors,
  DefaultPenStyle,
  DefaultTheme,
  // Helper functions
  register,
  getAvailableLanguageList,
  // Internals
  LoggerConfig,
  Editor,
  InkModel,
  RecognizerContext,
};

