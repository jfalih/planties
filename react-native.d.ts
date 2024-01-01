declare module 'react-native-config' {
  interface Env {
    AUTH_TOKEN_KEY: string;
    SESSION_STORAGE_ID: string;
    SESSION_STORAGE_ENCRYPTION_KEY: string;
    USER_STORAGE_ID: string;
    BASE_URL: string;
    USER_STORAGE_ENCRYPTION_KEY: string;
  }

  const Config: Env;

  export default Config;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
