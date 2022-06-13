/**
 * GCPやFirebaseの環境に関するメソッドを集約するクラス
 */
class Environments {
  /**
   * 環境変数からFirebaseの環境変数を取得してobjectにして返す
   * @return {object} 下記の形式で帰ってくる
   *  {
   *    databaseURL: 'https://databaseName.firebaseio.com',
   *    storageBucket: 'projectId.appspot.com',
   *    projectId: 'projectId'
   *  }
   */
  static getFirebaseConfig() {
    const config = process.env.FIREBASE_CONFIG;
    if (!config) {
      return {};
    }
    return JSON.parse(process.env.FIREBASE_CONFIG);
  }
  /**
   * FirebaseのプロジェクトIDを環境変数から取得して返す
   * @return {string}
   */
  static getProjectId() {
    return Environments.getFirebaseConfig().projectId || "local";
  }
  /**
   * Firebaseのデフォルトロケーションを環境変数から取得して返す
   * @return {string}
   */
  static getLocation() {
    return Environments.getFirebaseConfig().locationId || "local";
  }
  /**
   * FirebaseのプロジェクトIDからproduction環境かどうかを返す
   * @return {boolean}
   */
  static isProduction() {
    return Environments.getProjectId() === "production-b8884";
  }
  /**
   * AdminSDKのサービスアカウントのjsonをオブジェクトにして返す
   * @return {*}
   */
  static getAdminSDKServiceAccount() {
    return require("../court-reserver-firebase-adminsdk-224m5-9ac4ce8cae.json");
  }
  /**
   * AdminSDKのサービスアカウントのメールアドレスを返す
   * @return {string}
   */
  static getAdminSDKServiceAccountEmail() {
    return Environments.getAdminSDKServiceAccount().client_email;
  }
  /**
   * エミュレータで起動しているかどうかを返す
   * @return {boolean}
   */
  static isEmulator() {
    return process.env.FUNCTIONS_EMULATOR === "true";
  }
}
export default Environments;
