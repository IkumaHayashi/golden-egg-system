import * as functions from "firebase-functions";
import * as crypto from "crypto"
import edinetcodeDlInfo from "./EdinetcodeDlInfo.json"
import { getFirestore } from "firebase-admin/firestore"
const db = getFirestore();
db.settings({ignoreUndefinedProperties: true});

export const insertEdinetCodeList = functions
  .runWith({
    timeoutSeconds: 540
  })
  .pubsub
  .topic("topic-insertEdinetCodeList")
  .onPublish(async(event) => {
    const promises = (edinetcodeDlInfo as any[])
      .filter(info => info['上場区分'] === "上場")
      .map(info => {
        const shasum = crypto.createHash('sha1');
        shasum.update(info['ＥＤＩＮＥＴコード']); // ここの引数にハッシュを計算したい文字列を渡す
        const hash = shasum.digest('hex');
        return db.collection("edinet_codes").doc(hash).set({
          'edinet_code': info['ＥＤＩＮＥＴコード'],
          'kind': info['提出者種別'],
          'listed': info['上場'],
          'consolidated': info['連結の有無'],
          'capital': info['資本金'],
          'settlement_date': info['決算日'],
          'name': info['提出者名'],
          'name_alphabet': info['提出者名（英字）'],
          'name_phonetic': info['提出者名（ヨミ）'],
          'address': info['所在地'],
          'type_of_industry': info['提出者業種'],
          'fund_code': info['証券コード'],
          'corporate_code': info['提出者法人番号']
        });
      });
    await Promise.all(promises);
  })