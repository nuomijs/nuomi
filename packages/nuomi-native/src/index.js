import connect from 'nuomi/lib/components/connect';
import withNuomi from 'nuomi/lib/components/withNuomi';
import { useConnect, useNuomi } from 'nuomi/lib/hooks';
import store from 'nuomi/lib/core/redux/store';
import NuomiNative from './NuomiNative';

export * from 'nuomi/lib/core/nuomi';

export {
  NuomiNative, useConnect, useNuomi, connect, withNuomi, store,
};
