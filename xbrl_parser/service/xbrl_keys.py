import configparser
import os
from pprint import pprint


class XbrlKeys:
    def __init__(self, index_name):
        self.config_parser = configparser.ConfigParser(
            allow_no_value=True, inline_comment_prefixes=("#")
        )
        self.config_parser.optionxform = str
        self.config_parser.read(
            os.getcwd() + "/config/xbrl_key/" + index_name + ".ini", "UTF-8"
        )

    @property
    def keys(self):
        sections = self.config_parser.sections()
        all_values = []
        for section in sections:
            values = dict(self.config_parser[section]).keys()
            all_values.extend(values)
        return all_values
