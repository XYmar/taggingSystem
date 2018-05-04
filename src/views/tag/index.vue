<template>
  <div class="app-container calendar-list-container" style="height: 100%">
   <!-- <div class="btnContainer">
      <el-button @click="addtags">添加标记</el-button>
      <el-button @click="saveAllTags">保存全部</el-button>
    </div>-->
    <div class="articleContainer" style="width:65%;float:left;overflow:hidden;padding:6px;text-align: justify">
      <h3>{{this.document.title}}</h3>
      <p style="text-indent: 2em;line-height: 24px;font-size: 14px">{{this.document.content}}</p>
    </div>
    <div id="tagContainer" class="tagsConatiner" style="width:32%;min-height:600px;float:right;border:1px solid #ccc;margin-top:30px;padding-top:10px;padding-left:4px;">
      <div v-if="this.markList && this.markList.length > 0">
          <div v-for="item in markList" style="margin-bottom: 10px">
            <div class="questionContainer">
              <span style="width:25px;float:left;padding:4px 4px">Q:</span>
              <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                        :autosize="{ minRows: 1}" placeholder="添加标记"
                        v-model="item.question"
              >
              </el-input>
            </div>
            <div class="answerContainer">
              <span style="width:25px;float:left;padding:4px 4px">A:</span>
              <el-input style="width: 85%;margin-left: 10px" type="textarea"
                        :autosize="{ minRows: 2}" placeholder="添加答案"
                        v-model="item.answer"
              >
              </el-input>
            </div>
            <div class="btnContainer" style="margin:10px 0;height:40px" >
              <el-button type="danger" style="float:right;margin-right: 18px;" @click="deleteTag(item.id)">删除</el-button>
              <el-button type="primary" style="float: right;margin-right: 10px;" @click="updateTag(item.id, item)">修改</el-button>
            </div>
    <!--        <el-input style="width: 85%;margin-left: 10px" type="textarea"
                      :autosize="{ minRows: 3}" placeholder="添加答案"
                      v-model="item.question"
            >
            </el-input>
            <el-input style="width: 85%;margin-left: 10px" type="textarea"
                      :autosize="{ minRows: 3}" placeholder="添加答案"
                      v-model="item.answer"
            >
            </el-input>-->
          </div>

      </div>
      <div class="inputContainer" style="margin-bottom: 10px">
        <div class="questionContainer">
          <span style="float:left;padding:4px 4px">Q:</span>
          <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                    :autosize="{ minRows: 1}" placeholder="添加标记"
                    v-model="input1.question"
          >
          </el-input>
        </div>
        <div class="answerContainer">
          <span style="float:left;padding:4px 4px">A:</span>
          <el-input style="width: 85%;margin-left: 10px" type="textarea"
                    :autosize="{ minRows: 2}" placeholder="添加答案"
                    v-model="input1.answer"
          >
          </el-input>
        </div>
        <div class="btnContainer" style="margin:10px 0;height:40px" >
          <el-button type="success" @click="saveTags" style="float:right;margin-right:16px;">保存</el-button>
        </div>
      </div>
     <!-- <div class="inputContainer" style="margin-bottom: 10px">
        <div class="questionContainer">
          <span style="float:left;padding:4px 4px">Q:</span>
          <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                    :autosize="{ minRows: 1}" placeholder="添加标记">
          </el-input>
        </div>
        <div class="answerContainer">
          <span style="float:left;padding:4px 4px">A:</span>
          <el-input style="width: 85%;margin-left: 10px" type="textarea"
                    :autosize="{ minRows: 2}" placeholder="添加答案">
          </el-input>
        </div>
      </div>
      <div class="inputContainer" style="margin-bottom: 10px">
        <div class="questionContainer">
          <span style="float:left;padding:4px 4px">Q:</span>
          <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                    :autosize="{ minRows: 1}" placeholder="添加标记">
          </el-input>
        </div>
        <div class="answerContainer">
          <span style="float:left;padding:4px 4px">A:</span>
          <el-input style="width: 85%;margin-left: 10px" type="textarea"
                    :autosize="{ minRows: 2}" placeholder="添加答案">
          </el-input>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import { documentDetail, documentList, markdocument, updateMark, deleteMark } from '@/api/tagdocument'
  /* eslint-disable */
  export default {
    name: 'tag',
    data() {
      return {
        tableKey: 0,
        id: '',
        document: {},
        marked: false,
        input1: {
          question: '',
          answer: ''
        },
        markdata:[],
        markList:null,
        dataAll: null
      }
    },
    created() {
      this.getList()
      this.id = this.$route.params.id
      this.getdocument()
    },
    mounted () {
    },
    methods: {
      getList() {
        this.listLoading = true
        documentList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice()
        })
      },
      getdocument () {
        this.listLoading = true
        documentDetail(this.id).then(response => {
          this.document = response.data.data
          this.marked= this.document.marked
          this.markList = response.data.data.markEntityList
          console.log(this.markList)
          console.log(this.document)
          this.loading = false
        })
      },
      setTagContainer () {
        let tagCHeight
        if (window.innerHeight) {
          tagCHeight = window.innerHeight
        } else if ((document.body) && (document.body.clientHeight)) {
          tagCHeight = document.body.clientHeight;
        }
        console.log(tagCHeight)
        var tagContainer = document.getElementById('tagContainer')
        tagContainer.style.height = tagCHeight
      },
      addtags () {
      },
      saveTags () {
        this.markdata.push(
          {
            question: this.input1.question,
            answer: this.input1.answer

          }
        )
        markdocument(this.id, this.markdata).then(response => {
          console.log(response.data)
          this.input1.question = ''
          this.input1.answer = ''
          this.getdocument()
          console.log(9999)
        })
      },
      saveAllTags () {
        let questions = document.getElementsByClassName('questionContainer')
        console.log(questions)
      },
      updateTag(id, item) {
        console.log(item.question)
        updateMark(id, item).then(response => {
          console.log('updateSuccess')
        })
      },
      deleteTag (markId) {
        let documentId = this.id
        deleteMark(documentId, markId).then(response => {
          this.getdocument()
          console.log('deleteSuccess')
        })
      }
    }
  }
</script>

<style scoped>
</style>
