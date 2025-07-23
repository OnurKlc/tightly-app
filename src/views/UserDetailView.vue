<template>
  <div class="user-detail-view">
    <a-button
      type="link"
      @click="$router.push('/users')"
      style="margin-bottom: 16px; padding-left: 0;"
    >
      ← Back to Users
    </a-button>

    <a-spin :spinning="userLoading">
      <a-row :gutter="24" v-if="user">
        <!-- Left side - User Details -->
        <a-col :xs="24" :lg="8">
          <a-card title="User Details" :bordered="false">
            <div class="user-detail-content">
              <div class="user-avatar">
                <a-avatar
                  :size="120"
                  :src="userAvatar"
                  :style="{ backgroundColor: '#1890ff' }"
                >
                  {{ user.name?.charAt(0) }}
                </a-avatar>
              </div>

              <div class="user-info">
                <h2>{{ user.name }}</h2>
                <p><strong>Username:</strong> {{ user.username }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Phone:</strong> {{ user.phone }}</p>
                <p><strong>Address:</strong></p>
                <p>{{ user.address.street }}, {{ user.address.suite }}</p>
                <p>{{ user.address.city }}, {{ user.address.zipcode }}</p>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- Right side - Posts -->
        <a-col :xs="24" :lg="16">
          <PostsSection
            :user-id="user.id"
            :user-name="user.name"
          />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import userService from '@/services/userService.js'
import PostsSection from '@/components/PostsSection.vue'

export default {
  name: 'UserDetailView',
  components: {
    PostsSection
  },
  setup() {
    const route = useRoute()
    const user = ref(null)
    const userLoading = ref(false)

    const userAvatar = ref('https://via.placeholder.com/120x120/1890ff/ffffff?text=User')

    const fetchUser = async () => {
      try {
        userLoading.value = true
        const userId = route.params.id
        user.value = await userService.getById(userId)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        userLoading.value = false
      }
    }

    onMounted(() => {
      fetchUser()
    })

    return {
      user,
      userLoading,
      userAvatar
    }
  }
}
</script>

<style scoped>
.user-detail-view {
  max-width: 1400px;
  margin: 0 auto;
}

.user-detail-content {
  text-align: center;
}

.user-avatar {
  margin-bottom: 24px;
}

.user-info {
  text-align: left;
}

.user-info h2 {
  color: #1890ff;
  margin-bottom: 16px;
}

.user-info p {
  margin-bottom: 8px;
}

.address-section,
.company-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.address-section h4,
.company-section h4 {
  color: #1890ff;
  margin-bottom: 8px;
}
</style>
