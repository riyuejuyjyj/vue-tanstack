<template>
  <div>
    <h2>Create New Todo</h2>
    <form @submit="onSubmit">
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="title" type="text" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <div>
        <label for="userId">User ID:</label>
        <input id="userId" v-model="userId" type="number" />
        <span v-if="errors.userId" class="error">{{ errors.userId }}</span>
      </div>

      <div>
        <label for="completed">
          <input id="completed" v-model="completed" type="checkbox" />
          Completed
        </label>
        <span v-if="errors.completed" class="error">{{
          errors.completed
        }}</span>
      </div>

      <button type="submit" :disabled="isCreating">
        {{ isCreating ? "Creating..." : "Create Todo" }}
      </button>

      <div v-if="createError" class="error">
        Error creating todo: {{ createError }}
      </div>
    </form>
  </div>

  <div>
    <div v-if="isLoading">Loading todos</div>
    <div v-else-if="error">Error:{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="todo in todos">{{ todo.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateTodo } from "@/composables/useCreateTodo.ts";
import { useTodos } from "@/composables/useTodos.ts";
import { useForm } from "vee-validate";

import * as yup from "yup";

const { todos, isLoading, error } = useTodos();
const { createTodo, isCreating, error: createError } = useCreateTodo();
// userId: number;
//id: number;
//title: string;
//completed: boolean;

const schema = yup.object({
  userId: yup.number().required("is required"),
  title: yup.string().required("is required"),
  completed: yup.boolean().required("is required"),
});

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    userId: 1,
    title: "default",
    completed: false,
  },
});

const [title] = defineField("title");
const [userId] = defineField("userId");
const [completed] = defineField("completed");

const onSubmit = handleSubmit(async (values) => {
  try {
    await createTodo({
      userId: values.userId,
      title: values.title,
      completed: values.completed,
      id: Date.now(), // 临时ID，实际应该由API生成
    });

    // 创建成功后可以重置表单
    resetForm();
  } catch (err) {
    console.error("Failed to create todo:", err);
  }
});
</script>

<style scoped></style>
