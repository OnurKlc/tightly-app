<template>
  <div class="users-view">
    <a-card title="Users List" :bordered="false">
      <a-spin :spinning="loading">
        <a-table
          :columns="columns"
          :data-source="users"
          :row-key="record => record.id"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <a-button
                type="link"
                @click="navigateToUser(record.id)"
                style="padding: 0; height: auto; font-size: 14px;"
              >
                {{ record.name }}
              </a-button>
            </template>
          </template>
        </a-table>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import userService from '@/services/userService.js'

export default {
  name: 'UsersView',
  setup() {
    const router = useRouter()
    const users = ref([])
    const loading = ref(false)

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }
    ]

    const fetchUsers = async () => {
      try {
        loading.value = true
        users.value = await userService.getAll()
      } catch (error) {
        console.error('Error fetching users:', error)
        const errorMessage = error.userMessage || 'Failed to load users'
        message.error(errorMessage)
      } finally {
        loading.value = false
      }
    }

    const navigateToUser = (userId) => {
      router.push(`/users/${userId}`)
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      loading,
      columns,
      navigateToUser
    }
  }
}
</script>

<style scoped>
.users-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
