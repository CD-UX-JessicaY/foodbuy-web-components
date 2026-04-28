import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'foodbuy',
  globalStyle: 'src/global/tokens.css',
  outputTargets: [
    // Angular package — consumed by Angular teams
    angularOutputTarget({
      componentCorePackage: '@foodbuy/design-system',
      outputType: 'standalone',
      directivesProxyFile: '../foodbuy-angular/src/directives/proxies.ts',
      directivesArrayFile: '../foodbuy-angular/src/directives/index.ts',
    }),
    // React package — consumed by React teams
    reactOutputTarget({
      componentCorePackage: '@foodbuy/design-system',
      proxiesFile: '../foodbuy-react/src/components/stencil-generated/index.ts',
    }),
    // Standard dist — for npm + CDN consumption (jQuery, ASP.NET)
    { type: 'dist', esmLoaderPath: '../loader' },
    // Modern ESM custom elements — for direct import in any framework
    { type: 'dist-custom-elements' },
    // Dev server
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'http://localhost:3333',
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
