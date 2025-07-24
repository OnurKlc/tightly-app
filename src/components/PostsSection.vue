<template>
  <a-card title="Posts" :bordered="false">
    <!-- Add New Post Form -->
    <div class="add-post-section">
      <h3>Add New Post</h3>
      <a-form
        :model="newPost"
        @finish="handleAddPost"
        layout="vertical"
        class="new-post-form"
      >
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :md="9" :lg="9">
            <a-form-item
              label="Post Title"
              name="title"
              :rules="[{ required: true, message: 'Please enter post title' }]"
            >
              <a-input
                v-model:value="newPost.title"
                placeholder="Enter post title"
              />
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="24" :md="12" :lg="12">
            <a-form-item
              label="Post Content"
              name="body"
              :rules="[{ required: true, message: 'Please enter post content' }]"
            >
              <a-textarea
                v-model:value="newPost.body"
                placeholder="Enter post content"
                :rows="3"
              />
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="24" :md="3" :lg="3" class="form-button">
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :loading="addingPost"
                block
              >
                Add Post
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-divider />

    <!-- Posts List -->
    <div class="posts-list">
      <h3>Posts by {{ userName }}</h3>

      <a-spin :spinning="postsLoading">
        <div v-if="posts.length === 0 && !postsLoading" class="no-posts">
          <a-empty description="No posts found" />
        </div>

        <div v-else>
          <a-list
            :data-source="posts"
            item-layout="horizontal"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <a-popconfirm
                    title="Are you sure you want to delete this post?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="handleDeletePost(item.id)"
                  >
                    <a-button
                      type="text"
                      danger
                      :loading="deletingPostId === item.id"
                    >
                      Delete
                    </a-button>
                  </a-popconfirm>
                </template>

                <a-list-item-meta>
                  <template #title>
                    <h4>{{ item.title }}</h4>
                  </template>
                  <template #description>
                    <p>{{ item.body }}</p>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>

          <!-- Pagination -->
          <div class="pagination-container">
            <a-pagination
              v-model:current="currentPage"
              :total="totalPosts"
              :page-size="pageSize"
              :show-size-changer="false"
              :show-quick-jumper="false"
              @change="handlePageChange"
              simple
            />
          </div>
        </div>
      </a-spin>
    </div>
  </a-card>
</template>

<script>
import { ref, onMounted, reactive, watch } from 'vue'
import postService from '@/services/postService.js'
import { message } from 'ant-design-vue'
import { PAGINATION } from '@/constants'

export default {
  name: 'PostsSection',
  props: {
    userId: {
      type: [String, Number],
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const posts = ref([])
    const postsLoading = ref(false)
    const addingPost = ref(false)
    const deletingPostId = ref(null)

    const currentPage = ref(1)
    const pageSize = PAGINATION.POSTS_PER_PAGE
    const totalPosts = ref(0)

    const newPost = reactive({
      title: '',
      body: ''
    })

    const fetchPosts = async (page = 1) => {
      try {
        postsLoading.value = true
        const start = (page - 1) * pageSize
        const fetchedPosts = await postService.getPostsByUser(props.userId, start, pageSize)
        posts.value = fetchedPosts

        if (page === 1) {
          const allPosts = await postService.getPostsByUser(props.userId, 0, 100)
          totalPosts.value = allPosts.length
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        message.error('Failed to load posts')
      } finally {
        postsLoading.value = false
      }
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      fetchPosts(page)
    }

    const handleAddPost = async () => {
      try {
        addingPost.value = true

        const postData = {
          title: newPost.title,
          body: newPost.body,
          userId: parseInt(props.userId)
        }

        const createdPost = await postService.createPost(postData)

        posts.value.unshift(createdPost)
        if (posts.value.length > pageSize) {
          posts.value.pop()
        }

        totalPosts.value += 1

        newPost.title = ''
        newPost.body = ''

        message.success('Post added successfully!')
      } catch (error) {
        console.error('Error adding post:', error)
        message.error('Failed to add post')
      } finally {
        addingPost.value = false
      }
    }

    const handleDeletePost = async (postId) => {
      try {
        deletingPostId.value = postId

        await postService.deletePost(postId)

        posts.value = posts.value.filter(post => post.id !== postId)
        totalPosts.value -= 1

        if (posts.value.length === 0 && currentPage.value > 1) {
          currentPage.value -= 1
          fetchPosts(currentPage.value)
        } else if (posts.value.length < pageSize) {
          fetchPosts(currentPage.value)
        }

        message.success('Post deleted successfully!')
      } catch (error) {
        console.error('Error deleting post:', error)
        message.error('Failed to delete post')
      } finally {
        deletingPostId.value = null
      }
    }

    watch(() => props.userId, () => {
      currentPage.value = 1
      fetchPosts(1)
    })

    onMounted(() => {
      fetchPosts(1)
    })

    return {
      posts,
      postsLoading,
      addingPost,
      deletingPostId,
      currentPage,
      pageSize,
      totalPosts,
      newPost,
      handlePageChange,
      handleAddPost,
      handleDeletePost
    }
  }
}
</script>

<style scoped lang="less">
.add-post-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 6px;
}

.form-button {
  margin-top: 0;

  @media (min-width: @screen-md-min) {
    margin-top: 28px;
  }
}

.add-post-section h3 {
  margin-bottom: 16px;
  color: #1890ff;
}

.posts-list h3 {
  margin-bottom: 16px;
  color: #1890ff;
}

.no-posts {
  text-align: center;
  padding: 40px 0;
}

.pagination-container {
  text-align: center;
  margin-top: 24px;
}

:deep(.ant-list-item-meta-title) {
  margin-bottom: 8px;
}

:deep(.ant-list-item-meta-description) {
  color: #666;
  line-height: 1.6;
}
</style>
