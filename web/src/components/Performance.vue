<script setup lang="ts">
import { reactive, computed } from "vue";
import { db } from "../plugins/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { format, subDays } from "date-fns";
import { uniqBy } from "lodash";
import { useRoute } from "vue-router";

const state = reactive({
  xbrls: [] as DocumentData[],
});
const route = useRoute();
getDocs(
  query(
    collection(db, "xbrls"),
    where("edinet_code", "==", route.params.edinetCode)
  )
).then((querySnapshot) => {
  state.xbrls = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      documentId: doc.id,
      documentPath: doc.ref.path,
    };
  });
});
const companyName = computed(() => {
  if (state.xbrls.length === 0) return "loading...";
  return state.xbrls[0].filer_name;
});
const xbrlKeys = computed(() =>
  Array.from(new Set(state.xbrls.map((xbrl) => xbrl["local_name"])))
);
const xbrlFilters = (setting: XbrlSetting) => {
  const rows = state.xbrls
    .filter(
      (xbrl) =>
        xbrl["local_name"] === setting.xbrl_key &&
        setting.context_refs.findIndex(
          (contextRef) => contextRef === xbrl["context_id"]
        ) >= 0
    )
    .map((row) => {
      return {
        end_date: format(subDays(row["end_date"].toDate(), 1), "yyyy/MM"),
        x_value: row["x_value"],
      };
    });
  return uniqBy(rows, (row) => row.end_date).sort((a, b) => {
    if (a.end_date === null) return 0;
    const aTime = a.end_date;
    const bTime = b.end_date;
    if (aTime < bTime) return 1;
    return -1;
  });
};

interface XbrlSetting {
  label: string;
  xbrl_key: string;
  context_refs: string[];
}
const settings: XbrlSetting[] = [
  {
    label: "売上高",
    xbrl_key: "NetSalesSummaryOfBusinessResults",
    context_refs: [
      "CurrentYearDuration",
      "Prior1YearDuration",
      "Prior2YearDuration",
      "Prior3YearDuration",
      "Prior4YearDuration",
    ],
  },
  {
    label: "EPS",
    xbrl_key: "BasicEarningsLossPerShareSummaryOfBusinessResults",
    context_refs: [
      "CurrentYearDuration",
      "Prior1YearDuration",
      "Prior2YearDuration",
      "Prior3YearDuration",
      "Prior4YearDuration",
    ],
  },
  {
    label: "営業利益",
    xbrl_key: "OperatingIncome",
    context_refs: [
      "CurrentYearDuration",
      "Prior1YearDuration",
      "Prior2YearDuration",
      "Prior3YearDuration",
      "Prior4YearDuration",
    ],
  },
  {
    label: "自己資本比率",
    xbrl_key: "EquityToAssetRatioSummaryOfBusinessResults",
    context_refs: [
      "CurrentYearInstant",
      "Prior1YearInstant",
      "Prior2YearInstant",
      "Prior3YearInstant",
      "Prior4YearInstant",
    ],
  },
  {
    label: "営業活動によるCF",
    xbrl_key: "NetCashProvidedByUsedInOperatingActivities",
    context_refs: [
      "CurrentYearDuration",
      "Prior1YearDuration",
      "Prior2YearDuration",
      "Prior3YearDuration",
      "Prior4YearDuration",
    ],
  },
  {
    label: "現金等",
    xbrl_key: "CashAndCashEquivalents",
    context_refs: [
      "CurrentYearInstant",
      "Prior1YearInstant",
      "Prior2YearInstant",
      "Prior3YearInstant",
      "Prior4YearInstant",
    ],
  },
  {
    label: "１株あたり配当",
    xbrl_key: "DividendPaidPerShareSummaryOfBusinessResults",
    context_refs: [
      "CurrentYearDuration_NonConsolidatedMember",
      "Prior1YearDuration_NonConsolidatedMember",
      "Prior2YearDuration_NonConsolidatedMember",
      "Prior3YearDuration_NonConsolidatedMember",
      "Prior4YearDuration_NonConsolidatedMember",
    ],
  },
  {
    label: "配当性向",
    xbrl_key: "PayoutRatioSummaryOfBusinessResults",
    context_refs: [
      "CurrentYearDuration_NonConsolidatedMember",
      "Prior1YearDuration_NonConsolidatedMember",
      "Prior2YearDuration_NonConsolidatedMember",
      "Prior3YearDuration_NonConsolidatedMember",
      "Prior4YearDuration_NonConsolidatedMember",
    ],
  },
];
</script>

<template>
  <h1 class="text-3xl font-bold underline">{{ companyName }}</h1>
  <template v-for="setting in settings" :key="setting.xbrl_key">
    <h2 class="text-left">{{ setting.label }}</h2>
    <table class="table-auto">
      <tbody>
        <tr
          v-for="(xbrlValue, index) in xbrlFilters(setting)"
          :key="setting.xbrl_key + '_' + index"
        >
          <td class="border px-4 py-2">
            {{ xbrlValue.end_date }}
          </td>
          <td class="border px-4 py-2">{{ xbrlValue.x_value }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>
