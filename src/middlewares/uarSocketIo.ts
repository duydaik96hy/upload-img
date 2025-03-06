export function uarSocketIo(socket: any, next: Function) {
  const authCode = socket.handshake.auth.accessToken
    ? socket.handshake.auth.accessToken
    : socket.handshake.headers.accesstoken;
  /**
   * Check JWT Authentications
   */
}
