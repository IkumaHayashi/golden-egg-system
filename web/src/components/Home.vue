<script setup lang="ts">
import { collection, getDocs } from "@firebase/firestore";
import { reactive } from "vue";
import { db } from "../plugins/firebase";

const state = reactive({
  companies: [] as any,
});

getDocs(collection(db, "edinet_codes")).then((querySnapshot) => {
  state.companies = querySnapshot.docs.map((doc) => doc.data());
});
</script>

<template>
  <h1>金の卵育成システム</h1>
  <h2>企業一覧</h2>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2">EDINET CODE</th>
        <th class="px-4 py-2">証券番号</th>
        <th class="px-4 py-2">企業名</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="company in state.companies" :key="company.edinet_code">
        <td class="border px-4 py-2">{{ company.edinet_code }}</td>
        <td class="border px-4 py-2">{{ company.fund_code }}</td>
        <td class="border px-4 py-2">
          <router-link :to="`/performance/${company.edinet_code}`">
            {{ company.name }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
