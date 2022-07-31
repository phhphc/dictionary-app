import { createProxyMiddleware } from 'http-proxy-middleware'

// @desc    Get media resource
// @route   GET /media
// @access  public
export const loadMedia = createProxyMiddleware({
    target: 'https://dictionary.cambridge.org',
    changeOrigin: true,
    timeout: 5000
})
