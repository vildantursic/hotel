<template>
    <div>
        <el-card v-if="reviews !== []" v-for="(review, i) in reviews" :key="i" class="review">
            <div class="image">
                <i class="el-icon-picture rounded"></i>
            </div>
            <div class="content">
                <div class="user-info">
                    <h4>{{review.author.first_name}} {{review.author.last_name}}</h4>
                    <i v-if="review.positive" class="el-icon-arrow-up"></i>
                    <i v-if="!review.positive" class="el-icon-arrow-down"></i>
                </div>
                <div class="message">{{review.message}}</div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: ['reviews']
    }
</script>

<style lang="scss" scoped>

</style>
