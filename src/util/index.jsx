/*
 *  本地存储封装，项目中其他地方不要直接使用localStorage和sessionStorage,ajax，统一使用封装。
 *  简化接口，字符串json转换。
 * */
import moment from 'moment';
const SALT = '__zn__admin__';
Date.prototype.format = function() {
      var s = '';
      var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
      var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
      s += this.getFullYear() + '-'; // 获取年份。
      s += mouth + "-"; // 获取月份。
      s += day; // 获取日。
      return (s); // 返回日期。
};
export default {
    local: {
        get(key) {
            let strValue = localStorage.getItem(SALT + key)
            return JSON.parse(strValue)
        },
        set(key, jsonValue) {
            var strValue = JSON.stringify(jsonValue)
            localStorage.setItem(SALT + key, strValue)
        },
        remove(key) {
            localStorage.removeItem(SALT + key)
        },
        removeAll() {
            localStorage.clear()
        }
    },
    session: {
        get(key) {
            let strValue = sessionStorage.getItem(SALT + key)
            return JSON.parse(strValue)
        },
        set(key, jsonValue) {
            var strValue = JSON.stringify(jsonValue)
            sessionStorage.setItem(SALT + key, strValue)
        },
        remove(key) {
            sessionStorage.removeItem(SALT + key)
        },
        removeAll() {
            sessionStorage.clear()
        }
    },
    getDate(da,AddDayCount){
        var da = (da.replace(/-/g, "/"))     // 把2017-08-24 转换为2016/08/24
        var dd = new Date(da);
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
        return y+"-"+m+"-"+d;
    },
}
