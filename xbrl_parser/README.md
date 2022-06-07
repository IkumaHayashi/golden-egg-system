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