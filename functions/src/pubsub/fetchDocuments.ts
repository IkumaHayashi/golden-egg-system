import * as functions from "firebase-functions";
import fetch from "node-fetch";

export const fetchDocuments = functions.pubsub
  .topic("topic-fetchDocuments")
  .onPublish(async (event) => {
    // event.dataから対象年月日を受け取ってDateに変換

    // APIエンドポイントを生成
    functions.logger.info("Hello logs!", { structuredData: true });
    await fetch(
      "https://disclosure.edinet-fsa.go.jp/api/v1/documents.json?date=2020-08-03&type=2"
    );

    // 返ってきた値をコレクションに追加
    return "complete!";
  });
