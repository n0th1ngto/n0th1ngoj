<template>
  <div id="discuss-card">
    <div id="card-body">
      <div id="content">
        <div class="title">{{ props.comment.title }}</div>
        <div id="tags">
          <div v-for="(tag, index) in props.comment.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
      <div id="body">
        {{ props.comment.context }}
      </div>
      <div id="footer">
        <span class="action" key="heart">
          <span>
            <IconHeart />
          </span>
          {{ props.comment.count.thumbsUp }}
        </span>
        <span class="action" key="star">
          <span>
            <IconStar />
          </span>
          {{ props.comment.count.star }}
        </span>
        <span class="action" key="reply">
          <span>
            <IconMessage />
          </span>
          {{ props.comment.count.commit }}
        </span>
      </div>
    </div>
    <div id="card-img">
      <img :src="'/'" class="img" v-lazy="props.comment.imgUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserComment } from '@/type/commentType'
import { defineProps } from 'vue'
import { IconHeart, IconMessage, IconStar, IconStarFill, IconHeartFill } from '@arco-design/web-vue/es/icon'
import { ref } from 'vue'

interface Prop {
  comment: UserComment
}

const props = defineProps<Prop>()
</script>

<style scoped>
#discuss-card {
  height: 160px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: white;
  display: flex;

  width: 40%;
  margin: 10px auto;
  text-align: left;

  box-shadow: 0 1px 2px rgba(0, 10, 32, 0.1), 0 2px 8px rgba(0, 10, 32, 0.05);
}

#card-body {
  padding: 16px;
  max-height: 160px;
  flex: 80%;
}

#card-img {
  flex: 20%;
}

#card-img .img {
  width: 150px;
  height: 150px;
  padding: 5px;
}

#img-replace {
  width: 150px;
  height: 150px;
  padding: 5px;
  background-color: rgba(60, 60, 67, 0.6);
}

.title {
  font-size: 17px;
  font-weight: bold;
}

#tags {
  display: flex;
  padding: 0px;
  margin-top: 4px;
}

#tags .tag {
  padding: 0 8px;
  font-size: 12px;
  height: 24px;
  line-height: 20px;
  font-weight: 400;
  color: rgba(60, 60, 67, 0.6);
  display: flex;
  align-items: center;
  background-color: rgba(0, 10, 32, 0.05);
  border-radius: 12px;
  margin: 2px 10px 2px 0px;
}

#body {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
  font-size: 14px;
  line-height: 24px;
  color: rgba(89, 89, 89, 1);
  max-height: 50px;
}

#footer {
  margin-top: 5px;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
