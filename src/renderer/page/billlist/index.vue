<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleAdd" type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-col :span="24" class="bill-table">
            <el-table  :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                       style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="250" sortable>
                </el-table-column>
                <el-table-column prop="content" label="商品" min-width="200" sortable>
                </el-table-column>
                <el-table-column prop="money" label="消费（元）" width="200" sortable>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="商品">
                    <el-input type="textarea" v-model="addForm.content"></el-input>
                </el-form-item>
                <el-form-item label="售价">
                    <el-input-number v-model="addForm.money" :min="0" :max="200000"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
  export default {
    data () {
      return {
        filters: {
          name: ''
        },
        dataList: [{
          date: '2018-05-24',
          content: '轴，轮胎',
          money: 105
        }, {
          date: '2018-05-24',
          content: '轴，轮胎',
          money: 105
        }, {
          date: '2018-05-24',
          content: '轴，轮胎',
          money: 105
        }, {
          date: '2018-05-24',
          content: '轴，轮胎',
          money: 105
        }],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [], // 列表选中列

        editFormVisible: false, // 编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        // 编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },

        addFormVisible: false, // 新增界面是否显示
        addLoading: false,
        addFormRules: {
          date: [
            {required: true, message: '请选择日期', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请填写所售商品', trigger: 'blur'}
          ],
          money: [
            {required: true, message: '请填写所售价格', trigger: 'blur'}
          ]
        },
        // 新增界面数据
        addForm: {
          content: '',
          date: new Date(),
          money: 0
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.page = val
        this.getUsers()
      },
      // 获取账单数据
      getDataList () {
      },
      // 删除
      handleDel: function (index, row) {
      },
      // 显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
      },
      // 显示新增界面
      handleAdd: function () {
        this.addFormVisible = true
        this.addForm = {
          content: '',
          date: new Date(),
          money: 0
        }
      },
      // 编辑
      editSubmit: function () {
      },
      // 新增
      addSubmit: function () {
      },
      selsChange: function (sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemove: function () {

      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
    .bill-table{
      .el-table {
          th,td {
              padding: 8px 0;
          }
      }
    }
</style>