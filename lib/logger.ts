export const logger = {
  info: (message: string) => console.info(`@post-card/core: âšī¸ ${message}`),
  success: (message: string) => console.log(`@post-card/core: â ${message}`),
  error: (message: string) => console.error(`@post-card/core: â ${message}`),
}
