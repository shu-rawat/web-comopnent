import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'mycomponent',
  srcDir: 'stencil/src',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
