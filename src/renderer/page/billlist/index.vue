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
            <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="250" :formatter="formatTableDate" sortable>
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

        <!--新增或者编辑界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="日期" prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="售价" prop="money">
                    <el-input-number v-model="addForm.money" :min="0" :max="200000"></el-input-number>
                </el-form-item>
                <el-form-item label="商品" prop="content">
                    <el-input type="textarea" v-model="addForm.content"></el-input>
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
  import Util from '../../common/js/util'
  import service from '../../service'

  export default {
    data () {
      return {
        filters: {
          name: ''
        },
        dataList: [{
          date: new Date(),
          content: '轴，轮胎',
          money: 105
        }, {
          date: new Date(),
          content: '轴，轮胎',
          money: 105
        }, {
          date: new Date(),
          content: '轴，轮胎',
          money: 105
        }, {
          date: new Date(),
          content: '轴，轮胎',
          money: 105
        }],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [], // 列表选中列
        addFormVisible: false, // 新增界面是否显示
        addLoading: false,
        addFormRules: {
          date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请填写所售商品', trigger: 'blur'}
          ],
          money: [
            {required: true, message: '请填写所售价格', trigger: 'submit'}
          ]
        },
        // 新增界面数据
        addForm: {
          content: null,
          date: new Date(),
          money: 0
        }
      }
    },
    components: {
      Util,
      service
    },
    methods: {
      formatTableDate (row, column, value, index) {
        return Util.formatDate.format(value)
      },
      handleCurrentChange (val) {
        this.page = val
        this.getUsers()
      },
      // 获取账单数据
      getDataList () {
        service.getBillList().then((res) => {
          console.log(res)
        })
      },
      // 删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.listLoading = false
        }).catch(() => {
        })
      },
      // 显示编辑界面add
      handleEdit: function (index, row) {
        this.addFormVisible = true
        this.addForm = Object.assign({}, row)
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
      // 新增
      addSubmit: function () {
        this.$refs.addForm.validate().then(() => {
          this.addLoading = true
          service.addBill(this.addForm).then((res) => {
            console.log('成功')
            this.addLoading = false
            this.addFormVisible = false
          })
        }, function (err) {
          console.log(err)
        })
      },
      selsChange: function (sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemove: function () {
        let ids = this.sels.map(item => item.id).toString()
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          console.log(ids)
          this.listLoading = true
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }).catch(() => {
        })
      }
    },
    mounted () {
      this.getDataList()
    }
  }
</script>
<style lang="less">
    .bill-table {
        .el-table {
            th, td {
                padding: 8px 0;
            }
        }
    }
</style>