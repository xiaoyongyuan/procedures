// components/pickerYMDHM/pickerYMDHM.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {            // 属性名
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ""     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    disabled: {
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pickerArray: [],//日期控件数据list
    pickerIndex: [],//日期控件选择的index
    chooseIndex: [],//日期控件确认选择的index
    chooseArray: [],//日期控件确认选择后的list
    dateString: '',//页面显示日期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onInit() {
      let date = new Date();
      var that = this;
      if (this.data.date !== "") {
        let str = this.data.date;
        str = str.replace(/-/g, "/");
        date = new Date(str);
      }
      let pickerArray = this.data.pickerArray;
      //默认选择3年内
      let year = [];
      for (let i = date.getFullYear() - 30; i <= date.getFullYear() + 70; i++) {
        year.push({ id: i, name: i + "年" });
      }
      let month = [];
      for (let i = 1; i <= 12; i++) {
        month.push({ id: i, name: i + "月" });
      }
      let dayNum = this._getNumOfDays(date.getFullYear(), date.getMonth() + 1);
      let day = [];
      for (let i = 1; i <= dayNum; i++) {
        day.push({ id: i, name: i + "日" });
      }
      let time = [];
      for (let i = 0; i <= 23; i++) {
        if (i < 10) {
          time.push({ id: i, name: "0" + i + "时" });
        } else {
          time.push({ id: i, name: i + "时" });
        }
      }
      let division = [];
      for (let i = 0; i <= 59; i++) {
        if (i < 10) {
          division.push({ id: i, name: "0" + i + "分" });
        } else {
          division.push({ id: i, name: i + "分" });
        }
      }
      pickerArray[0] = year;
      pickerArray[1] = month;
      pickerArray[2] = day;
      pickerArray[3] = time;
      pickerArray[4] = division;
      let mdate = {
        date: date,
        year: date.getFullYear() + '',
        month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 + '',
        day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '',
        time: date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + '',
        division: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ''
      };
      mdate.dateString = mdate.year + '-' + mdate.month + '-' + mdate.day + ' ' + mdate.time + ':' + mdate.division;
      this.setData({
        pickerArray,
        pickerIndex: that.data.pickerIndex,
        chooseIndex: [30, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
        chooseArray: pickerArray,
        dateString: mdate.dateString
      });
      this.triggerEvent('onPickerChange', mdate);
    },
    /**
	 * 
	 * 获取本月天数
	 * @param {number} year 
	 * @param {number} month 
	 * @param {number} [day=0] 0为本月0最后一天的
	 * @returns number 1-31
	 */
    _getNumOfDays(year, month, day = 0) {
      return new Date(year, month, day).getDate()
    },
    pickerChange: function (e) {
      let indexArr = e.detail.value;
      const year = this.data.pickerArray[0][indexArr[0]].id;
      const month = this.data.pickerArray[1][indexArr[1]].id;
      const day = this.data.pickerArray[2][indexArr[2]].id;
      const time = this.data.pickerArray[3][indexArr[3]].id;
      const division = this.data.pickerArray[4][indexArr[4]].id;
      let date = {
        date: new Date(year + '-' + month + '-' + day + ' ' + time + ':' + division),
        year: year + '',
        month: month < 10 ? '0' + month : month + '',
        day: day < 10 ? '0' + day : day + '',
        time: time < 10 ? '0' + time : time + '',
        division: division < 10 ? '0' + division : division + ''
      };
      date.dateString = date.year + '-' + date.month + '-' + date.day + ' ' + date.time + ':' + date.division;
      this.setData({
        chooseIndex: e.detail.value,
        chooseArray: this.data.pickerArray,
        dateString: date.dateString
      });
      this.triggerEvent('onPickerChange', date);
    },
    pickerColumnChange: function (e) {
      var data = {
        pickerArray: this.data.pickerArray,
        pickerIndex: this.data.pickerIndex
      };
      data.pickerIndex[e.detail.column] = e.detail.value;
      if (e.detail.column === 1) {
        let dayNum = this._getNumOfDays(data.pickerArray[0][data.pickerIndex[0]].id, e.detail.value + 1);
        let day = [];
        for (let i = 1; i <= dayNum; i++) {
          day.push({ id: i, name: i + "日" });
        }
        if (dayNum < data.pickerIndex[2] + 1) {
          data.pickerIndex[2] = dayNum - 1;
        }
        data.pickerArray[2] = day;
      }
      this.setData(data);
    },
      selsectdate:function(){
          var that = this;
          let date = new Date();
          that.setData({
              pickerIndex: [30, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
          });
      },
    pickerCancel: function (e) {
      this.setData({
        pickerIndex: this.data.chooseIndex,
        pickerArray: this.data.chooseArray
      })
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached() {
    // 在组件实例进入页面节点树时执行
    // 在组件实例进入页面节点树时执行
    // this._onInit();
  },
  ready() {
    this._onInit();
  },
  // 以下为新方法 >=2.2.3
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // this._onInit();
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready() {
      this._onInit();
    }
  }
});
