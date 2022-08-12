import glob
import hashlib
import json
import os
from pprint import pprint
import requests
import json
import zipfile
import io
import sys
from service.firebase import get_firestore_client
from google.cloud.firestore_v1.client import Client

db: Client = get_firestore_client()


from service.index_and_keys import IndexAndKeys

sys.path.append("./Arelle")
from Arelle.arelle import Cntlr

# Define main script
def main():
    # 有価証券報告書のリストを取得
    r = requests.get(
        "https://disclosure.edinet-fsa.go.jp/api/v1/documents.json?date=2021-06-28&type=2"
    )
    reports = json.loads(r.text)
    securities_reports_filter = list(filter(is_scurities_report, reports["results"]))[
        0:3
    ]

    # ダウンロードしてXBRLに解析
    base_path = "/tmp/golden-egg-system/"
    os.makedirs(base_path, exist_ok=True)
    for securities_report in securities_reports_filter:
        pprint("securites_report")
        pprint(securities_report)

        # ダウンロード
        r = requests.get(
            "https://disclosure.edinet-fsa.go.jp/api/v1/documents/"
            + securities_report["docID"],
            params={"type": 1},
            headers={"Content-Type": "arraybuffer"},
        )
        dir_path = base_path + securities_report["docID"]
        z = zipfile.ZipFile(io.BytesIO(r.content))
        z.extractall(dir_path)
        z.close

        # Arelleで解析
        xbrl_file_path = glob.glob(dir_path + "/XBRL/PublicDoc/*.xbrl")[0]
        ctrl = Cntlr.Cntlr(logFileName="logToPrint")
        model_xbrl = ctrl.modelManager.load(xbrl_file_path)

        edinet_document_id = hashlib.sha1(
            securities_report["docID"].encode("utf-8")
        ).hexdigest()
        edinet_document = {
            "doc_id": securities_report["docID"],
            "doc_description": securities_report["docDescription"],
            "doc_type_code": securities_report["docTypeCode"],
            "edinet_code": securities_report["edinetCode"],
            "filer_name": securities_report["filerName"],
            "period_start": securities_report["periodStart"],
            "period_end": securities_report["periodEnd"],
            "financial_indicators": [],
        }

        for fact in model_xbrl.facts:

            if not (fact.concept.qname.localName in IndexAndKeys().all_keys):
                continue

            label_ja = fact.concept.label(
                preferredLabel=None, lang="ja", linkroleHint=None
            )
            label_en = fact.concept.label(
                preferredLabel=None, lang="en", linkroleHint=None
            )
            x_value = fact.xValue
            if fact.unit is None:
                unit = None
            else:
                # .unit の.value とは、複雑な分数形式の単位などを、
                # Arelle が人の見やすい形式に整えた文字列でした。
                # (例) 'JPY / shares'
                unit = fact.unit.value

            if fact.context.instantDatetime:
                instant_date = fact.context.instantDatetime
            else:
                instant_date = None

            if fact.context.startDatetime:
                # 開始日
                # (例) datetime.datetime(2019, 6, 1, 0, 0)
                start_date = fact.context.startDatetime
            else:
                start_date = None

            if fact.context.endDatetime:
                end_date = fact.context.endDatetime
            else:
                end_date = None

            financial_indicator = {
                "label_ja": label_ja,
                "label_en": label_en,
                "prefix": fact.prefix,
                "local_name": fact.localName,
                "x_value": None if x_value is None else float(x_value),
                "unit": unit,
                "start_date": start_date,
                "end_date": end_date,
                "context_id": fact.contextID,
                "decimals": None if x_value is None else int(fact.decimals),
            }
            edinet_document["financial_indicators"].append(financial_indicator)

        db.collection("edinet_documents").document(edinet_document_id).set(
            edinet_document
        )

        ctrl.modelManager.close()
        ctrl.close()


def is_scurities_report(report):
    return (
        report["ordinanceCode"] == "010"
        and report["formCode"] == "030000"
        and report["secCode"] != None
        and report["xbrlFlag"] == "1"
    )


# Start script
if __name__ == "__main__":
    main()
