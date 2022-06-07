from service import xbrl_keys


INDEXES = [
    "sales",  # 売上高
    "eps",  # EPS
    "operating_income",  # 営業利益
    "capital_adequacy_ratio",  # 自己資本比率
    "operating_cash_flow",  # 営業活動によるCF
    "cash",  # 現金等
    "divide_per_share",  # 1株あたり配当金
    "dividend_ratio",  # 配当性向
]


class IndexAndKeys:
    def __init__(self):
        self.value = self.__get_xbrl_keys()

    def __get_xbrl_keys(self):
        key_dict = {}
        for index in INDEXES:
            xbrl_keys_instance = xbrl_keys.XbrlKeys(index)
            key_dict[index] = xbrl_keys_instance.keys
        return key_dict

    @property
    def indexes(self):
        return INDEXES

    @property
    def all_keys(self):
        _all_keys = []
        values = self.value.values()
        for value in values:
            _all_keys.extend(value)
        return _all_keys
