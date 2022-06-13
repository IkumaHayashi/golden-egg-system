# xbrl_parser
## 概要
XBRLをダウンロードして解析しFirestore（仮）に格納する

## 起動方法
- pip install
  - Mac
    もともとから入ってるpython２系とごっちゃになるので下記でインストールする
    - `python3 -m pip install -r requirements.txt`
  - Docker
    - `pip install --no-cache-dir -r requirements.txt -t .`
    - `pip install -r ./Arelle/requirements.txt -t ./Arelle`
- build
  `docker build -t xbrl_parser .`
- run
  `docker run -it xbrl_parser`
- ローカルでの実行
  ```
  export FIRESTORE_EMULATOR_HOST=localhost:8080
  python3 main.py
  ```

## デプロイ
- なぜか`asia-northeast1`で行うとエラーが出るため`us-west2`でやってる
- Artifact ResistryでDockerリポジトリ作成
  `gcloud artifacts repositories create xbrlparser-docker-repo --repository-format=docker --location=us-west2 --description="xbrl_parser docker repository"`
- Dockerfileを仕様してビルド
  `gcloud builds submit --region=us-west2  --tag us-west2-docker.pkg.dev/dev-golden-egg/xbrlparser-docker-repo/xbrlparser-image:tag1`
- ジョブの作成
  ```
  gcloud beta run jobs create xbrl-parser \
    --image us-west2-docker.pkg.dev/dev-golden-egg/xbrlparser-docker-repo/xbrlparser-image:tag1 \
    --tasks 1 \
    --region us-west2
  ```

## 実行
`gcloud beta run jobs execute xbrl-parser`