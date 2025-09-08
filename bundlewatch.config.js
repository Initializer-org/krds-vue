/**
 * Bundle Watch Configuration
 * 번들 사이즈 추적 및 제한 설정
 */

module.exports = {
  files: [
    {
      path: 'dist/krds-vue.es.js',
      maxSize: '50kb',
      compression: 'gzip'
    },
    {
      path: 'dist/krds-vue.umd.js',
      maxSize: '55kb',
      compression: 'gzip'
    },
    {
      path: 'dist/style.css',
      maxSize: '30kb',
      compression: 'gzip'
    }
  ],
  ci: {
    repoBranchBase: 'main',
    trackBranches: ['main', 'develop'],
    commitStatusOverview: true
  }
}