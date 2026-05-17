const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 */
const config = {
  watcher: {
    healthCheck: {
      enabled: true,
      interval: 3000,
      timeout: 5000,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
