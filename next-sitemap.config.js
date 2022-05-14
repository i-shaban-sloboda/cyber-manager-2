/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.NEXTAUTH_URL || 'INSERT_YOUR_WEBSITE_URL',
    generateRobotsTxt: true,
}
