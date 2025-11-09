<template>
  <div class="max-w-full min-h-min">
    <div class="card m-50 border">
      <DataTable v-if="isLoading" :value="books">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>

      <DataTable v-else :value="books" tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">Books</span>
            <Button label="Add" class="px-4 py-2 w-20" />
          </div>
        </template>
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>

        <Column class="w-24 text-end!">
          <template #body="{ data }">
            <Toast />
            <div class="flex space-x-2">
              <Button
                label="update"
                severity="info"
                @click="selectRow(data)"
                class="px-4 py-2 w-20"
              />
              <Button
                label="delete"
                severity="danger"
                @click="selectRow(data)"
                class="px-4 py-2 w-20"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchBooks } from "@/composables/useBook.ts";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import type { Book } from "@/api/book.ts";
const { isLoading, books } = useFetchBooks();

import Toast from "primevue/toast";

const columns = [
  { field: "title", header: "Title" },
  { field: "author", header: "Author" },
  { field: "publisher", header: "Publisher" },
  { field: "page_count", header: "Page_count" },
];

const toast = useToast();
const selectRow = (data: Book) => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: data.title,
    life: 3000,
  });
};
</script>

<style scoped></style>
