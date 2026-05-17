const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Git worktree 경로에서 file watcher 안정성 강화
config.watcher = {
  ...(config.watcher || {}),
  healthCheck: {
    enabled: true,
    interval: 3000,
    timeout: 5000,
  },
  watchman: {
    deferStates: ["hg.update"],
  },
};

// 명시적으로 mobile 디렉토리만 watch (worktree에서 .git 파일 등 외부 참조 차단)
config.watchFolders = [__dirname];

module.exports = config;
