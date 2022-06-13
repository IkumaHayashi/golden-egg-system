import unittest
import sys

sys.path.append("../service")
from service.xbrl_keys import XbrlKeys


class XbrlKeysTest(unittest.TestCase):
    def test_aaa(self):
        xbrl_keys = XbrlKeys("cash")
        self.assertEqual(
            xbrl_keys.keys,
            [
                "CashAndCashEquivalents",
                "CashAndCashEquivalentsSummaryOfBusinessResults",
                "CashAndCashEquivalentsUSGAAPSummaryOfBusinessResults",
                "CashAndCashEquivalentsIFRSSummaryOfBusinessResults",
            ],
        )
